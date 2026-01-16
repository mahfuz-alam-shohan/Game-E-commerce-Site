// src/routes/adminDashboard.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { renderDashboardShell } from "../dashboards/layouts/shell";
import { adminMenu } from "../dashboards/admin/menu";
import { adminHomeView } from "../dashboards/admin/home";
import { hasAnyAdmin } from "../services/setupService";

export const adminDashboardRouter = new Hono<{ Bindings: Env }>();

adminDashboardRouter.get("/", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (!adminExists) return c.redirect("/setup/site");

  // TODO later: validate logged-in user & role
  const html = renderDashboardShell({
    userRole: "admin",
    title: "Admin Dashboard",
    menu: adminMenu,
    content: adminHomeView()
  });

  return c.html(html);
});
