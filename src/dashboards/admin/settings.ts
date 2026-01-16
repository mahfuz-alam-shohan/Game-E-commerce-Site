// src/dashboards/admin/settings.ts
import type { SiteSettings } from "../../services/setupService";

export function adminSettingsIndexView(settings: SiteSettings) {
  return `
    <div class="page">
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">
        Organised settings for your store. Choose a section to configure.
      </p>

      <div class="stack-md">
        <div>
          <div class="list-row">
            <div class="list-row-main">
              <div class="list-row-title">Site identity</div>
              <div class="list-row-subtitle">
                Name, logo, motto, and branding.
              </div>
            </div>
            <a href="/admin/settings/identity" class="btn-secondary btn">Open</a>
          </div>
          <div class="list-row">
            <div class="list-row-main">
              <div class="list-row-title">Site theme</div>
              <div class="list-row-subtitle">
                Dark/light mode and primary color.
              </div>
            </div>
            <a href="/admin/settings/theme" class="btn-secondary btn">Open</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function adminSettingsIdentityView(settings: SiteSettings, errorMessage?: string) {
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

  const errorBlock = errorMessage
    ? `<p class="card-subtitle" style="color:#f97373;margin-bottom:10px;">${errorMessage}</p>`
    : `<p class="card-subtitle">
         This controls how your brand appears in the header and public pages.
       </p>`;

  return `
    <div class="page">
      <h1 class="page-title">Site identity</h1>
      <p class="page-subtitle">
        Name, logo, motto and branding. Everything here is visible to users.
      </p>

      <div class="stack-md">
        <section>
          <h2 class="card-title">Basic details</h2>
          ${errorBlock}
          <form method="POST" action="/admin/settings/identity">
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

            <h3 class="card-title" style="margin-top:18px;font-size:14px;">Logo source</h3>
            <p class="card-subtitle">
              Choose how the logo is rendered in the header. Text mode turns the site name into an illustrated logo.
            </p>

            <div class="field">
              <label>Logo mode</label>
              <div class="stack-sm" style="margin-top:4px;">
                <label style="font-size:13px;">
                  <input type="radio" name="logo_mode" value="none" ${modeNone} />
                  <span style="margin-left:4px;">No logo – plain site name</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_mode" value="text" ${modeText} />
                  <span style="margin-left:4px;">Text logo – styled site name</span>
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
                <small>(used only when “Image from URL” is selected)</small>
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
                  <span style="margin-left:4px;">Sticker – solid badge</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_text_style" value="outline" ${styleOutline} />
                  <span style="margin-left:4px;">Outline – bordered sticker</span>
                </label>
                <label style="font-size:13px;">
                  <input type="radio" name="logo_text_style" value="soft" ${styleSoft} />
                  <span style="margin-left:4px;">Soft gradient – pill logo</span>
                </label>
              </div>
            </div>

            <div class="field">
              <label>Live logo preview</label>
              <div class="logo-preview-box">
                <div id="logo-preview-area">
                  <!-- JS will render preview here -->
                </div>
              </div>
              <small>
                This preview shows how the header logo will look with your current choices.
              </small>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn">Save identity</button>
              <a href="/admin/settings" class="btn-secondary btn">Back to settings</a>
            </div>
          </form>
        </section>

        <section>
          <h2 class="card-title">Logo file (R2)</h2>
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
              <button type="submit" class="btn">Upload to R2</button>
            </div>
          </form>
        </section>
      </div>

      <script>
        (function() {
          function renderPreview() {
            const nameInput = document.getElementById("site_name");
            const urlInput = document.getElementById("site_logo_url");
            const modeInputs = document.querySelectorAll("input[name='logo_mode']");
            const styleInputs = document.querySelectorAll("input[name='logo_text_style']");
            const preview = document.getElementById("logo-preview-area");
            if (!nameInput || !preview) return;

            const name = nameInput.value || "NutterTools";
            let mode = "none";
            modeInputs.forEach(function(r) {
              if (r instanceof HTMLInputElement && r.checked) mode = r.value;
            });

            let style = "plain";
            styleInputs.forEach(function(r) {
              if (r instanceof HTMLInputElement && r.checked) style = r.value;
            });

            const url = urlInput ? urlInput.value : "";
            let html = "";

            if (mode === "text") {
              let cls = "logo-text";
              if (style === "sticker") cls += " logo-sticker";
              else if (style === "outline") cls += " logo-outline";
              else if (style === "soft") cls += " logo-soft";
              html = '<span class="' + cls + '">' + name + "</span>";
            } else if (mode === "url" && url) {
              html =
                '<div class="brand-logo-wrap">' +
                '<img src="' + url + '" alt="' + name + '" class="brand-logo-img" />' +
                '<span class="brand-logo-text">' + name + "</span>" +
                "</div>";
            } else if (mode === "r2") {
              html =
                '<div class="brand-logo-wrap">' +
                '<img src="/media/logo" alt="' + name + '" class="brand-logo-img" />' +
                '<span class="brand-logo-text">' + name + "</span>" +
                "</div>";
            } else {
              html = '<div class="brand-title">' + name + "</div>";
            }

            preview.innerHTML = html;
          }

          document.addEventListener("input", function(e) {
            const t = e.target;
            if (!t) return;
            if (
              t.id === "site_name" ||
              t.id === "site_logo_url" ||
              (t instanceof HTMLInputElement && t.name === "logo_mode") ||
              (t instanceof HTMLInputElement && t.name === "logo_text_style")
            ) {
              renderPreview();
            }
          });

          document.addEventListener("DOMContentLoaded", renderPreview);
          window.addEventListener("load", renderPreview);
        })();
      </script>
    </div>
  `;
}

export function adminSettingsThemeView(settings: SiteSettings, errorMessage?: string) {
  const darkSelected = settings.themeMode === "dark" ? "selected" : "";
  const lightSelected = settings.themeMode === "light" ? "selected" : "";

  const errorBlock = errorMessage
    ? `<p class="card-subtitle" style="color:#f97373;margin-bottom:10px;">${errorMessage}</p>`
    : `<p class="card-subtitle">
         Base theme for the whole admin and storefront. Component-level styling can be added later.
       </p>`;

  return `
    <div class="page">
      <h1 class="page-title">Site theme</h1>
      <p class="page-subtitle">
        Dark/light mode and primary accent color.
      </p>

      <section>
        <h2 class="card-title">Theme mode & primary color</h2>
        ${errorBlock}
        <form method="POST" action="/admin/settings/theme">
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
              <small>(used for main buttons and accents)</small>
            </label>
            <input id="theme_primary" name="theme_primary" type="color" value="${settings.themePrimary}" />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn">Save theme</button>
            <a href="/admin/settings" class="btn-secondary btn">Back to settings</a>
          </div>
        </form>
      </section>
    </div>
  `;
}

export function adminSettingsErrorView(message: string) {
  return `
    <div class="page">
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">Something went wrong.</p>
      <div>
        <p class="card-subtitle" style="color:#f97373;">${message}</p>
        <a href="/admin/settings" class="btn-secondary btn">Back to settings</a>
      </div>
    </div>
  `;
}
