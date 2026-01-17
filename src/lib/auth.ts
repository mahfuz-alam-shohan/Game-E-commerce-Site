// src/lib/auth.ts
import type { Env } from "../types";
import type { Context, Next } from "hono";
import { getUserBySession, deleteSession } from "../services/userService";

const SESSION_COOKIE = "nt_session";

function parseCookies(cookieHeader: string | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [rawKey, rawVal] = part.split("=");
    if (!rawKey || !rawVal) continue;
    const key = rawKey.trim();
    const value = decodeURIComponent(rawVal.trim());
    result[key] = value;
  }
  return result;
}

export function setSessionCookie(c: Context<{ Bindings: Env }>, sessionId: string) {
  // 7 days
  const maxAge = 7 * 24 * 60 * 60;
  c.header(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(
      sessionId
    )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`
  );
}

export function clearSessionCookie(c: Context<{ Bindings: Env }>) {
  c.header(
    "Set-Cookie",
    `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
  );
}

/**
 * Middleware to optionally load user session if present.
 * Doesn't require login - just loads user if session exists.
 */
export async function loadUserSession(
  c: Context<{ Bindings: Env; Variables: { user?: any } }>,
  next: Next
) {
  const cookieHeader = c.req.header("Cookie") || c.req.header("cookie") || null;
  const cookies = parseCookies(cookieHeader);
  const sessionId = cookies[SESSION_COOKIE];

  if (sessionId) {
    const user = await getUserBySession(c.env, sessionId);
    if (user) {
      // Valid session - attach user to context
      c.set("user", user);
    } else {
      // Invalid/expired session - clean it up silently
      await deleteSession(c.env, sessionId);
      clearSessionCookie(c);
    }
  }

  return next();
}

export async function requireAdmin(
  c: Context<{ Bindings: Env; Variables: { user?: any } }>,
  next: Next
) {
  const user = c.get("user");

  if (!user || !["admin", "super_admin"].includes(user.role)) {
    return c.redirect("/auth/login");
  }

  return next();
}
