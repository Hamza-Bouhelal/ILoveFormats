import { Format } from "../utils/types";
import { execSync } from "child_process";

const formatToDefaultFilter: { [key: string]: string } = {
  [Format.PPTX]: '"Impress MS PowerPoint 2007 XML"',
  [Format.PDF]: "writer_pdf_Export",
  [Format.CSV]: "Text",
  [Format.TXT]: "Text",
  [Format.HTML]: "impress_html_Export:EmbedImages",
};

export class ConverterService {
  static convertFile = ({
    dir,
    fileName,
    from,
    to,
  }: {
    dir: string;
    fileName: string;
    to: Format;
    from: Format;
  }): void => {
    const command = `soffice ${
      from && from === Format.PDF ? '--infilter="impress_pdf_import"' : ""
    } --headless --convert-to ${to}:${
      formatToDefaultFilter[to]
    } ${dir}/${fileName} --outdir ${dir}`;
    console.log(`Executing command: ${command}`);
    execSync(command, { stdio: "inherit" });
  };
}
