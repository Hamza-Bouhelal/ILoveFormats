import { NextFunction, Request, Response } from "express";

export const unknownErrorHandler = (
  _: Error,
  __: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ___: NextFunction
): void => {
  res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
  });
};
