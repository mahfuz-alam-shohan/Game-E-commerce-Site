// src/routes/public.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { layout } from "../lib/html";
import { hasAnyAdmin, getSiteSettings } from "../services/setupService";
import { renderMobileSidebar, renderDesktopSidebar } from "../ui/components/sidebar";

export const publicRouter = new Hono<{ Bindings: Env; Variables: { user?: any } }>();

// Apply user session loading (already done globally, but explicit for clarity)

publicRouter.get("/", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  const settings = await getSiteSettings(c.env);

  // Read user from context (set by loadUserSession middleware in app.ts)
  const user = c.get("user") as any | undefined;

  const cta = user
    ? `<a href="/admin" class="btn">Open admin dashboard</a>`
    : adminExists
      ? `<a href="/auth/login" class="btn">Admin login</a>`
      : `<a href="/setup/site" class="btn">Start initial setup</a>`;

  // Use modular sidebar components (mobile and desktop)
  const mobileSidebar = renderMobileSidebar({
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
    user: user ? { name: user.name, email: user.email, avatar_url: user.avatar_url, role: user.role } : undefined,
    userRole: user?.role
  });

  const desktopSidebar = renderDesktopSidebar({
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
    user: user ? { name: user.name, email: user.email, avatar_url: user.avatar_url, role: user.role } : undefined,
    userRole: user?.role || "",
    menu: user
      ? [{ label: "Home", href: "/" }, { label: "Dashboard", href: "/admin" }, { label: "Browse optimizers", href: "#" }, { label: "Skins & passes", href: "#" }]
      : [{ label: "Home", href: "/" }, { label: "Browse optimizers", href: "#" }, { label: "Skins & passes", href: "#" }]
  });

  const sidebar = `${mobileSidebar}${desktopSidebar}`;

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
      userAvatarUrl: user?.avatar_url ?? null,
      user: user ? { name: user.name, email: user.email, avatar_url: user.avatar_url, role: user.role } : undefined
    })
  );
});