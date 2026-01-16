// src/routes/adminLogo.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { requireAdmin } from "../lib/auth";
import { getSiteSettings, setR2Logo } from "../services/setupService";
import { renderDashboardShell } from "../dashboards/layouts/shell";
import { adminMenu } from "../dashboards/admin/menu";
import { adminSettingsView, adminSettingsErrorView } from "../dashboards/admin/settings";

export const adminLogoRouter = new Hono<{
  Bindings: Env;
  Variables: { user?: any };
}>();

adminLogoRouter.use("*", requireAdmin);

adminLogoRouter.post("/upload", async c => {
  const settings = await getSiteSettings(c.env);
  const formData = await c.req.formData();
  const file = formData.get("logo_file");

  if (!(file instanceof File)) {
    const html = renderDashboardShell({
      userRole: "admin",
      title: "Site & theme settings",
      menu: adminMenu,
      content: adminSettingsErrorView("No file selected."),
      layoutOptions: {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary,
        logoMode: settings.siteLogoMode,
        logoUrl:
          settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
        logoTextStyle: settings.siteLogoTextStyle
      }
    });
    return c.html(html, 400);
  }

  const maxSize = 512 * 1024; // ~512 KB
  if (file.size > maxSize) {
    const html = renderDashboardShell({
      userRole: "admin",
      title: "Site & theme settings",
      menu: adminMenu,
      content: adminSettingsErrorView("File too large. Please use a logo under ~512 KB."),
      layoutOptions: {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary,
        logoMode: settings.siteLogoMode,
        logoUrl:
          settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
        logoTextStyle: settings.siteLogoTextStyle
      }
    });
    return c.html(html, 400);
  }

  const contentType = file.type || "image/png";
  const key = "site-logo";

  const arrayBuffer = await file.arrayBuffer();
  await c.env.BUCKET.put(key, arrayBuffer, {
    httpMetadata: { contentType }
  });

  await setR2Logo(c.env, key);

  // Reload settings after update
  const updated = await getSiteSettings(c.env);
  const html = renderDashboardShell({
    userRole: "admin",
    title: "Site & theme settings",
    menu: adminMenu,
    content: adminSettingsView(updated),
    layoutOptions: {
      siteName: updated.siteName,
      themeMode: updated.themeMode,
      themePrimary: updated.themePrimary,
      logoMode: updated.siteLogoMode,
      logoUrl: updated.siteLogoMode === "url" ? updated.siteLogoUrl : undefined,
      logoTextStyle: updated.siteLogoTextStyle
    }
  });

  return c.html(html);
});
