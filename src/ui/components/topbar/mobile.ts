// src/ui/components/topbar/mobile.ts
import type { TopbarOptions } from "./types";
import { renderBrand } from "../brand/brand";

export function renderMobileTopbar(opts: TopbarOptions): string {
  const siteName = opts.siteName || "GameStore";
  const hasSidebar = !!opts?.hasSidebar;

  const brandHtml = renderBrand({
    siteName,
    logoMode: opts?.logoMode,
    logoUrl: opts?.logoUrl,
    logoTextStyle: opts?.logoTextStyle
  });

  // Mobile: ALWAYS show toggle button (if sidebar exists), never show user info or buttons
  const toggleButton = hasSidebar
    ? `
      <button class="topbar-toggle" type="button" aria-label="Toggle menu">
        <span class="topbar-toggle-icon"></span>
      </button>
    `
    : "";

  const headerHtml = `
    <header class="topbar topbar-mobile">
      <div class="topbar-left">
        <div class="topbar-brand">
          <a href="/" class="topbar-brand-link">
            ${brandHtml}
          </a>
        </div>
      </div>
      <div class="topbar-right">
        ${toggleButton}
      </div>
    </header>
  `;

  return headerHtml;
}
