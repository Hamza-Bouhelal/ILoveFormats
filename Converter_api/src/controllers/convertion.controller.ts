import { Request, Response } from "express";
import { CustomRequest, Format, Formats } from "../utils/types";
import { ConverterService } from "../services/converter.service";
import fs from "fs";
import mime from "mime-types";
import { safeDeleteDir } from "../utils/file.utils";
import { Repositories } from "../utils/repositories.factory";
import { AuthCustomRequest } from "../middlewares/auth.middleware";

const { subscribtionRepository } = Repositories.getRepositories();

function pathBuilder(req: CustomRequest) {
  return {
    dir: `./files/${req.requestId}`,
    fileName: req.fileName,
  };
}

function getOutputFile(requestId: string, format: Format) {
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

export function basicConvertion({ from, to }: Formats) {
  return async (req: Request, res: Response) => {
    const { requestId } = req as CustomRequest;
    try {
      ConverterService.convertFile({
        ...pathBuilder(req as CustomRequest),
        from,
        to,
      });
      const bufferOutput = getOutputFile(requestId, to);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${bufferOutput.fileName}`
      );
      res.setHeader(
        "Content-Type",
        mime.contentType(bufferOutput.fileName) || ""
      );

      await subscribtionRepository.update(
        { id: (req as AuthCustomRequest).user.subscription.id },
        { converts: () => "converts - 1" }
      );

      res.send(bufferOutput.buffer);
    } catch (e) {
      console.error(`Error while converting file from ${from} to ${to}: ${e}`);
      res.status(500).json({ message: "Error while converting file." });
    }
    safeDeleteDir(`./files/${requestId}`);
  };
}
