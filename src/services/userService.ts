// src/services/userService.ts
import type { Env } from "../types";
import { getDb } from "../lib/db";

export async function findUserByEmail(env: Env, email: string) {
  const db = getDb(env);
  const row = await db
    .prepare(
      "SELECT id, name, email, password_hash, avatar_url, role, created_at FROM users WHERE email = ?1 LIMIT 1"
    )
    .bind(email)
    .first();
  return row as
    | {
        id: number;
        name: string;
        email: string;
        password_hash: string;
        avatar_url: string | null;
        role: string;
        created_at: string;
      }
    | null;
}

function randomHex(bytes: number): string {
  const arr = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(arr)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSession(env: Env, userId: number): Promise<string> {
  const db = getDb(env);
  const sessionId = randomHex(32); // 64-char hex
  const now = Date.now();
  const expires = new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

  await db
    .prepare(
      "INSERT INTO sessions (id, user_id, expires_at) VALUES (?1, ?2, ?3)"
    )
    .bind(sessionId, userId, expires)
    .run();

  return sessionId;
}

export async function getUserBySession(env: Env, sessionId: string) {
  const db = getDb(env);
  const row = await db
    .prepare(
      `SELECT u.id, u.name, u.email, u.password_hash, u.avatar_url, u.role, u.created_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = ?1
         AND s.expires_at > CURRENT_TIMESTAMP
       LIMIT 1`
    )
    .bind(sessionId)
    .first();

  return row as
    | {
        id: number;
        name: string;
        email: string;
        password_hash: string;
        avatar_url: string | null;
        role: string;
        created_at: string;
      }
    | null;
}

export async function deleteSession(env: Env, sessionId: string): Promise<void> {
  const db = getDb(env);
  await db.prepare("DELETE FROM sessions WHERE id = ?1").bind(sessionId).run();
}
