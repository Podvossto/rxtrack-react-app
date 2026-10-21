import { config } from "./config/env.js";
import { createApp } from "./app.js";

createApp().listen(config.port, () => {
  console.log(`API listening on port ${config.port}`);
});
