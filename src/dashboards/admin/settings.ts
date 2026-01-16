// src/dashboards/admin/settings.ts
import type { SiteSettings } from "../../services/setupService";

export function adminSettingsView(settings: SiteSettings) {
  const darkSelected = settings.themeMode === "dark" ? "selected" : "";
  const lightSelected = settings.themeMode === "light" ? "selected" : "";

  const mode = settings.siteLogoMode;
  const modeNone = mode === "none" ? "checked" : "";
  const modeText = mode === "text" ? "checked" : "";
  const modeUrl = mode === "url" ? "checked" : "";
  const modeR2 = mode === "r2" ? "checked" : "";

  const stylePlain = settings.siteLogoTextStyle === "plain" ? "checked" : "";
  const styleSticker = settings.siteLogoTextStyle === "sticker" ? "checked" : "";
  const styleOutline = settings.siteLogoTextStyle === "outline" ? "checked" : "";
  const styleSoft = settings.siteLogoTextStyle === "soft" ? "checked" : "";

  const currentLogoSource =
    settings.siteLogoMode === "r2"
      ? "Using R2 image logo"
      : settings.siteLogoMode === "url" && settings.siteLogoUrl
      ? "Using URL image logo"
      : settings.siteLogoMode === "text"
      ? "Using styled text logo"
      : "No logo in use (plain title)";

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

            <h3 class="card-title" style="margin-top:18px;font-size:14px;">Logo mode</h3>
            <p class="card-subtitle">
              Choose how the logo is rendered in the header. Text mode turns the site name into a “sticker” style logo.
            </p>

            <div class="field">
              <label>Source</label>
              <div class="stack-sm" style="margin-top:4px;">
                <label style="font-size:13px;">
                  <input type="radio" name="logo_mode" value="none" ${modeNone} />
                  <span style="margin-left:4px;">No logo – plain site name</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_mode" value="text" ${modeText} />
                  <span style="margin-left:4px;">Text logo (styled site name)</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_mode" value="url" ${modeUrl} />
                  <span style="margin-left:4px;">Image from URL</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_mode" value="r2" ${modeR2} />
                  <span style="margin-left:4px;">Image from R2 upload</span>
                </label>
              </div>
            </div>

            <div class="field">
              <label for="site_logo_url">
                Logo image URL
                <small>(used when “Image from URL” is selected)</small>
              </label>
              <input id="site_logo_url" name="site_logo_url" value="${settings.siteLogoUrl}" />
            </div>

            <div class="field">
              <label>Text logo style</label>
              <div class="stack-sm" style="margin-top:4px;">
                <label style="font-size:13px;">
                  <input type="radio" name="logo_text_style" value="plain" ${stylePlain} />
                  <span style="margin-left:4px;">Plain – bold uppercase text</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_text_style" value="sticker" ${styleSticker} />
                  <span style="margin-left:4px;">Sticker – solid badge, like a label</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_text_style" value="outline" ${styleOutline} />
                  <span style="margin-left:4px;">Outline – bordered text sticker</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_text_style" value="soft" ${styleSoft} />
                  <span style="margin-left:4px;">Soft gradient – pill shaped gradient logo</span>
                </label>
              </div>
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

        <section class="card">
          <h2 class="card-title">Logo image upload (R2)</h2>
          <p class="card-subtitle">
            Upload a logo file to R2 storage. On success, the logo mode will switch to “Image from R2”.<br/>
            ${currentLogoSource}
          </p>
          <form method="POST" action="/admin/logo/upload" enctype="multipart/form-data">
            <div class="field">
              <label for="logo_file">
                Logo file
                <small>(PNG/JPEG/SVG, up to ~512 KB)</small>
              </label>
              <input id="logo_file" name="logo_file" type="file" />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn">Upload logo to R2</button>
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
