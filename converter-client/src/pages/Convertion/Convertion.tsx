import { Format } from "../../utils/types";
import {
  conversionConfig,
  extentionToFileType,
} from "../../utils/conversionConfig";
import { Button, Card, CardBody, Link, Progress } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "../../assets/Icons";
import { converter } from "./Api/converter";
import toast from "react-hot-toast";
import { Error } from "../../Common/Components/Error";

import { useAuthentificatedPage } from "../../Common/Hooks/useIsAuthentificated";

enum ErrorType {
  FormatsNotFound = "FormatsNotFound",
  FromIsntAFormat = "FromIsntAFormat",
  ToIsntAFormat = "ToIsntAFormat",
  CannotConvertFromTo = "CannotConvertFromTo",
}

const getErrorText = (errorType: ErrorType) => {
  switch (errorType) {
    case ErrorType.FormatsNotFound:
      return "Conversion not supported. Please check your file formats.";
    case ErrorType.CannotConvertFromTo:
      return "Cannot convert from the selected format to the target format.";
    case ErrorType.FromIsntAFormat:
      return "Invalid 'from' format selected.";
    case ErrorType.ToIsntAFormat:
      return "Invalid 'to' format selected.";
    default:
      return "Unknown error occurred.";
  }
};

export const Conversion = () => {
  const { accessToken } = useAuthentificatedPage();
  const [searchParams, _] = useSearchParams();
  const [notFound, setNotFound] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const from = searchParams.get("from") as Format;
  const to = searchParams.get("to") as Format;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!from || !to) {
      setNotFound(ErrorType.FormatsNotFound);
    } else if (!(conversionConfig[from] as any)[to]) {
      setNotFound(ErrorType.CannotConvertFromTo);
    } else if (!Object.values(Format).includes(from)) {
      console.log(from, to, Format);
      setNotFound(ErrorType.FromIsntAFormat);
    } else if (!Object.values(Format).includes(to)) {
      setNotFound(ErrorType.ToIsntAFormat);
    } else {
      setNotFound(null);
    }
  }, [from, to]);

  const converterUtil = async (file: File) => {
    try {
      const conversionStatus = await converter(from, to, file, accessToken);
      if (conversionStatus && conversionStatus.error) {
        toast.error(conversionStatus.error, {});
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while converting the file.", {});
    } finally {
      setIsLoading(false);
    }
  };

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (!e.target.files) return;
    const file = e.target.files[0];
    await converterUtil(file);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setIsLoading(true);
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    await converterUtil(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    disabled: isLoading,
  });

  return (
    <>
      {notFound ? (
        <Error message={getErrorText(notFound)} />
      ) : (
        <div className="py-24 text-center mx-auto">
          <p className="text-4xl uppercase">
            Convert{" "}
            <span className="font-bold">{extentionToFileType[from]}</span> to{" "}
            <span className="font-bold">{extentionToFileType[to]}</span>
          </p>
          <p className="text-2xl mt-4 font-light">
            Convert your {extentionToFileType[from]} files to{" "}
            {extentionToFileType[to]} with amazing graphics.
          </p>
          <p className="text-xm font-light">
            Powered by
            <Link
              href="https://www.libreoffice.org/"
              className="pl-1"
              underline="always"
            >
              LibreOffice
            </Link>
            .
          </p>

          <Button
            className="cursor-pointer mx-auto mt-12 min-w-[250px] min-h-[70px] text-lg hover:bg-primary/50"
            color="primary"
            onClick={() => ref.current?.click()}
            disabled={isLoading}
          >
            Upload {extentionToFileType[from]} file
          </Button>
          <Card className="mt-12 p-6 max-w-[400px] min-h-[200px] justify-center mx-auto">
            <CardBody
              className={`max-w-[400px] min-h-[200px] border-dotted border-secondary border-opacity-50 border-5 ${
                isDragActive
                  ? "bg-secondary/50"
                  : !isLoading
                  ? "animate-pulse"
                  : ""
              }`}
            >
              <div {...getRootProps()}>
                <Icons.UploadSvgIcon
                  className="mx-auto mt-8"
                  size={{ width: 50, height: 50 }}
                />
                <p className="text-base mt-4 text-center max-w-[200px] m-auto">
                  Drag and drop your {extentionToFileType[from]} file here to
                  upload it.
                </p>
              </div>
            </CardBody>
          </Card>

          {isLoading && (
            <Progress
              size="sm"
              isIndeterminate
              className="max-w-md mx-auto mt-12"
            />
          )}
          <input
            type="file"
            className="hidden"
            {...getInputProps()}
            ref={ref}
            onChange={onFileUpload}
          />
        </div>
      )}
    </>
  );
};
