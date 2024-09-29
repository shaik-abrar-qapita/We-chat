import asyncHanlder from "express-async-handler";
import User from "../models/user.model";
import { Request, Response } from "express";

interface RequestWithUser extends Request {
  user?: any; // Adjust this to match the actual type of your User model, e.g., `UserDocument`
}

const getAllUsers = asyncHanlder(async (req: Request, res: Response) => {
  const loggedInUserId = (req as RequestWithUser).user?._id;
  const users = await User.find({ _id: { $ne: loggedInUserId } });
  console.log("getAll", users);
  res.status(200).send(users);
});

const deleteAllUsers = asyncHanlder(async (req, res) => {
  await User.deleteMany();
  getAllUsers(req, res, () => {});
});

export { getAllUsers, deleteAllUsers };
