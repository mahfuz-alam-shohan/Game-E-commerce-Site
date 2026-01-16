// src/app.ts
import { Hono } from "hono";
import type { Env } from "./types";
import { publicRouter } from "./routes/public";
import { setupRouter } from "./routes/setup";
import { adminDashboardRouter } from "./routes/adminDashboard";
import { ensureSchema } from "./lib/schema";

export const app = new Hono<{ Bindings: Env }>();

app.use("*", async (c, next) => {
  try {
    await ensureSchema(c.env);
  } catch (err) {
    // temporary debug response; later we can log instead
    return c.text("DB init error: " + (err as Error).message, 500);
  }
  return next();
});

app.route("/", publicRouter);
app.route("/setup", setupRouter);
app.route("/admin", adminDashboardRouter);

export default app;
