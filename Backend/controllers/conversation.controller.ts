import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Conversation from "../models/conversation.model";

const getAllConversations = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const all = await Conversation.find();
      res.status(200).send(all);
    } catch (error) {
      throw new Error("Error in get All Conversations");
    }
  }
);

const deleteConversatioById = () => {};

export { getAllConversations, deleteConversatioById };
