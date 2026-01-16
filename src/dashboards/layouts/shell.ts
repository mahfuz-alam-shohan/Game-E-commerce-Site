// src/dashboards/layouts/shell.ts
import { layout, type LayoutOptions } from "../../lib/html";

interface DashboardUser {
  name?: string;
  avatar_url?: string | null;
}

export function renderDashboardShell(opts: {
  userRole: string;
  title: string;
  menu: { label: string; href: string; icon?: string }[];
  content: string;
  layoutOptions: LayoutOptions;
  user?: DashboardUser;
}) {
  const displayName = (opts.user?.name || "Admin").toString();
  const avatarUrl = opts.user?.avatar_url || null;
  const initial = displayName.charAt(0).toUpperCase();

  const sidebar = `
    <aside class="app-sidebar">
      <h3 class="app-sidebar-title">${opts.userRole.toUpperCase()}</h3>
      <nav class="app-sidebar-nav">
        ${opts.menu
          .map(
            item =>
              `<a href="${item.href}">${item.label}</a>`
          )
          .join("")}
      </nav>
    </aside>
  `;

  const topbarUser = `
    <div class="app-topbar-user">
      ${
        avatarUrl
          ? `<img src="${avatarUrl}" alt="${displayName}" class="app-topbar-avatar" />`
          : `<div class="app-topbar-avatar-fallback">${initial}</div>`
      }
      <div class="app-topbar-user-meta">
        <div class="app-topbar-user-name">${displayName}</div>
        <a href="/auth/logout" class="app-topbar-user-link">Sign out</a>
      </div>
    </div>
  `;

  const topbar = `
    <header class="app-topbar">
      <div class="app-topbar-left">
        <h2>${opts.title}</h2>
      </div>
      <div class="app-topbar-right">
        ${topbarUser}
      </div>
    </header>
  `;

  const contentArea = `
    <div class="app-main">
      ${topbar}
      <div class="app-main-content">
        ${opts.content}
      </div>
    </div>
  `;

  const shell = `
    <div class="app-shell">
      ${sidebar}
      ${contentArea}
    </div>
  `;

  return layout(opts.title, shell, opts.layoutOptions);
}
