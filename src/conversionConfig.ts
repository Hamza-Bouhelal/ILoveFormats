import { ConversionConfig, Format } from "./utils/types";

export const conversionsConfig: ConversionConfig = {
  [Format.PDF]: {
    [Format.PPTX]: {
      filter: '"Impress MS PowerPoint 2007 XML"',
      infilter: "impress_pdf_import",
    },
    [Format.PNG]: {
      filter: "draw_png_Export",
    },
    [Format.HTML]: {
      filter: "impress_html_Export:EmbedImages",
    },
  },
  [Format.PPTX]: {
    [Format.PDF]: {
      filter: "writer_pdf_Export",
    },
    [Format.HTML]: {
      filter: "impress_html_Export:EmbedImages",
    },
    [Format.PNG]: {
      filter: "draw_png_Export",
    },
  },
  [Format.PNG]: {
    [Format.PDF]: {
      filter: "writer_pdf_Export",
    },
  },
};
