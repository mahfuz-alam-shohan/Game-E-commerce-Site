// src/routes/public.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { layout } from "../lib/html";
import { hasAnyAdmin, getSiteSettings } from "../services/setupService";

export const publicRouter = new Hono<{ Bindings: Env }>();

publicRouter.get("/", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  const settings = await getSiteSettings(c.env);

  // Read user from context (set in app.ts middleware)
  const user: any = (c as any).get?.("user") || undefined;

  const cta = user
    ? `<a href="/admin" class="btn">Open admin dashboard</a>`
    : adminExists
      ? `<a href="/auth/login" class="btn">Admin login</a>`
      : `<a href="/setup/site" class="btn">Start initial setup</a>`;

  // Sidebar for public / landing
  const sidebarLinks = user
    ? `
      <a href="/">Home</a>
      <a href="/admin">Dashboard</a>
      <a href="#">Browse optimizers (coming soon)</a>
      <a href="#">Skins & passes (coming soon)</a>
    `
    : `
      <a href="/">Home</a>
      <a href="/auth/login">Admin login</a>
      <a href="#">Browse optimizers (coming soon)</a>
      <a href="#">Skins & passes (coming soon)</a>
    `;

  const sidebar = `
    <aside class="app-sidebar">
      <h3 class="app-sidebar-title">NAVIGATION</h3>
      <nav class="app-sidebar-nav">
        ${sidebarLinks}
      </nav>
    </aside>
  `;

  const main = `
    <div class="app-main">
      <div class="app-main-content">
        <div class="page">
          <h1 class="page-title">${settings.siteName}</h1>
          <p class="page-subtitle">
            Future home of your gaming optimizers, skins, passes and more.
          </p>
          <div class="form-actions">
            ${cta}
            <span class="muted">
              Public storefront will be designed after setup is complete.
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const shell = `
    <div class="app-shell">
      ${sidebar}
      ${main}
    </div>
  `;

  return c.html(
    layout("GameStore – Landing", shell, {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary,
      logoMode: settings.siteLogoMode,
      logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
      logoTextStyle: settings.siteLogoTextStyle,
      topbarBg: settings.topbarBg,
      topbarText: settings.topbarText,
      sidebarBg: settings.sidebarBg,
      sidebarText: settings.sidebarText,
      showSidebarToggle: true,
      userName: user?.name,
      userAvatarUrl: user?.avatar_url ?? null
    })
  );
});