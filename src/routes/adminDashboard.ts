// src/routes/adminDashboard.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { renderDashboardShell } from "../dashboards/layouts/shell";
import { adminMenu } from "../dashboards/admin/menu";
import { adminHomeView } from "../dashboards/admin/home";
import { requireAdmin } from "../lib/auth";

export const adminDashboardRouter = new Hono<{ Bindings: Env; Variables: { user?: any } }>();

// Require admin for all /admin routes
adminDashboardRouter.use("*", requireAdmin);

adminDashboardRouter.get("/", async c => {
  const html = renderDashboardShell({
    userRole: "admin",
    title: "Admin dashboard",
    menu: adminMenu,
    content: adminHomeView()
  });

  return c.html(html);
});
