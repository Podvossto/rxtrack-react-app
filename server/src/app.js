import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/env.js";
import { requireAuth } from "./middleware/auth.js";
import { notFound, errorHandler } from "./middleware/errors.js";
import authRoutes from "./routes/auth.js";
import resourceRoutes from "./routes/resources.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api/auth", authRoutes);
  app.use("/api", requireAuth, resourceRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
