import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

interface RequestWithUser extends Request {
  user?: any; // Adjust this to match the actual type of your User model, e.g., `UserDocument`
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req cookies-", req.cookies);

    const token = req.cookies?.jwt;
    console.log("🚀 ~ token:", token);

    if (!token) {
      return res.status(401).send("Unauthorized - NO TOKEN PROVIDED");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;
    console.log("🚀 ~ decoded:", decoded);

    if (!decoded) {
      return res.status(401).send("Unauthorized - Invalid token");
    }

    const user = await User.findById(decoded?.userId).select("-password");
    console.log("🚀 ~ user:", user);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    (req as RequestWithUser).user = user;

    // Call the next middleware or route handler
    return next();
  } catch (error: unknown) {
    return res.status(500).send({
      error: "Server Error",
      message: (error as Error).message || "An unknown error occurred"
    });
  }
};

export default protectRoute;
