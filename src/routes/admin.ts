// src/routes/admin.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { layout } from "../lib/html";
import { hasAnyAdmin } from "../services/setupService";

export const adminRouter = new Hono<{ Bindings: Env }>();

adminRouter.get("/", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (!adminExists) return c.redirect("/setup/site");

  // TODO: add real auth & sessions later
  const body = `
    <h2>Admin Dashboard</h2>
    <p class="muted">Setup complete. This is a minimal placeholder.</p>
    <ul>
      <li>Later: Site settings management</li>
      <li>Later: Categories & products</li>
      <li>Later: Page builder</li>
      <li>Later: Users & roles</li>
    </ul>
  `;

  return c.html(layout("Admin Dashboard", body));
});
