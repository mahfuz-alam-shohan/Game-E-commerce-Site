// src/app.ts
import { Hono } from "hono";
import type { Env } from "./types";
import { publicRouter } from "./routes/public";
import { setupRouter } from "./routes/setup";
import { adminRouter } from "./routes/admin";
import { ensureSchema } from "./lib/schema";

export const app = new Hono<{ Bindings: Env }>();

// Global middleware: ensure DB schema exists
app.use("*", async (c, next) => {
  await ensureSchema(c.env);
  return next();
});

// Public routes
app.route("/", publicRouter);

// Setup routes
app.route("/setup", setupRouter);

// Admin routes
app.route("/admin", adminRouter);

export default app;
