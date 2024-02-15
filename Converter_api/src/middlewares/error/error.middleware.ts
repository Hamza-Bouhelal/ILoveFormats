import { NextFunction, Request, Response } from "express";
import ClientError from "./client.error";

export const clientErrorHandler = (
  error: ClientError | Error,
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      error: error.message,
    });
  } else {
    next(error);
  }
};
