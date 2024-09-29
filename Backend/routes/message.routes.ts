import express from "express";
import {
  deleteMessageById,
  getAllMessages,
  sendMessage
} from "../controllers/message.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

router.get("/getall/:id", protectRoute, getAllMessages);

router.delete("/delete/:id", protectRoute, deleteMessageById);

export default router;
