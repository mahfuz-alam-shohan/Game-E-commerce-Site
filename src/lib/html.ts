// src/lib/html.ts
import type {
  LogoMode,
  LogoTextStyle,
  ThemeMode
} from "../services/setupService";

export interface LayoutOptions {
  siteName?: string;
  themeMode?: ThemeMode;
  themePrimary?: string;
  logoMode?: LogoMode;
  logoUrl?: string;
  logoTextStyle?: LogoTextStyle;
  topbarBg?: string;
  topbarText?: string;
  sidebarBg?: string;
  sidebarText?: string;

  // For pages that actually have a sidebar (admin pages, or landing if you want)
  showSidebarToggle?: boolean;

  // Logged-in user info (admin)
  userName?: string;
  userAvatarUrl?: string | null;
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

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function layout(title: string, body: string, opts?: LayoutOptions): string {
  const siteName = opts?.siteName || "GameStore";
  const mode: ThemeMode = opts?.themeMode === "light" ? "light" : "dark";
  const primary = opts?.themePrimary || "#22c55e";

  const bg = mode === "light" ? "#f9fafb" : "#020617";
  const text = mode === "light" ? "#020617" : "#e5e7eb";
  const border = mode === "light" ? "#e5e7eb" : "#111827";
  const cardBg = mode === "light" ? "#ffffff" : "#020617";
  const muted = mode === "light" ? "#6b7280" : "#9ca3af";

  const topbarBg = opts?.topbarBg || (mode === "light" ? "#ffffff" : "#020617");
  const topbarText = opts?.topbarText || (mode === "light" ? "#020617" : "#e5e7eb");
  const sidebarBg = opts?.sidebarBg || (mode === "light" ? "#f3f4f6" : "#020617");
  const sidebarText = opts?.sidebarText || (mode === "light" ? "#020617" : "#e5e7eb");

  const hasSidebar = !!opts?.showSidebarToggle;

  const userName = opts?.userName ? escapeHtml(opts.userName) : "";
  const userAvatarUrl = opts?.userAvatarUrl || null;
  const userInitial = userName ? escapeHtml(userName.charAt(0).toUpperCase()) : "A";

  const brandHtml = renderBrand({
    siteName,
    logoMode: opts?.logoMode,
    logoUrl: opts?.logoUrl,
    logoTextStyle: opts?.logoTextStyle
  });

  const userBlock = userName
    ? `
      <div class="topbar-user">
        ${
          userAvatarUrl
            ? `<img src="${userAvatarUrl}" alt="${userName}" class="topbar-avatar" />`
            : `<div class="topbar-avatar-fallback">${userInitial}</div>`
        }
        <div class="topbar-user-meta">
          <div class="topbar-user-name">${userName}</div>
          <a href="/auth/logout" class="topbar-user-link">Sign out</a>
        </div>
      </div>
    `
    : "";

  // PC / big screens: show buttons in header
  const navRight = userName
    ? `
      <div class="topbar-right">
        <div class="topbar-right-text">
          <a href="/" class="btn-secondary btn">Home</a>
          <a href="/admin" class="btn btn-primary">Dashboard</a>
        </div>
        ${userBlock}
      </div>
    `
    : `
      <div class="topbar-right">
        <div class="topbar-right-text">
          <a href="/" class="btn-secondary btn">Home</a>
          <a href="/auth/login" class="btn btn-primary">Admin</a>
        </div>
      </div>
    `;

  const toggleButton = hasSidebar
    ? `
      <button class="topbar-toggle" type="button" aria-label="Toggle menu">
        <span class="topbar-toggle-icon"></span>
      </button>
    `
    : "";

  const headerHtml = `
    <header class="topbar">
      <div class="topbar-left">
        ${toggleButton}
        <div class="topbar-brand">
          ${brandHtml}
        </div>
      </div>
      ${navRight}
    </header>
  `;

  const bodyClass = hasSidebar ? ' class="has-sidebar"' : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
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
      --topbar-bg: ${topbarBg};
      --topbar-text: ${topbarText};
      --sidebar-bg: ${sidebarBg};
      --sidebar-text: ${sidebarText};
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

    /* Top bar */
    .topbar {
      width: 100%;
      padding: 10px 16px;
      border-bottom: 1px solid var(--color-border);
      background: var(--topbar-bg);
      color: var(--topbar-text);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .topbar-left {
      display:flex;
      align-items:center;
      gap:10px;
    }
    .topbar-right {
      display:flex;
      align-items:center;
      gap:12px;
    }
    .topbar-right-text {
      display:flex;
      align-items:center;
      gap:8px;
    }

    .topbar-brand {
      display:flex;
      align-items:center;
      gap:8px;
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
      padding: 8px 14px;
      border-radius: 999px;
      border: none;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
    }
    .btn-primary {
      background: var(--color-primary);
      color: #020617;
    }
    .btn-secondary {
      background: transparent;
      color: var(--topbar-text);
      border: 1px solid var(--color-border);
    }

    .topbar-user {
      display:flex;
      align-items:center;
      gap:7px;
    }
    .topbar-avatar {
      width:28px;
      height:28px;
      border-radius:999px;
      object-fit:cover;
      border:1px solid var(--color-border);
      background:var(--color-card-bg);
    }
    .topbar-avatar-fallback {
      width:28px;
      height:28px;
      border-radius:999px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:13px;
      font-weight:600;
      border:1px solid var(--color-border);
      background:var(--color-card-bg);
      color:var(--topbar-text);
    }
    .topbar-user-meta {
      display:flex;
      flex-direction:column;
      gap:2px;
      font-size:11px;
    }
    .topbar-user-name {
      font-weight:500;
    }
    .topbar-user-link {
      color:var(--color-muted);
      text-decoration:none;
    }
    .topbar-user-link:hover {
      text-decoration:underline;
    }

    .topbar-toggle {
      display:none;
      border:none;
      background:transparent;
      color:var(--topbar-text);
      cursor:pointer;
      padding:4px;
      border-radius:4px;
    }
    .topbar-toggle-icon {
      width:18px;
      height:2px;
      background:var(--topbar-text);
      position:relative;
      display:block;
    }
    .topbar-toggle-icon::before,
    .topbar-toggle-icon::after {
      content:"";
      position:absolute;
      left:0;
      width:18px;
      height:2px;
      background:var(--topbar-text);
    }
    .topbar-toggle-icon::before { top:-5px; }
    .topbar-toggle-icon::after { top:5px; }

    main {
      width: 100%;
      padding: 18px 16px 40px;
      flex: 1;
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
      box-shadow: none;
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

    /* Admin shell */
    .app-shell {
      display: flex;
      min-height: calc(100vh - 58px);
      width: 100%;
    }
    .app-sidebar {
      width: 240px;
      padding: 14px 12px;
      border-right: 1px solid var(--color-border);
      background: var(--sidebar-bg);
      color: var(--sidebar-text);
    }

    /* Sidebar user header (for phone) */
    .app-sidebar-user {
      display:flex;
      align-items:center;
      gap:10px;
      margin-bottom:10px;
    }
    .app-sidebar-user-avatar {
      width:32px;
      height:32px;
      border-radius:999px;
      object-fit:cover;
      border:1px solid var(--color-border);
      background:var(--color-card-bg);
    }
    .app-sidebar-user-avatar-fallback {
      width:32px;
      height:32px;
      border-radius:999px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:14px;
      font-weight:600;
      border:1px solid var(--color-border);
      background:var(--color-card-bg);
      color:var(--sidebar-text);
    }
    .app-sidebar-user-meta {
      display:flex;
      flex-direction:column;
      gap:2px;
      font-size:12px;
    }
    .app-sidebar-user-name {
      font-weight:500;
    }
    .app-sidebar-user-role {
      font-size:11px;
      text-transform:uppercase;
      letter-spacing:0.08em;
      color:var(--color-muted);
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
      color: var(--sidebar-text);
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

    /* Responsive */
    @media (max-width: 768px) {
      main {
        padding: 14px 10px 28px;
      }
      .page, .page-narrow, .app-main-content {
        max-width: 100%;
      }

      /* Phone behavior for pages with sidebar */
      body.has-sidebar .topbar-toggle {
        display:block;
      }
      body.has-sidebar .topbar-right-text {
        display:none;   /* hide Home/Dashboard buttons on phone */
      }
      body.has-sidebar .topbar-user {
        display:none;   /* hide avatar + name from title bar on phone */
      }

      .app-shell {
        flex-direction: column;
      }
      .app-sidebar {
        display:none;
        position:fixed;
        top:48px;
        left:0;
        bottom:0;
        z-index:40;
        width:240px;
        overflow:auto;
      }
      body.sidebar-open .app-sidebar {
        display:block;
      }

      /* On phone we WANT the sidebar user header visible */
      .app-sidebar-user {
        display:flex;
      }
    }

    @media (min-width: 769px) {
      .topbar-toggle {
        display:none;
      }
      .app-sidebar {
        display:block;
        position:relative;
        top:auto;
        left:auto;
        bottom:auto;
      }
      /* On PC we HIDE the user block in sidebar, keep it in title bar */
      .app-sidebar-user {
        display:none;
      }
    }
  </style>
</head>
<body${bodyClass}>
  ${headerHtml}
  <main>${body}</main>
  <script>
    (function() {
      var btn = document.querySelector(".topbar-toggle");
      if (!btn) return;
      btn.addEventListener("click", function() {
        if (document.body.classList.contains("sidebar-open")) {
          document.body.classList.remove("sidebar-open");
        } else {
          document.body.classList.add("sidebar-open");
        }
      });
    })();
  </script>
</body>
</html>`;
}