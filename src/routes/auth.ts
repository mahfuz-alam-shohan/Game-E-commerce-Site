// src/routes/auth.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { layout } from "../lib/html";
import { findUserByEmail, createSession, deleteSession } from "../services/userService";
import { verifyPassword } from "../lib/security";
import { setSessionCookie, clearSessionCookie } from "../lib/auth";
import { getSiteSettings } from "../services/setupService";

export const authRouter = new Hono<{ Bindings: Env }>();

authRouter.get("/login", async c => {
  const settings = await getSiteSettings(c.env);

  const body = `
    <div class="page-narrow">
      <h1 class="page-title">Sign in</h1>
      <p class="page-subtitle">
        Enter your admin credentials to access the dashboard.
      </p>

      <div class="card">
        <h2 class="card-title">Admin login</h2>
        <p class="card-subtitle">
          Only administrator accounts can sign in here.
        </p>
        <form method="POST" action="/auth/login">
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  `;

  return c.html(
    layout("Admin login", body, {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary
    })
  );
});

authRouter.post("/login", async c => {
  const settings = await getSiteSettings(c.env);
  const formData = await c.req.formData();
  const email = (formData.get("email") || "").toString().toLowerCase().trim();
  const password = (formData.get("password") || "").toString();

  if (!email || !password) {
    const body = `
      <div class="page-narrow">
        <h1 class="page-title">Sign in</h1>
        <p class="page-subtitle">
          Enter your admin credentials to access the dashboard.
        </p>
        <div class="card">
          <p class="card-subtitle" style="color:#f97373;">
            Email and password are required.
          </p>
          <a href="/auth/login" class="btn-secondary btn">Back to login</a>
        </div>
      </div>
    `;
    return c.html(
      layout("Admin login", body, {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary
      }),
      400
    );
  }

  const user = await findUserByEmail(c.env, email);

  if (!user) {
    const body = `
      <div class="page-narrow">
        <h1 class="page-title">Sign in</h1>
        <p class="page-subtitle">
          Enter your admin credentials to access the dashboard.
        </p>
        <div class="card">
          <p class="card-subtitle" style="color:#f97373;">
            Invalid email or password.
          </p>
          <a href="/auth/login" class="btn-secondary btn">Try again</a>
        </div>
      </div>
    `;
    return c.html(
      layout("Admin login", body, {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary
      }),
      401
    );
  }

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok || !["admin", "super_admin"].includes(user.role)) {
    const body = `
      <div class="page-narrow">
        <h1 class="page-title">Sign in</h1>
        <p class="page-subtitle">
          Enter your admin credentials to access the dashboard.
        </p>
        <div class="card">
          <p class="card-subtitle" style="color:#f97373;">
            Invalid email or password.
          </p>
          <a href="/auth/login" class="btn-secondary btn">Try again</a>
        </div>
      </div>
    `;
    return c.html(
      layout("Admin login", body, {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary
      }),
      401
    );
  }

  const sessionId = await createSession(c.env, user.id);
  setSessionCookie(c, sessionId);

  return c.redirect("/admin");
});

authRouter.get("/logout", async c => {
  const settings = await getSiteSettings(c.env);
  const cookieHeader = c.req.header("Cookie") || c.req.header("cookie") || null;
  let sessionId: string | undefined;
  if (cookieHeader) {
    const parts = cookieHeader.split(";");
    for (const p of parts) {
      const [rawKey, rawVal] = p.split("=");
      if (!rawKey || !rawVal) continue;
      const key = rawKey.trim();
      if (key === "nt_session") {
        sessionId = decodeURIComponent(rawVal.trim());
        break;
      }
    }
  }

  if (sessionId) {
    await deleteSession(c.env, sessionId);
  }
  clearSessionCookie(c);

  // Simple logout confirmation
  const body = `
    <div class="page-narrow">
      <h1 class="page-title">Signed out</h1>
      <p class="page-subtitle">
        You have been signed out of the admin dashboard.
      </p>
      <div class="card">
        <p class="card-subtitle">You can sign in again at any time.</p>
        <a href="/auth/login" class="btn">Go to login</a>
      </div>
    </div>
  `;

  return c.html(
    layout("Signed out", body, {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary
    })
  );
});
