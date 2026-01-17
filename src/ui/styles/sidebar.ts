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

    /* Modern Desktop Sidebar */
    .app-shell {
      display: flex;
      min-height: calc(100vh - 58px);
      width: 100%;
    }
    
    .app-sidebar {
      width: 280px;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-right: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .app-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      background: var(--color-bg);
    }

    .app-main-content {
      padding: 32px 32px 40px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .sidebar-header {
      padding: 24px 20px 20px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .sidebar-logo-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .sidebar-logo-text {
      font-size: 18px;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: -0.025em;
    }

    .sidebar-user-role {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      background: rgba(100, 116, 139, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 16px;
      overflow-y: auto;
    }

    .sidebar-menu-group {
      margin-bottom: 24px;
    }

    .sidebar-menu-group:last-child {
      margin-bottom: 0;
    }

    .sidebar-menu-group-title {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
      padding: 0 12px;
    }

    .sidebar-menu-items {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sidebar-menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 8px;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .sidebar-menu-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, rgba(34, 197, 94, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .sidebar-menu-item:hover {
      background: rgba(100, 116, 139, 0.1);
      color: #f1f5f9;
      transform: translateX(2px);
    }

    .sidebar-menu-item:hover::before {
      opacity: 1;
    }

    .sidebar-menu-item:active {
      transform: translateX(1px) scale(0.98);
    }

    .sidebar-menu-item-text {
      flex: 1;
    }

    .sidebar-menu-item-icon {
      opacity: 0.6;
      transition: opacity 0.2s ease;
    }

    .sidebar-menu-item:hover .sidebar-menu-item-icon {
      opacity: 1;
    }

    .sidebar-footer {
      padding: 16px 20px 24px;
      border-top: 1px solid rgba(148, 163, 184, 0.1);
    }

    .sidebar-footer-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .sidebar-footer-item svg {
      flex-shrink: 0;
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
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
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
