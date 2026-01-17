// src/routes/setup.ts
import { Hono } from "hono";
import type { Env } from "../../types";
import { layout } from "../../lib/html";
import {
  hasAnyAdmin,
  saveInitialSiteSettings,
  createFirstAdmin,
  getSiteSettings
} from "../../services/setupService";

export const setupRouter = new Hono<{ Bindings: Env }>();

// Step 1 – Site config (GET)
setupRouter.get("/site", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (adminExists) return c.redirect("/admin");

  const settings = await getSiteSettings(c.env);

  const body = `
    <div class="page-narrow">
      <h1 class="page-title">Initial setup</h1>
      <p class="page-subtitle">Step 1 of 2 – basic site configuration.</p>

      <div class="card">
        <h2 class="card-title">Site details</h2>
        <p class="card-subtitle">
          These values control how your brand appears across the dashboard and public pages.
        </p>
        <form method="POST" action="/setup/site">
          <div class="field">
            <label for="site_name">Site name</label>
            <input id="site_name" name="site_name" required placeholder="e.g. NutterTools GameStore" />
          </div>
          <div class="field">
            <label for="site_motto">
              Site motto
              <small>(optional)</small>
            </label>
            <input id="site_motto" name="site_motto" placeholder="e.g. Optimizers, skins & elite passes." />
          </div>
          <div class="field">
            <label for="site_logo_url">
              Logo URL
              <small>(temporary – later we will switch to logo maker & upload)</small>
            </label>
            <input id="site_logo_url" name="site_logo_url" placeholder="https://example.com/logo.png" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn">Continue to admin creation</button>
          </div>
        </form>
      </div>
    </div>
  `;

  return c.html(
    layout("Setup – Site", body, {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary,
      logoMode: settings.siteLogoMode,
      logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
      logoTextStyle: settings.siteLogoTextStyle
    })
  );
});

// Step 1 – Site config (POST)
setupRouter.post("/site", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (adminExists) return c.redirect("/admin");

  const settings = await getSiteSettings(c.env);
  const formData = await c.req.formData();
  const siteName = (formData.get("site_name") || "").toString().trim();
  const siteMotto = (formData.get("site_motto") || "").toString().trim();
  const siteLogoUrl = (formData.get("site_logo_url") || "").toString().trim();

  if (!siteName) {
    const body = `
      <div class="page-narrow">
        <h1 class="page-title">Initial setup</h1>
        <p class="page-subtitle">Step 1 of 2 – basic site configuration.</p>
        <div class="card">
          <p class="card-subtitle" style="color:#f97373;">Site name is required.</p>
          <a href="/setup/site" class="btn-secondary btn">Back to form</a>
        </div>
      </div>
    `;
    return c.html(
      layout("Setup – Site", body, {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary,
        logoMode: settings.siteLogoMode,
        logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
        logoTextStyle: settings.siteLogoTextStyle
      }),
      400
    );
  }

  await saveInitialSiteSettings(c.env, {
    siteName,
    siteMotto,
    siteLogoUrl
  });

  return c.redirect("/setup/admin");
});

// Step 2 – Admin creation (GET)
setupRouter.get("/admin", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (adminExists) return c.redirect("/admin");

  const settings = await getSiteSettings(c.env);

  const body = `
    <div class="page-narrow">
      <h1 class="page-title">Initial setup</h1>
      <p class="page-subtitle">Step 2 of 2 – create the first admin account.</p>

      <div class="card">
        <h2 class="card-title">Admin profile</h2>
        <p class="card-subtitle">
          This account will control all site configuration and modules. You can add more users later.
        </p>
        <form method="POST" action="/setup/admin">
          <div class="field">
            <label for="name">Admin name</label>
            <input id="name" name="name" required placeholder="Your name" />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" minlength="8" required />
          </div>
          <div class="field">
            <label for="avatar_url">
              Profile picture URL
              <small>(optional)</small>
            </label>
            <input id="avatar_url" name="avatar_url" placeholder="https://example.com/avatar.png" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn">Finish setup</button>
          </div>
        </form>
      </div>
    </div>
  `;

  return c.html(
    layout("Setup – Admin", body, {
      siteName: settings.siteName,
      themeMode: settings.themeMode,
      themePrimary: settings.themePrimary,
      logoMode: settings.siteLogoMode,
      logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
      logoTextStyle: settings.siteLogoTextStyle
    })
  );
});

// Step 2 – Admin creation (POST)
setupRouter.post("/admin", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (adminExists) return c.redirect("/admin");

  const settings = await getSiteSettings(c.env);
  const formData = await c.req.formData();
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().toLowerCase().trim();
  const password = (formData.get("password") || "").toString();
  const avatarUrl = (formData.get("avatar_url") || "").toString().trim();

  if (!name || !email || !password) {
    const body = `
      <div class="page-narrow">
        <h1 class="page-title">Initial setup</h1>
        <p class="page-subtitle">Step 2 of 2 – create the first admin account.</p>
        <div class="card">
          <p class="card-subtitle" style="color:#f97373;">All fields except avatar are required.</p>
          <a href="/setup/admin" class="btn-secondary btn">Back to form</a>
        </div>
      </div>
    `;
    return c.html(
      layout("Setup – Admin", body, {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary,
        logoMode: settings.siteLogoMode,
        logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
        logoTextStyle: settings.siteLogoTextStyle
      }),
      400
    );
  }

  try {
    await createFirstAdmin(c.env, { name, email, password, avatarUrl });
  } catch {
    const body = `
      <div class="page-narrow">
        <h1 class="page-title">Initial setup</h1>
        <p class="page-subtitle">Step 2 of 2 – create the first admin account.</p>
        <div class="card">
          <p class="card-subtitle" style="color:#f97373;">
            Failed to create admin. The email may already be in use.
          </p>
          <a href="/setup/admin" class="btn-secondary btn">Back to form</a>
        </div>
      </div>
    `;
    return c.html(
      layout("Setup – Admin", body, {
        siteName: settings.siteName,
        themeMode: settings.themeMode,
        themePrimary: settings.themePrimary,
        logoMode: settings.siteLogoMode,
        logoUrl: settings.siteLogoMode === "url" ? settings.siteLogoUrl : undefined,
        logoTextStyle: settings.siteLogoTextStyle
      }),
      400
    );
  }

  return c.redirect("/admin");
});
