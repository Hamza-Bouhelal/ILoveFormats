import { Response, NextFunction } from "express";
import { CustomRequest, FileUploadRequest } from "../utils/types";
import { v4 as uuid } from "uuid";
import fs from "fs";

export const fileValidationMiddleware = (
  req: FileUploadRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const files = Object.values(req.files);

    if (!files) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    if (files.length > 1) {
      return res.status(400).json({ error: "Only one file can be uploaded." });
    }

    const requestId = uuid();

    const dir = `./tmp/${requestId}`;
    fs.mkdirSync(dir);

    const file = files[0];
    if (Array.isArray(file)) {
      return res.status(400).json({ error: "Only one file can be uploaded." });
    }
    file.mv(`${dir}/${file.name}`, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while processing file." });
      } else {
        (req as CustomRequest).requestId = requestId;
        (req as CustomRequest).filePath = `${dir}/${file.name}`;
        next();
      }
    });
  } catch {
    return res.status(500).json({ message: "Error while processing file." });
  }
};
