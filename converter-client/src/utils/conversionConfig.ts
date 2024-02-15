import { ConversionConfig, Format } from "./types";

export const extentionToFileType: { [format: string]: string } = {
  [Format.PDF]: "PDF",
  [Format.PPTX]: "PowerPoint",
  [Format.DOCX]: "Word",
  [Format.XLSX]: "Excel",
  [Format.HTML]: "HTML",
  [Format.TXT]: "Text",
  [Format.CSV]: "CSV",
  [Format.PNG]: "PNG",
  [Format.JPG]: "JPG",
  [Format.SVG]: "SVG",
};

export const conversionConfig: ConversionConfig = {
  [Format.PDF]: {
    [Format.PPTX]:
      "Turn your PDF files into easy to edit PowerPoint slideshows.",
    [Format.PNG]: "Convert your PDF files to PNG images.",
    [Format.JPG]: "Convert your PDF files to JPG images.",
    [Format.HTML]:
      "Convert your PDF files to HTML. (css not included, images are embedded)",
    [Format.DOCX]: "Convert your PDF files to Word documents.",
  },
  [Format.PPTX]: {
    [Format.PDF]: "Turn your PowerPoint slideshows into PDF files.",
    [Format.HTML]:
      "Convert your PowerPoint slideshows to HTML. (css not included, images are embedded)",
    [Format.PNG]:
      "Convert your PowerPoint slideshows to PNG images. (one page converted only)",
    [Format.JPG]:
      "Convert your PowerPoint slideshows to JPG images. (one page converted only)",
  },
  [Format.PNG]: {
    [Format.PDF]: "Convert your PNG images to PDF files.",
    [Format.JPG]: "Convert your PNG images to JPG images.",
    [Format.SVG]: "Convert your PNG images to SVG images.",
  },
  [Format.JPG]: {
    [Format.PDF]: "Convert your JPG images to PDF files.",
    [Format.PNG]: "Convert your JPG images to PNG images.",
    [Format.SVG]: "Convert your JPG images to SVG images.",
  },
  [Format.SVG]: {
    [Format.PDF]: "Convert your SVG images to PDF files.",
    [Format.PNG]: "Convert your SVG images to PNG images.",
    [Format.JPG]: "Convert your SVG images to JPG images.",
  },
  [Format.XLSX]: {
    [Format.PDF]: "Turn your Excel spreadsheets into PDF files.",
    [Format.HTML]:
      "Convert your Excel spreadsheets to HTML. (css included, images are embedded)",
    [Format.CSV]: "Convert your Excel spreadsheets to CSV files.",
  },
  [Format.CSV]: {
    [Format.XLSX]: "Convert your CSV files to Excel spreadsheets.",
    [Format.HTML]: "Convert your CSV files to HTML.",
    [Format.PDF]: "Convert your CSV files to PDF files.",
  },
};
