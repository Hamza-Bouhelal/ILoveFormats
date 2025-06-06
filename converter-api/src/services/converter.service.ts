import { conversionsConfig } from "../app.data";
import { ConversionArgs, ConvertFileParams, Format } from "../utils/types";
import { execSync } from "child_process";

const getConversionArgs = (from: Format, to: Format): ConversionArgs => {
  const { filter, infilter } = (
    conversionsConfig[from] as { [key in Format]: ConversionArgs }
  )[to];
  return {
    filter: filter ? `:${filter}` : "",
    infilter,
  };
};

export class ConverterService {
  static convertFile = ({
    dir,
    fileName,
    from,
    to,
  }: ConvertFileParams): void => {
    const { filter, infilter } = getConversionArgs(from, to);
    const infilterArg = infilter ? `--infilter="${infilter}"` : "";
    const command = `soffice ${infilterArg} --headless --convert-to ${to}${filter} "${dir}/${fileName}" --outdir ${dir}`;
    execSync(command, { stdio: "inherit" });
  };
}
