// src/routes/adminCategories.ts
import { Hono } from "hono";
import type { Env } from "../../types";
import { requireAdmin } from "../../lib/auth";
import { getSiteSettings } from "../../services/setupService";
import { renderDashboardShell } from "../../dashboards/layouts/shell";
import { adminMenu } from "../../dashboards/admin/menu";
import {
  listCategories,
  createCategory
} from "../../services/categoryService";
import {
  adminCategoryListView,
  adminCategoryNewView
} from "../../dashboards/admin/categories";

export const adminCategoriesRouter = new Hono<{
  Bindings: Env;
  Variables: { user?: any };
}>();

adminCategoriesRouter.use("*", requireAdmin);

function generateSlug(raw: string): string {
  const lower = raw.toLowerCase().trim();
  const cleaned = lower
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "category";
}

// GET /admin/categories
adminCategoriesRouter.get("/", async c => {
  const settings = await getSiteSettings(c.env);
  const categories = await listCategories(c.env);
  const user = c.get("user") as any | undefined;

  const html = renderDashboardShell({
    userRole: "admin",
    title: "Categories",
    menu: adminMenu,
    content: adminCategoryListView(categories),
    layoutOptions: {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary,
      logoMode: settings.siteLogoMode,
      logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
      logoTextStyle: settings.siteLogoTextStyle,
      topbarBg: settings.topbarBg,
      topbarText: settings.topbarText,
      sidebarBg: settings.sidebarBg,
      sidebarText: settings.sidebarText
    },
    user
  });

  return c.html(html);
});

// GET /admin/categories/new
adminCategoriesRouter.get("/new", async c => {
  const settings = await getSiteSettings(c.env);
  const user = c.get("user") as any | undefined;

  const html = renderDashboardShell({
    userRole: "admin",
    title: "New category",
    menu: adminMenu,
    content: adminCategoryNewView(),
    layoutOptions: {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary,
      logoMode: settings.siteLogoMode,
      logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
      logoTextStyle: settings.siteLogoTextStyle,
      topbarBg: settings.topbarBg,
      topbarText: settings.topbarText,
      sidebarBg: settings.sidebarBg,
      sidebarText: settings.sidebarText
    },
    user
  });

  return c.html(html);
});

// POST /admin/categories/new
adminCategoriesRouter.post("/new", async c => {
  const settings = await getSiteSettings(c.env);
  const user = c.get("user") as any | undefined;
  const formData = await c.req.formData();

  const name = (formData.get("name") || "").toString().trim();
  let slug = (formData.get("slug") || "").toString().trim();
  const description = (formData.get("description") || "").toString().trim();
  const sortOrderRaw = (formData.get("sort_order") || "").toString().trim();
  const isActiveRaw = (formData.get("is_active") || "").toString().trim();

  if (!name) {
    const html = renderDashboardShell({
      userRole: "admin",
      title: "New category",
      menu: adminMenu,
      content: adminCategoryNewView("Name is required."),
      layoutOptions: {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary,
        logoMode: settings.siteLogoMode,
        logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
        logoTextStyle: settings.siteLogoTextStyle,
        topbarBg: settings.topbarBg,
        topbarText: settings.topbarText,
        sidebarBg: settings.sidebarBg,
        sidebarText: settings.sidebarText
      },
      user
    });
    return c.html(html, 400);
  }

  if (!slug) {
    slug = generateSlug(name);
  } else {
    slug = generateSlug(slug);
  }

  let sortOrder = 0;
  if (sortOrderRaw !== "") {
    const parsed = Number(sortOrderRaw);
    if (!Number.isNaN(parsed)) {
      sortOrder = parsed;
    }
  }

  const isActive = isActiveRaw === "0" ? false : true;

  try {
    await createCategory(c.env, {
      name,
      slug,
      description,
      sortOrder,
      isActive
    });
  } catch {
    const html = renderDashboardShell({
      userRole: "admin",
      title: "New category",
      menu: adminMenu,
      content: adminCategoryNewView(
        "Failed to create category. The slug might already be in use."
      ),
      layoutOptions: {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary,
        logoMode: settings.siteLogoMode,
        logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
        logoTextStyle: settings.siteLogoTextStyle,
        topbarBg: settings.topbarBg,
        topbarText: settings.topbarText,
        sidebarBg: settings.sidebarBg,
        sidebarText: settings.sidebarText
      },
      user
    });
    return c.html(html, 400);
  }

  return c.redirect("/admin/categories");
});