import { createApp } from "./app.js";
import { initializePersistence } from "./bootstrap.js";
import { env } from "./config/env.js";

const app = createApp({ serveClient: env.nodeEnv === "production" });

async function start() {
  await initializePersistence();

  app.listen(env.port, () => {
    console.log(`Royalties Buffet ${env.nodeEnv === "production" ? "app" : "API"} running on port ${env.port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
