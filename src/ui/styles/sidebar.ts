// src/ui/styles/sidebar.ts
import type { LayoutOptions } from "../components/types";

export function getSidebarStyles(opts: LayoutOptions): string {
  const mode = opts.themeMode === "light" ? "light" : "dark";
  const sidebarBg = opts.sidebarBg || (mode === "light" ? "#f3f4f6" : "#020617");
  const sidebarText = opts.sidebarText || (mode === "light" ? "#020617" : "#e5e7eb");

  return `
    :root {
      --sidebar-bg: ${sidebarBg};
      --sidebar-text: ${sidebarText};
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
      display: flex;
      flex-direction: column;
    }

    /* Sidebar user header (for mobile) */
    .app-sidebar-user {
      display:flex;
      align-items:center;
      gap:10px;
      margin-bottom:16px;
      padding-bottom:16px;
      border-bottom:1px solid var(--color-border);
    }
    .app-sidebar-user-avatar {
      width:40px;
      height:40px;
      border-radius:999px;
      object-fit:cover;
      border:1px solid var(--color-border);
      background:var(--color-card-bg);
    }
    .app-sidebar-user-avatar-fallback {
      width:40px;
      height:40px;
      border-radius:999px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:16px;
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
      flex:1;
    }
    .app-sidebar-user-name {
      font-weight:500;
      font-size:14px;
    }
    .app-sidebar-user-email {
      font-size:12px;
      color:var(--color-muted);
    }
    .app-sidebar-user-role {
      font-size:10px;
      text-transform:uppercase;
      letter-spacing:0.08em;
      color:var(--color-muted);
      margin-top:2px;
    }
    .app-sidebar-auth {
      margin-bottom:16px;
      display:flex;
      flex-direction:column;
      gap:8px;
    }
    .app-sidebar-auth .btn {
      width: 100%;
      text-align: center;
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
      flex: 1;
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

    /* Mobile sidebar styles */
    @media (max-width: 768px) {
      .app-shell {
        flex-direction: column;
      }
      .app-sidebar-mobile {
        display:none;
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        z-index:50;
        width:280px;
        overflow:auto;
        padding: 60px 16px 20px;
      }
      body.sidebar-open .app-sidebar-mobile {
        display:flex;
      }
      .app-sidebar-desktop {
        display: none !important;
      }
      .app-sidebar-user {
        display:flex;
      }
    }

    /* Desktop sidebar styles */
    @media (min-width: 769px) {
      .app-sidebar-desktop {
        display:flex;
        position:relative;
        top:auto;
        left:auto;
        bottom:auto;
      }
      .app-sidebar-user {
        display:none;
      }
      .app-sidebar-mobile {
        display:none;
      }
    }
  `;
}
