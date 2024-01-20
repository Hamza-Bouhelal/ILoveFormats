import express from "express";
import { authValidationMiddleware } from "./middlewares/auth";
import cors from "cors";
import fileUpload from "express-fileupload";
import { FileConvertionController } from "./controllers/fileConvertion.controller";
import { fileValidationMiddleware } from "./middlewares/file.validation";
import { Format, Formats } from "./utils/types";

const endpointName = ({ from, to }: Formats) => `/convert/${from}/to/${to}`;

export const createApp = () => {
  const app = express();

  const setupEndpoint = (
    formats: Formats,
    callback: (formats: Formats) => any
  ) => {
    app.post(
      endpointName(formats),
      authValidationMiddleware,
      fileUpload(),
      fileValidationMiddleware,
      callback(formats)
    );
  };

  app.use(express.json());
  app.use(cors());

  setupEndpoint(
    { from: Format.PDF, to: Format.PPTX },
    FileConvertionController.basicConvertion
  );

  setupEndpoint(
    { from: Format.PPTX, to: Format.PDF },
    FileConvertionController.basicConvertion
  );

  return app;
};
