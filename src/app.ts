// src/app.ts
import { Hono } from "hono";
import type { Env } from "./types";
import { publicRouter } from "./routes/public";
import { setupRouter } from "./routes/setup";
import { adminDashboardRouter } from "./routes/adminDashboard";
import { authRouter } from "./routes/auth";
import { ensureSchema } from "./lib/schema";

export const app = new Hono<{ Bindings: Env }>();

// Ensure DB schema exists before handling any request
app.use("*", async (c, next) => {
  try {
    await ensureSchema(c.env);
  } catch (err) {
    return c.text("DB init error: " + (err as Error).message, 500);
  }
  return next();
});

// Public routes
app.route("/", publicRouter);

// Setup routes (only before first admin exists)
app.route("/setup", setupRouter);

// Auth routes
app.route("/auth", authRouter);

// Admin dashboard routes (guarded)
app.route("/admin", adminDashboardRouter);

export default app;
