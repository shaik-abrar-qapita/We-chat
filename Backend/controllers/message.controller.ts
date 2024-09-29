import { Request, Response } from "express";
import Message from "../models/message.model";
import asyncHanlder from "express-async-handler";
import Conversation from "../models/conversation.model";
import mongoose from "mongoose";

interface RequestWithUser extends Request {
  user?: any; // Adjust this to match the actual type of your User model, e.g., `UserDocument`
}

const sendMessage = asyncHanlder(async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    console.log("🚀 ~ sendMessage ~ message:", message);
    const { id: recieverId } = req.params;
    console.log("🚀 ~ sendMessage ~ recieverId:", recieverId);

    const senderId = (req as RequestWithUser).user.id;

    if (!message || !recieverId || !senderId) {
      throw new Error("All fields are mandatory!");
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message
    });

    const conversationData = new Conversation({
      participants: [senderId, recieverId]
      //   messages: [message]
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }
    });
    console.log("🚀 ~ sendMessage ~ conversation:", conversation);

    if (!conversation) {
      conversation = await Conversation.create(conversationData);
    }
    console.log("🚀 ~ sendMessage ~ conversation:", conversation);

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    await newMessage.save();

    res.status(200).send("Message sent!");
  } catch (error) {
    throw new Error("Can;t send messages");
  }
});

const getAllMessages = asyncHanlder(async (req: Request, res: Response) => {
  try {
    const myId = (req as RequestWithUser).user?._id;
    const toUserId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [toUserId, myId] }
    }).populate("messages");
    console.log("🚀 ~ getAllMessages ~ messages:", conversation);

    res.status(200).send(conversation?.messages);
  } catch (error) {
    throw new Error("Error in getting all messages");
  }
});

const deleteMessageById = asyncHanlder(async (req: Request, res: Response) => {
  try {
    const msgId = req.params.id;

    const conversationMsgs = await Conversation.findOne({ messages: msgId });
    console.log("🚀 ~ deleteMessageById ~ conversation:", conversationMsgs);

    if (!conversationMsgs?.messages) {
      res.status(200).send("Conversation not found!");
    } else {
      conversationMsgs.messages = conversationMsgs.messages.filter(
        (msg) => msg._id.toString() !== msgId
      );

      await conversationMsgs.save();

      await Message.findByIdAndDelete(msgId);
      res.status(204).send("Message deleted successfully!");
    }
  } catch (error) {
    throw new Error("Error in deleteing msg by id");
  }
});

export { sendMessage, getAllMessages, deleteMessageById };
