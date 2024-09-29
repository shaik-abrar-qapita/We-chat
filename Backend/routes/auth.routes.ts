import express, { Request, Response } from "express";
import { login, logOut, signUp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", logOut);

export default router;
