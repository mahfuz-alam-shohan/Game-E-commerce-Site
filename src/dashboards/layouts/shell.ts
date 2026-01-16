// src/dashboards/layouts/shell.ts
import { layout, type LayoutOptions } from "../../lib/html";

interface DashboardUser {
  name?: string;
  avatar_url?: string | null;
  role?: string;
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
  const sidebarInitial = displayName.charAt(0).toUpperCase();
  const roleLabel = (opts.userRole || "admin").toUpperCase();

  const sidebarUserBlock = `
    <div class="app-sidebar-user">
      ${
        avatarUrl
          ? `<img src="${avatarUrl}" alt="${displayName}" class="app-sidebar-user-avatar" />`
          : `<div class="app-sidebar-user-avatar-fallback">${sidebarInitial}</div>`
      }
      <div class="app-sidebar-user-meta">
        <div class="app-sidebar-user-name">${displayName}</div>
        <div class="app-sidebar-user-role">${roleLabel}</div>
      </div>
    </div>
  `;

  const sidebar = `
    <aside class="app-sidebar">
      ${sidebarUserBlock}
      <h3 class="app-sidebar-title">${roleLabel}</h3>
      <nav class="app-sidebar-nav">
        ${opts.menu
          .map(item => `<a href="${item.href}">${item.label}</a>`)
          .join("")}
      </nav>
    </aside>
  `;

  // ❗ No extra <h1> here – each view is responsible for its own heading
  const contentArea = `
    <div class="app-main">
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

  return layout(opts.title, shell, {
    ...opts.layoutOptions,
    showSidebarToggle: true,
    userName: displayName,
    userAvatarUrl: avatarUrl ?? null
  });
}