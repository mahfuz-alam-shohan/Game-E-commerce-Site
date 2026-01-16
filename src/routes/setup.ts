// src/routes/setup.ts
import { Hono } from "hono";
import type { Env } from "../types";
import { layout } from "../lib/html";
import { hasAnyAdmin, saveSiteSettings, createFirstAdmin } from "../services/setupService";

export const setupRouter = new Hono<{ Bindings: Env }>();

// Step 1 – Site config (GET)
setupRouter.get("/site", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (adminExists) return c.redirect("/admin");

  const body = `
    <h2>Step 1 of 2 – Site Configuration</h2>
    <p class="muted">Set basic site details. You can change these later.</p>
    <form method="POST" action="/setup/site">
      <div class="field">
        <label for="site_name">Site name</label>
        <input id="site_name" name="site_name" required placeholder="e.g. Elite Game Store" />
      </div>
      <div class="field">
        <label for="site_motto">Site motto <small>(optional)</small></label>
        <input id="site_motto" name="site_motto" placeholder="e.g. Optimizers, skins & passes." />
      </div>
      <div class="field">
        <label for="site_logo_url">Logo URL <small>(temporary – later we plug logo maker & upload)</small></label>
        <input id="site_logo_url" name="site_logo_url" placeholder="https://..." />
      </div>
      <button type="submit" class="btn">Continue to Admin Creation</button>
    </form>
  `;

  return c.html(layout("Setup – Site", body));
});

// Step 1 – Site config (POST)
setupRouter.post("/site", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (adminExists) return c.redirect("/admin");

  const formData = await c.req.formData();
  const siteName = (formData.get("site_name") || "").toString().trim();
  const siteMotto = (formData.get("site_motto") || "").toString().trim();
  const siteLogoUrl = (formData.get("site_logo_url") || "").toString().trim();

  if (!siteName) {
    return c.text("Site name is required", 400);
  }

  await saveSiteSettings(c.env, {
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

  const body = `
    <h2>Step 2 of 2 – Create First Admin</h2>
    <p class="muted">This account will have full control over the site.</p>
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
        <label for="avatar_url">Profile picture URL <small>(optional)</small></label>
        <input id="avatar_url" name="avatar_url" placeholder="https://..." />
      </div>
      <button type="submit" class="btn">Finish Setup</button>
    </form>
  `;

  return c.html(layout("Setup – Admin", body));
});

// Step 2 – Admin creation (POST)
setupRouter.post("/admin", async c => {
  const adminExists = await hasAnyAdmin(c.env);
  if (adminExists) return c.redirect("/admin");

  const formData = await c.req.formData();
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().toLowerCase().trim();
  const password = (formData.get("password") || "").toString();
  const avatarUrl = (formData.get("avatar_url") || "").toString().trim();

  if (!name || !email || !password) {
    return c.text("Missing required fields", 400);
  }

  try {
    await createFirstAdmin(c.env, { name, email, password, avatarUrl });
  } catch (err) {
    return c.text("Failed to create admin (maybe email already used).", 400);
  }

  return c.redirect("/admin");
});
