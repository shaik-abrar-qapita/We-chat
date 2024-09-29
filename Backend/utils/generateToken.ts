import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
import mongoose, { ObjectId } from "mongoose";
dotenv.config();

const generateTokenAndSetCookie = (
  userId: mongoose.Types.ObjectId,
  res: Response
) => {
  const secret_key = process.env.JWT_SECRET || "secret";
  console.log("secret_key", secret_key);

  const token = jwt.sign({ userId }, secret_key, {
    expiresIn: "1h"
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
};

export default generateTokenAndSetCookie;
