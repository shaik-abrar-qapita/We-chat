import express from "express";
import protectRoute from "../middlewares/protectRoute";
import {
  deleteConversatioById,
  getAllConversations
} from "../controllers/conversation.controller";

const router = express.Router();

router.get("/getall", protectRoute, getAllConversations);

router.delete("/delete/:id", protectRoute, deleteConversatioById);

export default router;
