// src/routes/public.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { layout } from "../lib/html";
import { hasAnyAdmin } from "../services/setupService";

export const publicRouter = new Hono<{ Bindings: Env }>();

publicRouter.get("/", async c => {
  const adminExists = await hasAnyAdmin(c.env);

  const cta = adminExists
    ? `<a href="/admin" class="btn">Open admin dashboard</a>`
    : `<a href="/setup/site" class="btn">Start initial setup</a>`;

  const body = `
    <div class="page">
      <div class="stack-md">
        <section>
          <h1 class="page-title">NutterTools GameStore</h1>
          <p class="page-subtitle">
            Future home of your gaming optimizers, skins, passes and more.
          </p>
          <div class="form-actions">
            ${cta}
            <span class="muted">Public storefront will be designed after setup is complete.</span>
          </div>
        </section>
      </div>
    </div>
  `;

  return c.html(layout("GameStore – Landing", body));
});
