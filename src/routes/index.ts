// src/routes/index.ts
// Central route registry for the Game E-commerce Site

import { Hono } from "hono";
import type { Env } from "../types";
import { ensureSchema } from "../lib/schema";
import { loadUserSession } from "../lib/auth";

// Import route modules
import { publicRouter } from "./web/public";
import { authRouter } from "./auth/auth";
import { adminRouter } from "./admin/admin";
import { setupRouter } from "./web/setup";
import { mediaRouter } from "./web/media";

// Create main router
export const createAppRouter = () => {
  const app = new Hono<{ Bindings: Env; Variables: { user?: any } }>();

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

  // Public routes (home page, etc.)
  app.route("/", publicRouter);

  // Static/media routes
  app.route("/media", mediaRouter);

  // Setup routes (only before first admin exists)
  app.route("/setup", setupRouter);

  // Authentication routes
  app.route("/auth", authRouter);

  // Admin routes (all protected)
  app.route("/admin", adminRouter);

  return app;
};

export default createAppRouter;
