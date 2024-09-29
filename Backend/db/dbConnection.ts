import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDb() {
  try {
    const uri = process.env.MONGODB_URI || "";
    console.log(uri);

    const connection = await mongoose.connect(uri);

    console.log("MongoDB database connected successfully!!");
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}
