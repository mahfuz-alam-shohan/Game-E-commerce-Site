// src/ui/components/sidebar/mobile.ts
import type { SidebarOptions, SidebarMenuItem } from "./types";
import { escapeHtml } from "../types";

function getUserMenus(userRole?: string): SidebarMenuItem[] {
  if (!userRole) {
    return [
      { label: "Home", href: "/" },
      { label: "Browse optimizers", href: "#" },
      { label: "Skins & passes", href: "#" }
    ];
  }

  switch (userRole.toLowerCase()) {
    case "super_admin":
    case "admin":
      return [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/admin" },
        { label: "Site & Theme", href: "/admin/settings" },
        { label: "Categories", href: "/admin/categories" },
        { label: "Browse optimizers", href: "#" },
        { label: "Skins & passes", href: "#" }
      ];
    case "staff":
      return [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/staff" },
        { label: "Browse optimizers", href: "#" },
        { label: "Skins & passes", href: "#" }
      ];
    case "customer":
      return [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/customer" },
        { label: "My Orders", href: "/orders" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "Cart", href: "/cart" },
        { label: "Browse optimizers", href: "#" },
        { label: "Skins & passes", href: "#" }
      ];
    default:
      return [
        { label: "Home", href: "/" },
        { label: "Browse optimizers", href: "#" },
        { label: "Skins & passes", href: "#" }
      ];
  }
}

export function renderMobileSidebar(opts: SidebarOptions): string {
  const user = opts.user;
  const userName = user?.name || opts.userName || "";
  const userEmail = (user as any)?.email || "";
  const userAvatarUrl = user?.avatar_url || opts.userAvatarUrl || null;
  const userRole = user?.role || opts.userRole || "";
  const sidebarInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  // Get menus based on user role
  const menuItems = opts.menu || getUserMenus(userRole);
  const menuHtml = menuItems
    .map(item => `<a href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join("");

  // If logged in, show user info at top
  const userBlock = userName
    ? `
      <div class="app-sidebar-user">
        ${
          userAvatarUrl
            ? `<img src="${userAvatarUrl}" alt="${escapeHtml(userName)}" class="app-sidebar-user-avatar" />`
            : `<div class="app-sidebar-user-avatar-fallback">${sidebarInitial}</div>`
        }
        <div class="app-sidebar-user-meta">
          <div class="app-sidebar-user-name">${escapeHtml(userName)}</div>
          ${userEmail ? `<div class="app-sidebar-user-email">${escapeHtml(userEmail)}</div>` : ""}
          ${userRole ? `<div class="app-sidebar-user-role">${userRole.toUpperCase()}</div>` : ""}
        </div>
      </div>
    `
    : "";

  // If not logged in, show login buttons
  const authButtons = !userName
    ? `
      <div class="app-sidebar-auth">
        <a href="/auth/login" class="btn btn-primary" style="width: 100%; text-align: center; margin-bottom: 8px;">Admin Login</a>
        <a href="/" class="btn-secondary btn" style="width: 100%; text-align: center;">Home</a>
      </div>
    `
    : "";

  const sidebar = `
    <aside class="app-sidebar app-sidebar-mobile">
      ${userBlock}
      ${authButtons}
      <h3 class="app-sidebar-title">${userRole ? `${userRole.toUpperCase()}` : "NAVIGATION"}</h3>
      <nav class="app-sidebar-nav">
        ${menuHtml}
      </nav>
      ${userName ? `<div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--color-border);"><a href="/auth/logout" class="topbar-user-link" style="display: block; padding: 8px;">Sign out</a></div>` : ""}
    </aside>
  `;

  return sidebar;
}
