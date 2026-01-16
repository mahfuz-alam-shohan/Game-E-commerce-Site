// src/dashboards/admin/settings.ts
import type { SiteSettings } from "../../services/setupService";

export function adminSettingsView(settings: SiteSettings) {
  const darkSelected = settings.themeMode === "dark" ? "selected" : "";
  const lightSelected = settings.themeMode === "light" ? "selected" : "";

  return `
    <div class="page">
      <h1 class="page-title">Site & theme settings</h1>
      <p class="page-subtitle">
        Control branding and basic theme colors for NutterTools.
      </p>

      <div class="stack-md">
        <section class="card">
          <h2 class="card-title">Branding</h2>
          <p class="card-subtitle">
            These values are used across the admin dashboard and public storefront.
          </p>
          <form method="POST" action="/admin/settings">
            <div class="field">
              <label for="site_name">Site name</label>
              <input id="site_name" name="site_name" required value="${settings.siteName}" />
            </div>
            <div class="field">
              <label for="site_motto">
                Site motto
                <small>(optional)</small>
              </label>
              <input id="site_motto" name="site_motto" value="${settings.siteMotto}" />
            </div>
            <div class="field">
              <label for="site_logo_url">
                Logo URL
                <small>(used in frontend later – for now only stored)</small>
              </label>
              <input id="site_logo_url" name="site_logo_url" value="${settings.siteLogoUrl}" />
            </div>

            <h3 class="card-title" style="margin-top:18px;font-size:14px;">Theme</h3>
            <p class="card-subtitle">
              Pick a base mode and primary accent color. All dashboard pages will follow this.
            </p>

            <div class="field">
              <label for="theme_mode">Theme mode</label>
              <select id="theme_mode" name="theme_mode" style="padding:7px 9px;border-radius:6px;border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);">
                <option value="dark" ${darkSelected}>Dark</option>
                <option value="light" ${lightSelected}>Light</option>
              </select>
            </div>

            <div class="field">
              <label for="theme_primary">
                Primary accent color
                <small>(used for main buttons)</small>
              </label>
              <input id="theme_primary" name="theme_primary" type="color" value="${settings.themePrimary}" />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn">Save changes</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  `;
}

export function adminSettingsErrorView(message: string) {
  return `
    <div class="page">
      <h1 class="page-title">Site & theme settings</h1>
      <p class="page-subtitle">Something went wrong.</p>
      <div class="card">
        <p class="card-subtitle" style="color:#f97373;">${message}</p>
        <a href="/admin/settings" class="btn-secondary btn">Back to settings</a>
      </div>
    </div>
  `;
}
