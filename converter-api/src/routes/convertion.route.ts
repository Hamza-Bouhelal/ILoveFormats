import { NextFunction, Request, Response, Router } from "express";
import { fileValidationMiddleware } from "./convertion.validation";
import { FileUploadRequest, Format, Formats } from "../utils/types";
import { basicConvertion } from "../controllers/convertion.controller";
import fileUpload from "express-fileupload";
import { conversionsConfig } from "../app.data";
import { authMiddleware } from "../middlewares/auth.middleware";
import { subscriptionMiddleware } from "../middlewares/subscription.middleware";

const endpointName = ({ from, to }: Formats) => `/${from}/to/${to}`;

function formatsSetter(formats: Formats) {
  return (req: Request, _: Response, next: NextFunction) => {
    (req as FileUploadRequest).format = formats.from;
    next();
  };
}

export const convertionRouter = () => {
  const router = Router();

  const setupEndpoint = (formats: Formats) => {
    router.post(
      endpointName(formats),
      authMiddleware(true),
      formatsSetter(formats),
      subscriptionMiddleware,
      fileUpload(),
      fileValidationMiddleware,
      basicConvertion(formats)
    );
  };

  Object.entries(conversionsConfig).forEach(([from, possibleConversions]) => {
    Object.keys(possibleConversions).forEach((to) => {
      setupEndpoint({ from: from as Format, to: to as Format });
    });
  });

  return router;
};
