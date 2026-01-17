// src/ui/styles/topbar.ts
import type { LayoutOptions } from "../components/types";

export function getTopbarStyles(opts: LayoutOptions): string {
  const mode = opts.themeMode === "light" ? "light" : "dark";
  const topbarBg = opts.topbarBg || (mode === "light" ? "#ffffff" : "#020617");
  const topbarText = opts.topbarText || (mode === "light" ? "#020617" : "#e5e7eb");

  return `
    :root {
      --topbar-bg: ${topbarBg};
      --topbar-text: ${topbarText};
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
      position: relative;
      z-index: 20;
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
    .topbar-brand-link {
      display:inline-flex;
      align-items:center;
      gap:8px;
      text-decoration:none;
      color:inherit;
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
      border-radius:6px;
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

    /* Mobile topbar styles */
    @media (max-width: 768px) {
      body.has-sidebar .topbar-toggle {
        display:block !important;
        position:fixed;
        right:12px;
        top:10px;
        z-index:60;
        background:var(--topbar-bg);
        border:1px solid var(--color-border);
        padding:8px;
      }
      body.has-sidebar .topbar-right-text {
        display:none;
      }
      body.has-sidebar .topbar-user {
        display:none;
      }
      /* Always show toggle on mobile if sidebar exists */
      .topbar-mobile .topbar-toggle {
        display:block !important;
      }
    }

    /* Desktop topbar styles */
    @media (min-width: 769px) {
      .topbar-toggle {
        display:none;
      }
      .topbar-mobile {
        display:none;
      }
    }
    @media (max-width: 768px) {
      .topbar-desktop {
        display:none;
      }
    }
  `;
}
