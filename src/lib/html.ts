// src/lib/html.ts
// Re-export types from ui components for backward compatibility
import type { LayoutOptions } from "../ui/components/types";
export type { LayoutOptions };
import type { ThemeMode } from "../services/setupService";
import { renderMobileTopbar, renderDesktopTopbar } from "../ui/components/topbar";
import { escapeHtml } from "../ui/components/types";
import {
  getBaseStyles,
  getTopbarStyles,
  getSidebarStyles,
  getCommonStyles
} from "../ui/styles";


export function layout(title: string, body: string, opts?: LayoutOptions): string {
  const siteName = opts?.siteName || "GameStore";
  const mode: ThemeMode = opts?.themeMode === "light" ? "light" : "dark";
  const primary = opts?.themePrimary || "#22c55e";
  const hasSidebar = !!opts?.showSidebarToggle;

  // Render mobile and desktop topbars separately
  const mobileTopbar = renderMobileTopbar({
    ...opts,
    siteName,
    hasSidebar,
    user: opts?.userName ? { name: opts.userName, avatar_url: opts.userAvatarUrl } : undefined
  });

  const desktopTopbar = renderDesktopTopbar({
    ...opts,
    siteName,
    hasSidebar,
    user: opts?.userName ? { name: opts.userName, avatar_url: opts.userAvatarUrl } : undefined
  });

  // Combine both topbars (CSS will handle showing/hiding based on viewport)
  const headerHtml = `${mobileTopbar}${desktopTopbar}`;

  const bodyClass = hasSidebar ? ' class="has-sidebar"' : "";

  // Get modular styles
  const baseStyles = getBaseStyles(mode, primary);
  const topbarStyles = getTopbarStyles(opts || {});
  const sidebarStyles = getSidebarStyles(opts || {});
  const commonStyles = getCommonStyles();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    ${baseStyles}
    ${topbarStyles}
    ${sidebarStyles}
    ${commonStyles}
  </style>
</head>
<body${bodyClass}>
  ${headerHtml}
  <main>${body}</main>
  <script>
    (function() {
      var btn = document.querySelector(".topbar-toggle");
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
</body>
</html>`;
}