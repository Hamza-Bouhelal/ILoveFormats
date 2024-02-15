import { getConfig } from "../../../utils/config";

const { BACKEND_BASE_URL } = getConfig();
export const converter = async (
  from: string,
  to: string,
  file: File,
  accessToken?: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `${BACKEND_BASE_URL}/convert/${from}/to/${to}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      return {
        error: (await response.json()).error || "Error while converting file.",
      };
    }
    const buffer = await response.arrayBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.split(".").slice(0, -1).join(".") + "." + to;
    a.click();
  } catch (error: any) {
    console.error(error);
    return {
      error:
        (await error.response.json()).error || "Error while converting file.",
    };
  }
};
