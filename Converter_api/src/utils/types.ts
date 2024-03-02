import { Request } from 'express';
import { FileArray } from 'express-fileupload';
import { AuthCustomRequest } from '../middlewares/auth.middleware';

export enum Format {
  PDF = 'pdf',
  PNG = 'png',
  JPG = 'jpg',
  HTML = 'html',
  TXT = 'txt',
  CSV = 'csv',
  PPTX = 'pptx',
  DOCX = 'docx',
  XLSX = 'xlsx',
  SVG = 'svg',
}

export interface ConversionArgs {
  filter?: string;
  infilter?: string;
}

type conversionInnerConfig = Partial<Record<Format, ConversionArgs>>;

export type ConversionConfig = Partial<Record<Format, conversionInnerConfig>>;

export interface ConvertFileParams {
  dir: string;
  fileName: string;
  to: Format;
  from: Format;
}

export interface Formats {
  from: Format;
  to: Format;
}

export interface FileUploadRequest extends Request {
  files?: FileArray | null;
  format?: Format;
}

export interface RequestInfo {
  requestId: string;
  fileName: string;
}

export type CustomRequest = FileUploadRequest & RequestInfo & AuthCustomRequest;

export enum SubscriptionLevel {
  Free = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  INFINITE = 'infinite',
}
