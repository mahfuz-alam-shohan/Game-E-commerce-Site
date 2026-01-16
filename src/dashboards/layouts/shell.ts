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

  const contentArea = `
    <div class="app-main">
      <div class="app-main-content">
        <h1 class="page-title" style="margin-bottom:8px;">${opts.title}</h1>
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