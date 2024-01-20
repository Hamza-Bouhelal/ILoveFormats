import * as fs from "fs";
import * as path from "path";
import { Format } from "../utils/types";
import { execSync } from "child_process";

export class ConverterService {
  static bufferToFile = (
    requestId: string,
    fileBuffer: Buffer,
    fileName: string
  ) => {
    const dir = path.join(__dirname, "..", "temp", requestId);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, fileBuffer);
    return { dir, filePath };
  };

  static convertFile = (
    dir: string,
    fileName: string,
    format: Format
  ): void => {
    const command = `soffice --headless --convert-to ${format} ${dir}/${fileName} --outdir ${dir}`;
    execSync(command);
  };
}
