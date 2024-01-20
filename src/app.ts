import express from "express";
import { authValidationMiddleware } from "./middlewares/auth";
import cors from "cors";
import fileUpload from "express-fileupload";
import { FileConvertionController } from "./controllers/fileConvertion.controller";
import { fileValidationMiddleware } from "./middlewares/file.validation";

const endpointName = (from: string, to: string) => `/convert/${from}/to/${to}`;

export const createApp = () => {
  const app = express();

  const setupEndpoint = (from: string, to: string, callback: any) => {
    app.post(
      endpointName(from, to),
      authValidationMiddleware,
      fileUpload(),
      fileValidationMiddleware,
      callback
    );
  };

  app.use(express.json());
  app.use(cors());

  setupEndpoint("pdf", "png", FileConvertionController.pdfToPptx);

  return app;
};
