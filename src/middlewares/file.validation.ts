import { Response, NextFunction } from "express";
import { CustomRequest, FileUploadRequest } from "../utils/types";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { safeDeleteDir } from "../utils/file.utils";

export const fileValidationMiddleware = (
  req: FileUploadRequest,
  res: Response,
  next: NextFunction
) => {
  const requestId = uuid();

  const dir = `./files/${requestId}`;
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

    const file = files[0];
    if (Array.isArray(file)) {
      return res.status(400).json({ error: "Only one file can be uploaded." });
    }

    fs.mkdirSync(dir);
    file.mv(`${dir}/${file.name}`, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while processing file." });
      } else {
        if (!fs.existsSync(`${dir}/${file.name}`)) {
          safeDeleteDir(dir);
          console.error(
            `Error while processing file: ${file.name} does not exist in ${dir}`
          );
          return res
            .status(500)
            .json({ message: "Error while processing file." });
        }
        fs.chmodSync(`${dir}/${file.name}`, "777");
        (req as CustomRequest).requestId = requestId;
        (req as CustomRequest).fileName = file.name;
        next();
      }
    });
  } catch (e) {
    safeDeleteDir(dir);
    console.error(`Error while processing file: ${e}`);
    return res.status(500).json({ message: "Error while processing file." });
  }
};
