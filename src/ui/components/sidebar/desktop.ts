// src/ui/components/sidebar/desktop.ts
import type { SidebarOptions } from "./types";
import { escapeHtml } from "../types";

export function renderDesktopSidebar(opts: SidebarOptions): string {
  const userRole = opts.userRole || "admin";
  const roleLabel = userRole.toUpperCase();

  const menuItems = opts.menu || [];
  
  // Group menu items by category for better organization
  const menuGroups = {
    main: menuItems.filter(item => ['Home', 'Dashboard'].includes(item.label)),
    management: menuItems.filter(item => 
      ['Site & Theme', 'Categories', 'Settings'].includes(item.label)
    ),
    shop: menuItems.filter(item => 
      ['Browse optimizers', 'Skins & passes'].includes(item.label)
    )
  };

  const renderMenuGroup = (title: string, items: any[]) => `
    <div class="sidebar-menu-group">
      ${title ? `<div class="sidebar-menu-group-title">${title}</div>` : ''}
      <div class="sidebar-menu-items">
        ${items.map(item => `
          <a href="${item.href}" class="sidebar-menu-item">
            <span class="sidebar-menu-item-text">${escapeHtml(item.label)}</span>
            <svg class="sidebar-menu-item-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  // Desktop sidebar with modern design
  const sidebar = `
    <aside class="app-sidebar app-sidebar-desktop">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">🎮</div>
          <div class="sidebar-logo-text">GameStore</div>
        </div>
        <div class="sidebar-user-role">${roleLabel}</div>
      </div>
      
      <nav class="sidebar-nav">
        ${menuGroups.main.length > 0 ? renderMenuGroup('', menuGroups.main) : ''}
        ${menuGroups.management.length > 0 ? renderMenuGroup('MANAGEMENT', menuGroups.management) : ''}
        ${menuGroups.shop.length > 0 ? renderMenuGroup('SHOP', menuGroups.shop) : ''}
      </nav>
      
      <div class="sidebar-footer">
        <div class="sidebar-footer-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span>Live</span>
        </div>
      </div>
    </aside>
  `;

  return sidebar;
}
