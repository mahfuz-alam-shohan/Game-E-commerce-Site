// src/lib/html.ts
import type { LogoMode, LogoTextStyle, ThemeMode } from "../services/setupService";

export interface LayoutOptions {
  siteName?: string;
  themeMode?: ThemeMode;
  themePrimary?: string;
  logoMode?: LogoMode;
  logoUrl?: string;
  logoTextStyle?: LogoTextStyle;
}

function renderBrand(opts: LayoutOptions): string {
  const name = opts.siteName || "GameStore";
  const mode: LogoMode = opts.logoMode || "none";
  const textStyle: LogoTextStyle = opts.logoTextStyle || "plain";
  const url = opts.logoUrl || "";

  if (mode === "text") {
    const cls =
      textStyle === "sticker"
        ? "logo-text logo-sticker"
        : textStyle === "outline"
        ? "logo-text logo-outline"
        : textStyle === "soft"
        ? "logo-text logo-soft"
        : "logo-text";
    return `<span class="${cls}">${name}</span>`;
  }

  if (mode === "r2") {
    return `
      <div class="brand-logo-wrap">
        <img src="/media/logo" alt="${name}" class="brand-logo-img" />
        <span class="brand-logo-text">${name}</span>
      </div>
    `;
  }

  if (mode === "url" && url) {
    return `
      <div class="brand-logo-wrap">
        <img src="${url}" alt="${name}" class="brand-logo-img" />
        <span class="brand-logo-text">${name}</span>
      </div>
    `;
  }

  return `<div class="brand-title">${name}</div>`;
}

export function layout(title: string, body: string, opts?: LayoutOptions): string {
  const siteName = opts?.siteName || "GameStore";
  const mode: ThemeMode =
    opts?.themeMode === "light" ? "light" : "dark";
  const primary = opts?.themePrimary || "#22c55e";

  const bg = mode === "light" ? "#f9fafb" : "#020617";
  const text = mode === "light" ? "#020617" : "#e5e7eb";
  const border = mode === "light" ? "#e5e7eb" : "#111827";
  const cardBg = mode === "light" ? "#ffffff" : "#020617";
  const muted = mode === "light" ? "#6b7280" : "#9ca3af";

  const brandHtml = renderBrand({
    siteName,
    logoMode: opts?.logoMode,
    logoUrl: opts?.logoUrl,
    logoTextStyle: opts?.logoTextStyle
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root {
      color-scheme: ${mode === "light" ? "light" : "dark"};
      --color-bg: ${bg};
      --color-text: ${text};
      --color-border: ${border};
      --color-card-bg: ${cardBg};
      --color-muted: ${muted};
      --color-primary: ${primary};
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      width: 100%;
      padding: 10px 18px;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    header > div {
      font-weight: 600;
      font-size: 15px;
      display:flex;
      align-items:center;
      gap:8px;
    }
    header nav a {
      margin-left: 8px;
    }
    main {
      width: 100%;
      padding: 20px 16px 40px;
      flex: 1;
    }

    .brand-title {
      font-weight: 600;
      font-size: 15px;
    }
    .brand-logo-wrap {
      display:flex;
      align-items:center;
      gap:8px;
    }
    .brand-logo-img {
      width:28px;
      height:28px;
      border-radius:6px;
      object-fit:contain;
      border:1px solid var(--color-border);
      background:var(--color-card-bg);
    }
    .brand-logo-text {
      font-weight:600;
      font-size:14px;
    }

    .logo-text {
      font-weight:800;
      font-size:18px;
      letter-spacing:0.04em;
      text-transform:uppercase;
    }
    .logo-sticker {
      padding:4px 8px;
      border-radius:8px;
      background:var(--color-primary);
      color:#020617;
    }
    .logo-outline {
      padding:3px 7px;
      border-radius:8px;
      border:2px solid var(--color-primary);
      color:var(--color-text);
    }
    .logo-soft {
      padding:4px 9px;
      border-radius:999px;
      background:linear-gradient(135deg, var(--color-primary), rgba(59,130,246,0.6));
      color:#020617;
    }

    .btn {
      display: inline-block;
      padding: 9px 16px;
      border-radius: 999px;
      border: none;
      background: var(--color-primary);
      color: #020617;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
      white-space: nowrap;
    }
    .btn-secondary {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }

    .page {
      margin: 0 auto;
      max-width: 1040px;
      width: 100%;
    }
    .page-narrow {
      margin: 0 auto;
      max-width: 540px;
      width: 100%;
    }
    .page-title {
      font-size: 22px;
      font-weight: 600;
      margin: 0 0 4px 0;
    }
    .page-subtitle {
      margin: 0 0 20px 0;
      font-size: 13px;
      color: var(--color-muted);
    }

    .card {
      background: var(--color-card-bg);
      border-radius: 6px;
      border: 1px solid var(--color-border);
      padding: 18px 18px 20px;
      box-shadow: none; /* no shadow, flat look */
    }
    .card-title {
      margin: 0 0 6px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .card-subtitle {
      margin: 0 0 14px 0;
      font-size: 12px;
      color: var(--color-muted);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 4px;
      width: 100%;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }
    label {
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text);
    }
    input {
      padding: 7px 9px;
      border-radius: 6px;
      border: 1px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text);
      font-size: 14px;
      width: 100%;
    }
    input::placeholder {
      color: var(--color-muted);
    }
    small {
      font-size: 11px;
      color: var(--color-muted);
    }
    .muted {
      color: var(--color-muted);
      font-size: 13px;
    }
    .stack-sm {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .stack-md {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .form-actions {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .list-row {
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:10px 4px;
      border-bottom:1px solid var(--color-border);
    }
    .list-row-main {
      display:flex;
      flex-direction:column;
      gap:2px;
    }
    .list-row-title {
      font-size:14px;
      font-weight:500;
    }
    .list-row-subtitle {
      font-size:12px;
      color:var(--color-muted);
    }

    .app-shell {
      display: flex;
      min-height: calc(100vh - 56px);
      width: 100%;
    }
    .app-sidebar {
      width: 240px;
      padding: 14px 12px;
      border-right: 1px solid var(--color-border);
    }
    .app-sidebar-title {
      margin: 0 0 14px 0;
      font-size: 12px;
      letter-spacing: 0.08em;
      color: var(--color-muted);
    }
    .app-sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 14px;
    }
    .app-sidebar-nav a {
      color: var(--color-text);
      text-decoration: none;
      padding: 6px 8px;
      border-radius: 6px;
    }
    .app-sidebar-nav a:hover {
      background: rgba(15, 23, 42, 0.9);
    }
    .app-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .app-topbar {
      padding: 10px 16px;
      border-bottom: 1px solid var(--color-border);
    }
    .app-topbar h2 {
      margin: 0;
      font-size: 16px;
    }
    .app-main-content {
      padding: 18px 16px 28px;
      width: 100%;
      max-width: 1200px;
    }

    .logo-preview-box {
      margin-top:10px;
      padding:12px 10px;
      border-radius:6px;
      border:1px dashed var(--color-border);
      display:flex;
      align-items:center;
      gap:10px;
    }

    @media (max-width: 768px) {
      header {
        padding: 10px 14px;
      }
      main {
        padding: 16px 10px 28px;
      }
      .page, .page-narrow, .app-main-content {
        max-width: 100%;
      }
      .app-shell {
        flex-direction: column;
      }
      .app-sidebar {
        width: 100%;
        padding: 10px 10px;
        border-right: none;
        border-bottom: 1px solid var(--color-border);
        overflow-x: auto;
        white-space: nowrap;
      }
      .app-sidebar-nav {
        flex-direction: row;
        gap: 6px;
      }
      .app-main-content {
        padding: 16px 10px 24px;
      }
    }
  </style>
</head>
<body>
  <header>
    <div>${brandHtml}</div>
    <nav>
      <a href="/" class="btn-secondary btn">Home</a>
    </nav>
  </header>
  <main>${body}</main>
</body>
</html>`;
}
