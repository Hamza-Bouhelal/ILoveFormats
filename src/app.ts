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

  // From PDF
  setupEndpoint({ from: Format.PDF, to: Format.PPTX });

  // From PPTX
  setupEndpoint({ from: Format.PPTX, to: Format.PDF });
  setupEndpoint({ from: Format.PPTX, to: Format.HTML });

  return app;
};
