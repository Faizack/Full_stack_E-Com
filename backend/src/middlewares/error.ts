import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/utitlity.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Interal Server Error";

  err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch = (func:ControllerType) =>
     (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(func(req, res, next));
    };
