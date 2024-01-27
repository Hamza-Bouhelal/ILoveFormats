import express from "express";
import { authValidationMiddleware } from "./middlewares/auth";
import cors from "cors";
import fileUpload from "express-fileupload";
import { FileConvertionController } from "./controllers/fileConvertion.controller";
import { fileValidationMiddleware } from "./middlewares/file.validation";
import { Format, Formats } from "./utils/types";
import { conversionsConfig } from "./conversionConfig";

const endpointName = ({ from, to }: Formats) => `/convert/${from}/to/${to}`;

export const createApp = () => {
  const app = express();

  const setupEndpoint = (formats: Formats) => {
    console.log(`Setting up endpoint ${endpointName(formats)}`);
    app.post(
      endpointName(formats),
      authValidationMiddleware,
      fileUpload(),
      fileValidationMiddleware,
      FileConvertionController.basicConvertion(formats) as any
    );
  };

  app.use(express.json());
  app.use(cors());

  Object.keys(conversionsConfig).forEach((from) => {
    Object.keys(conversionsConfig[from as Format] as object).forEach((to) => {
      setupEndpoint({ from: from as Format, to: to as Format });
    });
  });

  return app;
};
