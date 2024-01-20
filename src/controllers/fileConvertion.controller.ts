import { Response } from "express";
import { CustomRequest } from "../utils/types";

export class FileConvertionController {
  static pdfToPptx(req: CustomRequest, res: Response) {
    console.log(req.requestId);
    res.send("Hello world");
  }
}
