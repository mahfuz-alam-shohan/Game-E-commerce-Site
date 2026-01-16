// src/dashboards/layouts/shell.ts
import { layout, type LayoutOptions } from "../../lib/html";

interface DashboardUser {
  name?: string;
  avatar_url?: string | null;
}

function renderBrandInline(opts: LayoutOptions): string {
  const name = opts.siteName || "GameStore";
  const mode = opts.logoMode || "none";
  const style = opts.logoTextStyle || "plain";
  const url = opts.logoUrl || "";

  if (mode === "text") {
    const cls =
      style === "sticker"
        ? "logo-text logo-sticker"
        : style === "outline"
        ? "logo-text logo-outline"
        : style === "soft"
        ? "logo-text logo-soft"
        : "logo-text";
    return `<span class="${cls}">${name}</span>`;
  }

  if (mode === "r2") {
    return `
      <div class="brand-logo-wrap">
        <img src="/media/logo" alt="${name}" class="brand-logo-img" />
        <span class="brand-logo-text">${name}</span>
      </div>
    `;
  }

  if (mode === "url" && url) {
    return `
      <div class="brand-logo-wrap">
        <img src="${url}" alt="${name}" class="brand-logo-img" />
        <span class="brand-logo-text">${name}</span>
      </div>
    `;
  }

  return `<div class="brand-title">${name}</div>`;
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

  const brandHtml = renderBrandInline(opts.layoutOptions);

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
        <button class="app-topbar-toggle" type="button" aria-label="Toggle menu">
          <span class="app-topbar-toggle-icon"></span>
        </button>
        <div class="app-topbar-brand">
          ${brandHtml}
        </div>
        <span class="app-topbar-page-title">${opts.title}</span>
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
    <div class="app-shell app-shell-admin">
      ${sidebar}
      ${contentArea}
    </div>
    <script>
      (function() {
        var btn = document.querySelector(".app-topbar-toggle");
        if (!btn) return;
        btn.addEventListener("click", function() {
          if (document.body.classList.contains("sidebar-open")) {
            document.body.classList.remove("sidebar-open");
          } else {
            document.body.classList.add("sidebar-open");
          }
        });
      })();
    </script>
  `;

  return layout(opts.title, shell, {
    ...opts.layoutOptions,
    hideHeader: true // IMPORTANT: no global header on dashboard pages
  });
}
