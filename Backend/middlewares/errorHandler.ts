import { NextFunction, Response, Request } from "express";
import statusCodes from "../utils/constants";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = res.statusCode ?? 500;

  switch (code) {
    case statusCodes.NOT_FOUND:
      res.json({
        title: statusCodes.NOT_FOUND,
        message: err.message,
        stackTrace: err.stack
      });

      break;

    case statusCodes.FORBIDDEN:
      res.json({
        title: statusCodes.FORBIDDEN,
        message: err.message,
        stackTrace: err.stack
      });

      break;

    case statusCodes.BAD_REQUEST:
      res.json({
        title: statusCodes.BAD_REQUEST,
        message: err.message,
        stackTrace: err.stack
      });

      break;

    case statusCodes.UNAUTHORIZED:
      res.json({
        title: statusCodes.UNAUTHORIZED,
        message: err.message,
        stackTrace: err.stack
      });

      break;

    default:
    case statusCodes.INTERNAL_SERVER_ERROR:
      res.json({
        title: statusCodes.INTERNAL_SERVER_ERROR,
        message: err.message,
        stackTrace: err.stack
      });
  }
};

export default errorHandler;
