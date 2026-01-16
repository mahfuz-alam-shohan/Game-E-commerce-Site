// src/services/setupService.ts
import type { Env } from "../types";
import { getDb } from "../lib/db";
import { hashPassword } from "../lib/security";

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
