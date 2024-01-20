import { createApp } from "./app";
import { getConfig } from "./utils/config";

const app = createApp();

const { PORT } = getConfig();

app.listen(PORT, () => {
  console.log(`Starting app in http://localhost:${PORT}`);
});
