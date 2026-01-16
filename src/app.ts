// src/app.ts
import { Hono } from "hono";
import type { Env } from "./types";
import { publicRouter } from "./routes/public";
import { setupRouter } from "./routes/setup";
import { adminRouter } from "./routes/admin";
import { adminDashboardRouter } from "./routes/adminDashboard";
export const app = new Hono<{ Bindings: Env }>();

// Public routes
app.route("/", publicRouter);

// Setup routes
app.route("/setup", setupRouter);

// Admin routes
app.route("/admin", adminRouter);


app.route("/admin", adminDashboardRouter);
export default app;
