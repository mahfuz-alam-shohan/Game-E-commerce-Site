// src/routes/public.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { layout } from "../lib/html";
import { hasAnyAdmin } from "../services/setupService";

export const publicRouter = new Hono<{ Bindings: Env }>();

publicRouter.get("/", async c => {
  const adminExists = await hasAnyAdmin(c.env);

  const body = `
    <h1>Welcome to GameStore</h1>
    <p class="muted">Public landing page placeholder. This will be your marketing page later.</p>
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;">
      ${
        adminExists
          ? `<a href="/admin" class="btn">Go to Admin Dashboard</a>`
          : `<a href="/setup/site" class="btn">Start Initial Setup</a>`
      }
    </div>
  `;

  return c.html(layout("GameStore – Landing", body));
});
