import fs from "fs";

export const safeDeleteDir = (dirPath: string) => {
  setTimeout(() => {
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath, { recursive: true });
    }
  }, 10000);
};
