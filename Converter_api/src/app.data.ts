import { ConversionConfig, Format, SubscriptionLevel } from "./utils/types";

export const conversionsConfig: ConversionConfig = {
  [Format.PDF]: {
    [Format.PPTX]: {
      filter: '"Impress MS PowerPoint 2007 XML"',
      infilter: "impress_pdf_import",
    },
    [Format.PNG]: {
      filter: "draw_png_Export",
    },
    [Format.JPG]: {
      filter: "draw_jpg_Export",
    },
    [Format.HTML]: {
      filter: "impress_html_Export:EmbedImages",
    },
    [Format.DOCX]: {
      infilter: "writer_pdf_import",
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
    [Format.JPG]: {
      filter: "draw_jpg_Export",
    },
  },
  [Format.PNG]: {
    [Format.PDF]: {
      filter: "writer_pdf_Export",
    },
    [Format.JPG]: {
      filter: "draw_jpg_Export",
    },
    [Format.SVG]: {
      filter: "draw_svg_Export",
    },
  },
  [Format.JPG]: {
    [Format.PDF]: {
      filter: "writer_pdf_Export",
    },
    [Format.PNG]: {
      filter: "draw_png_Export",
    },
    [Format.SVG]: {
      filter: "draw_svg_Export",
    },
  },
  [Format.SVG]: {
    [Format.PDF]: {
      filter: "writer_pdf_Export",
    },
    [Format.PNG]: {
      filter: "draw_png_Export",
    },
    [Format.JPG]: {
      filter: "draw_jpg_Export",
    },
  },
  [Format.XLSX]: {
    [Format.PDF]: {
      filter: "calc_pdf_Export",
    },
    [Format.CSV]: {},
    [Format.HTML]: {},
  },
  [Format.CSV]: {
    [Format.XLSX]: {},
    [Format.PDF]: {
      filter: "calc_pdf_Export",
    },
    [Format.HTML]: {},
  },
};

export const subscriptionModel = {
  [SubscriptionLevel.Free]: {
    monthlyRequests: 30,
    limitPerMinute: 1,
  },
  [SubscriptionLevel.BASIC]: {
    monthlyRequests: 1000,
    limitPerMinute: 5,
  },
  [SubscriptionLevel.PREMIUM]: {
    monthlyRequests: 10000,
    limitPerMinute: -1,
  },
  [SubscriptionLevel.INFINITE]: {
    monthlyRequests: -1,
    limitPerMinute: -1,
  },
};
