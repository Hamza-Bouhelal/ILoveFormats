import { Response } from "express";
import { CustomRequest, Format, Formats } from "../utils/types";
import { ConverterService } from "../services/converter.service";
import fs from "fs";
import mime from "mime-types";
import { safeDeleteDir } from "../utils/file.utils";

export class FileConvertionController {
  private static pathBuilder(req: CustomRequest) {
    return {
      dir: `./files/${req.requestId}`,
      fileName: req.fileName,
    };
  }

  private static getOutputFile(requestId: string, format: Format) {
    try {
      const dir = `./files/${requestId}`;
      const files = fs.readdirSync(dir);
      const file = files.find((file) => file.endsWith(format));
      if (!file) {
        throw new Error(
          `No file found with format ${format} in directory ${dir}`
        );
      }
      return {
        fileName: file,
        buffer: fs.readFileSync(`${dir}/${file}`),
      };
    } catch (e) {
      console.error(`Error while getting output file: ${e}`);
      throw e;
    }
  }

  static basicConvertion({ from, to }: Formats) {
    return (req: CustomRequest, res: Response) => {
      const { requestId } = req;
      try {
        ConverterService.convertFile({
          ...FileConvertionController.pathBuilder(req),
          from,
          to,
        });
        const bufferOutput = FileConvertionController.getOutputFile(
          requestId,
          to
        );
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${bufferOutput.fileName}`
        );
        res.setHeader(
          "Content-Type",
          mime.contentType(bufferOutput.fileName) || ""
        );
        res.send(bufferOutput.buffer);
      } catch (e) {
        console.error(
          `Error while converting file from ${from} to ${to}: ${e}`
        );
        res.status(500).json({ message: "Error while converting file." });
      }
      safeDeleteDir(`./files/${requestId}`);
    };
  }
}
