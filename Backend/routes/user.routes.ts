import { deleteAllUsers, getAllUsers } from "../controllers/user.controller";
import protectRoute from "../middlewares/protectRoute";
import express from "express";

const router = express.Router();

router.get("/", protectRoute, getAllUsers);
router.delete("/all", protectRoute, deleteAllUsers);

export default router;
