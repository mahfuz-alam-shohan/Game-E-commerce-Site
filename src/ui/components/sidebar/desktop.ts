// src/ui/components/sidebar/desktop.ts
import type { SidebarOptions } from "./types";
import { escapeHtml } from "../types";

export function renderDesktopSidebar(opts: SidebarOptions): string {
  const userRole = opts.userRole || "admin";
  const roleLabel = userRole.toUpperCase();

  const menuItems = opts.menu || [];
  const menuHtml = menuItems
    .map(item => `<a href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join("");

  // Desktop sidebar: no user block (user info is in topbar)
  const sidebar = `
    <aside class="app-sidebar app-sidebar-desktop">
      <h3 class="app-sidebar-title">${roleLabel}</h3>
      <nav class="app-sidebar-nav">
        ${menuHtml}
      </nav>
    </aside>
  `;

  return sidebar;
}
