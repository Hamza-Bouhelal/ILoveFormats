import { Format } from "../utils/types";
import { execSync } from "child_process";

const formatToDefaultFilter: { [key: string]: string } = {
  [Format.PPTX]: '"Impress MS PowerPoint 2007 XML"',
  [Format.PDF]: "writer_pdf_Export",
};

export class ConverterService {
  static convertFile = ({
    dir,
    fileName,
    format,
    from,
  }: {
    dir: string;
    fileName: string;
    format: Format;
    from?: Format;
  }): void => {
    const command = `soffice ${
      from && from === Format.PDF ? '--infilter="impress_pdf_import"' : ""
    } --headless --convert-to ${format}:${
      formatToDefaultFilter[format]
    } ${dir}/${fileName} --outdir ${dir}`;
    console.log(`Executing command: ${command}`);
    execSync(command, { stdio: "inherit" });
  };
}
