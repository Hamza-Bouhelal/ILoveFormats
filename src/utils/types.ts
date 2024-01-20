import { Request } from "express";
import { FileArray } from "express-fileupload";

export enum Format {
  PDF = "pdf",
  PNG = "png",
  JPG = "jpg",
  HTML = "html",
  TXT = "txt",
  CSV = "csv",
  PPTX = "pptx",
}

export interface Formats {
  from: Format;
  to: Format;
}

export interface FileUploadRequest extends Request {
  files?: FileArray | null;
}

export interface RequestInfo {
  requestId: string;
  fileName: string;
}

export type CustomRequest = FileUploadRequest & RequestInfo;
