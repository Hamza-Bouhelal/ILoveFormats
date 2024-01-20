import { Request } from "express";
import { FileArray } from "express-fileupload";

export enum Format {
  PDF = "pdf",
  PNG = "png",
  JPG = "jpg",
  HTML = "html",
  TXT = "txt:Text",
  CSV = "csv:Text",
  PPTX = "pptx",
}

export interface FileConvertionDto {
  requestId: string;
  fileBuffer: Buffer;
  fileName: string;
  fileTypeFrom: Format;
  fileTypeTo: Format;
}

export interface FileUploadRequest extends Request {
  files?: FileArray | null;
}

export interface RequestInfo {
  requestId: string;
  filePath: string;
}

export type CustomRequest = FileUploadRequest & RequestInfo;
