// src/services/setupService.ts
import type { Env } from "../types";
import { getDb } from "../lib/db";
import { hashPassword } from "../lib/security";

export interface SiteSettings {
  siteName: string;
  siteMotto: string;
  siteLogoUrl: string;
  themeMode: "dark" | "light";
  themePrimary: string;
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

  const themeModeRaw = map.get("theme_mode") || "dark";
  const themeMode: "dark" | "light" =
    themeModeRaw === "light" ? "light" : "dark";

  const themePrimary = map.get("theme_primary") || "#22c55e";

  return {
    siteName: map.get("site_name") || "GameStore",
    siteMotto: map.get("site_motto") || "",
    siteLogoUrl: map.get("site_logo_url") || "",
    themeMode,
    themePrimary
  };
}

export async function hasAnyAdmin(env: Env): Promise<boolean> {
  const db = getDb(env);
  const row = await db
    .prepare("SELECT 1 FROM users WHERE role IN ('admin','super_admin') LIMIT 1")
    .first();
  return !!row;
}

export async function saveSiteSettings(env: Env, data: {
  siteName: string;
  siteMotto?: string;
  siteLogoUrl?: string;
}): Promise<void> {
  const db = getDb(env);

  const stmts = [
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_name", data.siteName),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_motto", data.siteMotto ?? ""),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_url", data.siteLogoUrl ?? "")
  ];

  await db.batch(stmts);
}

export async function updateThemeSettings(env: Env, data: {
  themeMode: "dark" | "light";
  themePrimary: string;
}): Promise<void> {
  const db = getDb(env);
  const mode: "dark" | "light" =
    data.themeMode === "light" ? "light" : "dark";
  const primary = data.themePrimary || "#22c55e";

  const stmts = [
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_mode", mode),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("theme_primary", primary)
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
