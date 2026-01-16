// src/services/setupService.ts
import type { Env } from "../types";
import { getDb } from "../lib/db";
import { hashPassword } from "../lib/security";

export type ThemeMode = "dark" | "light";
export type LogoMode = "none" | "text" | "url" | "r2";
export type LogoTextStyle = "plain" | "sticker" | "outline" | "soft";

export interface SiteSettings {
  siteName: string;
  siteMotto: string;
  siteLogoUrl: string;
  siteLogoMode: LogoMode;
  siteLogoR2Key: string;
  siteLogoTextStyle: LogoTextStyle;
  themeMode: ThemeMode;
  themePrimary: string;
  topbarBg: string;
  topbarText: string;
  sidebarBg: string;
  sidebarText: string;
}

function getString(map: Map<string, string>, key: string, fallback: string): string {
  const v = map.get(key);
  if (v == null) return fallback;
  return String(v);
}

export async function getSiteSettings(env: Env): Promise<SiteSettings> {
  const db = getDb(env);
  const res = await db.prepare("SELECT key, value FROM site_settings").all();
  const map = new Map<string, string>();

  if (res.results && Array.isArray(res.results)) {
    for (const row of res.results as any[]) {
      const key = row.key;
      const value = row.value;
      if (key != null) {
        map.set(String(key), value != null ? String(value) : "");
      }
    }
  }

  const themeModeRaw = getString(map, "theme_mode", "dark");
  const themeMode: ThemeMode = themeModeRaw === "light" ? "light" : "dark";

  const themePrimary = getString(map, "theme_primary", "#22c55e");

  const logoModeRaw = getString(map, "site_logo_mode", "none");
  const logoMode: LogoMode =
    logoModeRaw === "text" || logoModeRaw === "url" || logoModeRaw === "r2"
      ? logoModeRaw
      : "none";

  const logoTextStyleRaw = getString(map, "site_logo_text_style", "plain");
  const logoTextStyle: LogoTextStyle =
    logoTextStyleRaw === "sticker" ||
    logoTextStyleRaw === "outline" ||
    logoTextStyleRaw === "soft"
      ? logoTextStyleRaw
      : "plain";

  // Defaults for per-component colors follow theme mode
  const defaultTopbarBg = themeMode === "light" ? "#ffffff" : "#020617";
  const defaultTopbarText = themeMode === "light" ? "#020617" : "#e5e7eb";
  const defaultSidebarBg = themeMode === "light" ? "#f3f4f6" : "#020617";
  const defaultSidebarText = themeMode === "light" ? "#020617" : "#e5e7eb";

  const topbarBg = getString(map, "theme_topbar_bg", defaultTopbarBg);
  const topbarText = getString(map, "theme_topbar_text", defaultTopbarText);
  const sidebarBg = getString(map, "theme_sidebar_bg", defaultSidebarBg);
  const sidebarText = getString(map, "theme_sidebar_text", defaultSidebarText);

  return {
    siteName: getString(map, "site_name", "GameStore"),
    siteMotto: getString(map, "site_motto", ""),
    siteLogoUrl: getString(map, "site_logo_url", ""),
    siteLogoMode: logoMode,
    siteLogoR2Key: getString(map, "site_logo_r2_key", ""),
    siteLogoTextStyle: logoTextStyle,
    themeMode,
    themePrimary,
    topbarBg,
    topbarText,
    sidebarBg,
    sidebarText
  };
}

export async function hasAnyAdmin(env: Env): Promise<boolean> {
  const db = getDb(env);
  const row = await db
    .prepare("SELECT 1 FROM users WHERE role IN ('admin','super_admin') LIMIT 1")
    .first();
  return !!row;
}

// Used during initial setup
export async function saveInitialSiteSettings(env: Env, data: {
  siteName: string;
  siteMotto?: string;
  siteLogoUrl?: string;
}): Promise<void> {
  const db = getDb(env);
  const siteName = data.siteName;
  const motto = data.siteMotto ?? "";
  const logoUrl = data.siteLogoUrl ?? "";

  const logoMode: LogoMode = logoUrl ? "url" : "none";

  const stmts = [
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_name", siteName),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_motto", motto),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_url", logoUrl),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_mode", logoMode),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_text_style", "plain"),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_r2_key", "")
  ];

  await db.batch(stmts);
}

// Admin settings: branding + logo mode
export async function updateBrandSettings(env: Env, data: {
  siteName: string;
  siteMotto: string;
  siteLogoUrl: string;
  logoMode: LogoMode;
  logoTextStyle: LogoTextStyle;
}): Promise<void> {
  const db = getDb(env);

  const safeLogoMode: LogoMode =
    data.logoMode === "text" || data.logoMode === "url" || data.logoMode === "r2"
      ? data.logoMode
      : "none";

  const safeTextStyle: LogoTextStyle =
    data.logoTextStyle === "sticker" ||
    data.logoTextStyle === "outline" ||
    data.logoTextStyle === "soft"
      ? data.logoTextStyle
      : "plain";

  const stmts = [
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_name", data.siteName),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_motto", data.siteMotto),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_url", data.siteLogoUrl),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_mode", safeLogoMode),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_text_style", safeTextStyle)
  ];

  await db.batch(stmts);
}

// Theme settings with per-component colors
export async function updateThemeSettings(env: Env, data: {
  themeMode: ThemeMode;
  themePrimary: string;
  topbarBg: string;
  topbarText: string;
  sidebarBg: string;
  sidebarText: string;
}): Promise<void> {
  const db = getDb(env);
  const mode: ThemeMode = data.themeMode === "light" ? "light" : "dark";
  const primary = data.themePrimary || "#22c55e";

  const stmts = [
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_mode", mode),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_primary", primary),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_topbar_bg", data.topbarBg),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_topbar_text", data.topbarText),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_sidebar_bg", data.sidebarBg),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_sidebar_text", data.sidebarText)
  ];

  await db.batch(stmts);
}

// Called when an image logo is uploaded to R2
export async function setR2Logo(env: Env, key: string): Promise<void> {
  const db = getDb(env);
  const stmts = [
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_r2_key", key),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_mode", "r2")
  ];
  await db.batch(stmts);
}

export async function createFirstAdmin(env: Env, data: {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}): Promise<void> {
  const db = getDb(env);
  const passwordHash = await hashPassword(data.password);

  await db
    .prepare(
      `INSERT INTO users (name, email, password_hash, avatar_url, role)
       VALUES (?1, ?2, ?3, ?4, 'super_admin')`
    )
    .bind(data.name, data.email, passwordHash, data.avatarUrl ?? null)
    .run();
}
