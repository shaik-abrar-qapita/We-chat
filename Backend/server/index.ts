import express from "express";
import dotenv from "dotenv";
import authroutes from "../routes/auth.routes";
import cors from "cors";
import errorHandler from "../middlewares/errorHandler";
import { connectDb } from "../db/dbConnection";
import messageRoutes from "../routes/message.routes";
import conversationRoutes from "../routes/conversation.routes";
import userRoutes from "../routes/user.routes";

import cookieparser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieparser());
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const port_number = process.env.PORT || 5000;

app.listen(port_number, () => {
  connectDb();
  console.log("Server is runnnnning on Port ", port_number);
});
