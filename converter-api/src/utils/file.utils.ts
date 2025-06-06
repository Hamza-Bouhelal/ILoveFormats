import fs from "fs";

export const safeDeleteDir = (dirPath: string) => {
  setTimeout(() => {
    if (fs.existsSync(dirPath)) {
      fs.rm(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.error(`Error while deleting directory ${dirPath}: ${err}`);
        }
      });
    }
  }, 10000);
};
