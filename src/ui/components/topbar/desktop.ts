// src/ui/components/topbar/desktop.ts
import type { TopbarOptions } from "./types";
import { renderBrand } from "../brand/brand";
import { escapeHtml } from "../types";

export function renderDesktopTopbar(opts: TopbarOptions): string {
  const siteName = opts.siteName || "GameStore";
  const userName = opts?.userName ? escapeHtml(opts.userName) : "";
  const userAvatarUrl = opts?.userAvatarUrl || null;
  const userInitial = userName ? escapeHtml(userName.charAt(0).toUpperCase()) : "A";

  const brandHtml = renderBrand({
    siteName,
    logoMode: opts?.logoMode,
    logoUrl: opts?.logoUrl,
    logoTextStyle: opts?.logoTextStyle
  });

  // Desktop: Show user info if logged in, or Home/Admin buttons if not
  const userBlock = userName
    ? `
      <div class="topbar-user">
        ${
          userAvatarUrl
            ? `<img src="${userAvatarUrl}" alt="${userName}" class="topbar-avatar" />`
            : `<div class="topbar-avatar-fallback">${userInitial}</div>`
        }
        <div class="topbar-user-meta">
          <div class="topbar-user-name">${userName}</div>
          <a href="/auth/logout" class="topbar-user-link">Sign out</a>
        </div>
      </div>
    `
    : `
      <div class="topbar-right-text">
        <a href="/" class="btn-secondary btn">Home</a>
        <a href="/auth/login" class="btn btn-primary">Admin</a>
      </div>
    `;

  const headerHtml = `
    <header class="topbar topbar-desktop">
      <div class="topbar-left">
        <div class="topbar-brand">
          <a href="/" class="topbar-brand-link">
            ${brandHtml}
          </a>
        </div>
      </div>
      <div class="topbar-right">
        ${userBlock}
      </div>
    </header>
  `;

  return headerHtml;
}
