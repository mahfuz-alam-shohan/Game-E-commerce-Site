// src/dashboards/layouts/shell.ts
import { layout } from "../../lib/html";

export function renderDashboardShell(opts: {
  userRole: string;
  title: string;
  menu: { label: string; href: string; icon?: string }[];
  content: string;
}) {
  const sidebar = `
    <aside style="width:220px;padding:16px;border-right:1px solid #111827;">
      <h3 style="margin-bottom:20px;">${opts.userRole.toUpperCase()}</h3>
      <nav style="display:flex;flex-direction:column;gap:8px;">
        ${opts.menu
          .map(item => `<a href="${item.href}" style="color:#e5e7eb;text-decoration:none;font-size:14px;">${item.label}</a>`)
          .join("")}
      </nav>
    </aside>
  `;

  const topbar = `
    <header style="padding:12px 16px;border-bottom:1px solid #111827;">
      <h2 style="margin:0;font-size:16px;">${opts.title}</h2>
    </header>
  `;

  const contentArea = `
    <div style="flex:1;display:flex;flex-direction:column;">
      ${topbar}
      <div style="padding:24px;">${opts.content}</div>
    </div>
  `;

  return layout(opts.title, `
    <div style="display:flex;min-height:80vh;">
      ${sidebar}
      ${contentArea}
    </div>
  `);
}
