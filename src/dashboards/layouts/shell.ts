// src/dashboards/layouts/shell.ts
import { layout } from "../../lib/html";

export function renderDashboardShell(opts: {
  userRole: string;
  title: string;
  menu: { label: string; href: string; icon?: string }[];
  content: string;
}) {
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

  const topbar = `
    <header class="app-topbar">
      <h2>${opts.title}</h2>
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

  return layout(opts.title, `
    <div class="app-shell">
      ${sidebar}
      ${contentArea}
    </div>
  `);
}
