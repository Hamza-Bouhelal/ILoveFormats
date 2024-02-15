import { createApp } from "./app";
import { getConfig } from "./utils/config";

const { PORT } = getConfig();

createApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Starting app in http://localhost:${PORT}`);
  });
});
