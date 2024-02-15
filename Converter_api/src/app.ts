import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { AppDataSource } from "./data-source";
import { convertionRouter } from "./routes/convertion.route";
import { clientErrorHandler } from "./middlewares/error/error.middleware";
import { unknownErrorHandler } from "./middlewares/error/unknown.error";
import { subscriptionRouter } from "./routes/subscription.route";
import morgan from "morgan";

export const createApp = async () => {
  const app = express();

  await AppDataSource.initialize();

  app.use(express.json());
  app.use(morgan("common"));
  app.use(cors());
  app.use(clientErrorHandler);
  app.use(unknownErrorHandler);

  app.use("/api/user", userRouter());
  app.use("/api/sub", subscriptionRouter());
  app.use("/api/convert", convertionRouter());

  return app;
};
