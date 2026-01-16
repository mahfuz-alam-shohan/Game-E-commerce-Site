// src/routes/adminDashboard.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { renderDashboardShell } from "../dashboards/layouts/shell";
import { adminMenu } from "../dashboards/admin/menu";
import { adminHomeView } from "../dashboards/admin/home";
import { adminSettingsView, adminSettingsErrorView } from "../dashboards/admin/settings";
import { requireAdmin } from "../lib/auth";
import {
  getSiteSettings,
  updateBrandSettings,
  updateThemeSettings
} from "../services/setupService";

export const adminDashboardRouter = new Hono<{
  Bindings: Env;
  Variables: { user?: any };
}>();

// Require admin for all /admin routes
adminDashboardRouter.use("*", requireAdmin);

// Dashboard home
adminDashboardRouter.get("/", async c => {
  const settings = await getSiteSettings(c.env);

  const html = renderDashboardShell({
    userRole: "admin",
    title: "Admin dashboard",
    menu: adminMenu,
    content: adminHomeView(),
    layoutOptions: {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary,
      logoMode: settings.siteLogoMode,
      logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
      logoTextStyle: settings.siteLogoTextStyle
    }
  });

  return c.html(html);
});

// Site + theme settings (GET)
adminDashboardRouter.get("/settings", async c => {
  const settings = await getSiteSettings(c.env);

  const html = renderDashboardShell({
    userRole: "admin",
    title: "Site & theme settings",
    menu: adminMenu,
    content: adminSettingsView(settings),
    layoutOptions: {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary,
      logoMode: settings.siteLogoMode,
      logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
      logoTextStyle: settings.siteLogoTextStyle
    }
  });

  return c.html(html);
});

// Site + theme settings (POST)
adminDashboardRouter.post("/settings", async c => {
  const settingsBefore = await getSiteSettings(c.env);
  const formData = await c.req.formData();

  const siteName = (formData.get("site_name") || "").toString().trim();
  const siteMotto = (formData.get("site_motto") || "").toString().trim();
  const siteLogoUrl = (formData.get("site_logo_url") || "").toString().trim();
  const themeModeRaw = (formData.get("theme_mode") || "").toString().trim();
  const themePrimary = (formData.get("theme_primary") || "").toString().trim();
  const logoModeRaw = (formData.get("logo_mode") || "").toString().trim();
  const logoTextStyleRaw = (formData.get("logo_text_style") || "").toString().trim();

  if (!siteName) {
    const html = renderDashboardShell({
      userRole: "admin",
      title: "Site & theme settings",
      menu: adminMenu,
      content: adminSettingsErrorView("Site name is required."),
      layoutOptions: {
        siteName: settingsBefore.siteName,
        themeMode: settingsBefore.themeMode,
        themePrimary: settingsBefore.themePrimary,
        logoMode: settingsBefore.siteLogoMode,
        logoUrl:
          settingsBefore.siteLogoMode === "url"
            ? settingsBefore.siteLogoUrl
            : undefined,
        logoTextStyle: settingsBefore.siteLogoTextStyle
      }
    });
    return c.html(html, 400);
  }

  try {
    await updateBrandSettings(c.env, {
      siteName,
      siteMotto,
      siteLogoUrl,
      logoMode:
        logoModeRaw === "text" || logoModeRaw === "url" || logoModeRaw === "r2"
          ? (logoModeRaw as any)
          : "none",
      logoTextStyle:
        logoTextStyleRaw === "sticker" ||
        logoTextStyleRaw === "outline" ||
        logoTextStyleRaw === "soft"
          ? (logoTextStyleRaw as any)
          : "plain"
    });

    const themeMode =
      themeModeRaw === "light" ? "light" : "dark";

    await updateThemeSettings(c.env, {
      themeMode,
      themePrimary: themePrimary || settingsBefore.themePrimary
    });
  } catch {
    const html = renderDashboardShell({
      userRole: "admin",
      title: "Site & theme settings",
      menu: adminMenu,
      content: adminSettingsErrorView("Failed to save settings."),
      layoutOptions: {
        siteName: settingsBefore.siteName,
        themeMode: settingsBefore.themeMode,
        themePrimary: settingsBefore.themePrimary,
        logoMode: settingsBefore.siteLogoMode,
        logoUrl:
          settingsBefore.siteLogoMode === "url"
            ? settingsBefore.siteLogoUrl
            : undefined,
        logoTextStyle: settingsBefore.siteLogoTextStyle
      }
    });
    return c.html(html, 500);
  }

  return c.redirect("/admin/settings");
});
