// src/app.ts
import { Hono } from "hono";
import type { Env } from "./types";
import { publicRouter } from "./routes/public";
import { setupRouter } from "./routes/setup";
import { adminDashboardRouter } from "./routes/adminDashboard";
import { adminCategoriesRouter } from "./routes/adminCategories";
import { authRouter } from "./routes/auth";
import { mediaRouter } from "./routes/media";
import { ensureSchema } from "./lib/schema";
import { loadUserSession } from "./lib/auth";

export const app = new Hono<{ Bindings: Env; Variables: { user?: any } }>();

// Ensure DB schema exists before handling any request
app.use("*", async (c, next) => {
  try {
    await ensureSchema(c.env);
  } catch (err) {
    return c.text("DB init error: " + (err as Error).message, 500);
  }
  return next();
});

// Load user session on all routes (optional - doesn't require login)
app.use("*", loadUserSession);

// Public routes
app.route("/", publicRouter);

// Static/media routes
app.route("/media", mediaRouter);

// Setup routes (only before first admin exists)
app.route("/setup", setupRouter);

// Auth routes
app.route("/auth", authRouter);

// Admin dashboard routes (guarded)
app.route("/admin", adminDashboardRouter);

// Admin categories routes (guarded, /admin/categories/*)
app.route("/admin/categories", adminCategoriesRouter);

export default app;
