export enum Format {
  PDF = "pdf",
  PNG = "png",
  JPG = "jpg",
  HTML = "html",
  TXT = "txt",
  CSV = "csv",
  PPTX = "pptx",
  DOCX = "docx",
  XLSX = "xlsx",
  SVG = "svg",
}

export interface ConversionConfig {
  [key: string]: {
    [key: string]: string;
  };
}
