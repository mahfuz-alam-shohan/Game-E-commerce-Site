// src/services/categoryService.ts
import type { Env } from "../types";
import { getDb } from "../lib/db";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: number; // 1 or 0
  created_at: string;
}

export async function listCategories(env: Env): Promise<Category[]> {
  const db = getDb(env);
  const res = await db
    .prepare(
      `SELECT id, name, slug, description, sort_order, is_active, created_at
       FROM categories
       ORDER BY sort_order ASC, name ASC`
    )
    .all();

  return (res.results || []) as Category[];
}

export async function createCategory(env: Env, data: {
  name: string;
  slug: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}): Promise<void> {
  const db = getDb(env);
  const sortOrder = data.sortOrder ?? 0;
  const isActive = data.isActive ?? true;

  await db
    .prepare(
      `INSERT INTO categories (name, slug, description, sort_order, is_active)
       VALUES (?1, ?2, ?3, ?4, ?5)`
    )
    .bind(
      data.name,
      data.slug,
      data.description ?? null,
      sortOrder,
      isActive ? 1 : 0
    )
    .run();
}
