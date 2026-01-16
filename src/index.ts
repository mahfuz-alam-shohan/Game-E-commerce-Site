import { Hono } from "hono";
import type { Env } from "./env";
import { layout } from "./html";
import { hashPassword } from "./security";

type AppEnv = { Bindings: Env };

const app = new Hono<AppEnv>();

async function hasAnyAdmin(c: any): Promise<boolean> {
  const result = await c.env.DB.prepare(
    "SELECT 1 FROM users WHERE role = 'admin' LIMIT 1"
  ).first();
  return !!result;
}

// -------- Public landing page --------
app.get("/", async c => {
  const adminExists = await hasAnyAdmin(c);

  const body = `
    <h1>Welcome to GameStore</h1>
    <p>Landing page placeholder. This will become your public marketing page.</p>
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;">
      ${
        adminExists
          ? `<a href="/admin" class="btn">Go to Admin Dashboard</a>`
          : `<a href="/setup/site" class="btn">Start Setup</a>`
      }
    </div>
  `;

  return c.html(layout("GameStore – Landing", body));
});

// -------- Setup step 1: Site config --------
app.get("/setup/site", async c => {
  const adminExists = await hasAnyAdmin(c);
  if (adminExists) return c.redirect("/admin");

  const body = `
    <h2>Step 1 of 2 – Site Configuration</h2>
    <p>Set basic site details. You can change these later from the admin panel.</p>
    <form method="POST" action="/setup/site">
      <div class="field">
        <label for="site_name">Site name</label>
        <input id="site_name" name="site_name" required placeholder="e.g. Elite Game Store" />
      </div>
      <div class="field">
        <label for="site_motto">Site motto <small>(optional)</small></label>
        <input id="site_motto" name="site_motto" placeholder="e.g. Boost your gameplay." />
      </div>
      <div class="field">
        <label for="site_logo_url">Logo URL <small>(temporary – later we plug in logo maker & upload)</small></label>
        <input id="site_logo_url" name="site_logo_url" placeholder="https://..." />
      </div>
      <button type="submit" class="btn">Continue to Admin Creation</button>
    </form>
  `;

  return c.html(layout("Setup – Site", body));
});

app.post("/setup/site", async c => {
  const adminExists = await hasAnyAdmin(c);
  if (adminExists) return c.redirect("/admin");

  const formData = await c.req.formData();
  const siteName = (formData.get("site_name") || "").toString().trim();
  const siteMotto = (formData.get("site_motto") || "").toString().trim();
  const siteLogoUrl = (formData.get("site_logo_url") || "").toString().trim();

  if (!siteName) {
    return c.text("Site name is required", 400);
  }

  const db = c.env.DB;
  const tx = db.batch([
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_name", siteName),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_motto", siteMotto),
    db.prepare(
      "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?1, ?2)"
    ).bind("site_logo_url", siteLogoUrl)
  ]);

  await tx;

  return c.redirect("/setup/admin");
});

// -------- Setup step 2: First admin --------
app.get("/setup/admin", async c => {
  const adminExists = await hasAnyAdmin(c);
  if (adminExists) return c.redirect("/admin");

  const body = `
    <h2>Step 2 of 2 – Create First Admin</h2>
    <p>This account will have full control over the site.</p>
    <form method="POST" action="/setup/admin">
      <div class="field">
        <label for="name">Admin name</label>
        <input id="name" name="name" required placeholder="Your name" />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" required type="email" placeholder="you@example.com" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" name="password" required type="password" minlength="8" />
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

app.post("/setup/admin", async c => {
  const adminExists = await hasAnyAdmin(c);
  if (adminExists) return c.redirect("/admin");

  const formData = await c.req.formData();
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().toLowerCase().trim();
  const password = (formData.get("password") || "").toString();
  const avatarUrl = (formData.get("avatar_url") || "").toString().trim();

  if (!name || !email || !password) {
    return c.text("Missing required fields", 400);
  }

  const passwordHash = await hashPassword(password);

  try {
    await c.env.DB.prepare(
      `INSERT INTO users (name, email, password_hash, avatar_url, role)
       VALUES (?1, ?2, ?3, ?4, 'admin')`
    )
      .bind(name, email, passwordHash, avatarUrl)
      .run();
  } catch (err: any) {
    // email unique violation etc.
    return c.text("Failed to create admin (maybe email already used).", 400);
  }

  return c.redirect("/admin");
});

// -------- Basic admin dashboard placeholder --------
app.get("/admin", async c => {
  const adminExists = await hasAnyAdmin(c);
  if (!adminExists) return c.redirect("/setup/site");

  // TODO: add real auth / sessions. For now, just a placeholder page.
  const body = `
    <h2>Admin Dashboard</h2>
    <p>Setup complete. This is a placeholder dashboard.</p>
    <ul>
      <li>Later: Site settings</li>
      <li>Later: Categories & products</li>
      <li>Later: Page builder</li>
    </ul>
  `;
  return c.html(layout("Admin Dashboard", body));
});

export default app;
