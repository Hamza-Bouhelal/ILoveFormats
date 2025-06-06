import { conversionsConfig } from "../src/app.data";
import { getConfig } from "../src/utils/config";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

const { PORT } = getConfig();

const fixturesDir = fs.readdirSync("./tests/fixtures");

describe("App", () => {
  Object.entries(conversionsConfig).forEach(([from, tos]) => {
    const filePath = fixturesDir.find((file) => file.endsWith(`.${from}`));
    Object.entries(tos).forEach(([to, _]) => {
      it(`Conversion from ${from} to ${to}`, async () => {
        if (!filePath) {
          throw new Error(`No file found for ${from}`);
        }
        const fullPath = path.join(__dirname, `./fixtures/${filePath}`);
        const fileStream = fs.createReadStream(fullPath);
        const formData = new FormData();
        formData.append("file", fileStream);
        const res = await axios.post(
          `http://localhost:${PORT}/convert/${from}/to/${to}`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              /*  "x-api-key": API_KEY, */
            },
          }
        );
        if (res.status !== 200) {
          throw new Error(
            `Error converting from ${from} to ${to}: ${
              res.statusText
            }\n${JSON.stringify(res.data)}`
          );
        }
        const newPath = path.join(
          __dirname,
          `./output/converted${from}to${to}.${to}`
        );
        fs.writeFileSync(newPath, res.data, {
          encoding: "binary",
        });
        console.log(`Converted ${from} to ${to}\nFilepath: ${newPath}`);
      });
    });
  });
});
