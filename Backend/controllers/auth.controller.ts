import express, { Request, Response } from "express";
import asyncHanlder from "express-async-handler";
import mongoose from "mongoose";
import userModel from "../models/user.model";
import User from "../models/user.model";
import bcyrpt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken";

const login = asyncHanlder(async (req: Request, res: Response) => {
  console.log("🚀 ~ login ~ req body:", req.body);

  try {
    const { username, password } = req.body;
    console.log("🚀 ~ login ~ password:", password);
    console.log("🚀 ~ login ~ username:", username);

    if (!username || !password) {
      res.status(400);
      throw new Error("Username and password is mandatory");
    }

    const getUser = await User.findOne({ username });
    console.log("🚀 ~ login ~ getUser:", getUser);

    if (getUser) {
      const checkPasswords = await bcyrpt.compare(password, getUser.password);
      console.log("🚀 ~ login ~ checkPasswords:", checkPasswords);
      if (checkPasswords) {
        generateTokenAndSetCookie(getUser._id, res);
        res.status(200).send(getUser);
      } else {
        res.status(400);
        throw new Error("Passwords are not matching!!");
      }
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error: unknown) {
    throw new Error("Login  Failed");
  }
});

const signUp = asyncHanlder(async (req: Request, res: Response) => {
  const {
    fullName,
    username,
    password,
    gender,
    phone,
    profilePic,
    confirmPassword
  } = req.body;

  try {
    if (!fullName || !username || !phone || !password || !gender) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords are not matching!");
    }

    const salt = await bcyrpt.genSalt(10);
    console.log("slat", salt);
    const hashedPassword = await bcyrpt.hash(password, salt);
    console.log("hasedPassowrd", hashedPassword);

    let newProfilePic = profilePic;
    if (!profilePic) {
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      newProfilePic = gender === "male" ? boyProfilePic : girlProfilePic;
    }

    const newUser = new User({
      fullName,
      username,
      phone,
      profilePic: newProfilePic,
      gender,
      password: hashedPassword
    });
    if (newUser) {
      newUser.save();
      generateTokenAndSetCookie(newUser._id, res);
      res.status(200).send(newUser);
    }
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
});

const logOut = asyncHanlder(async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).send({
    logout: "suceess"
  });
});

export { login, signUp, logOut };
