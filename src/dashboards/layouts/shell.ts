// src/dashboards/layouts/shell.ts
import { layout, type LayoutOptions } from "../../lib/html";
import { renderMobileSidebar, renderDesktopSidebar } from "../../ui/components/sidebar";
import type { UserInfo } from "../../ui/components/types";

interface DashboardUser {
  name?: string;
  email?: string;
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
  const userEmail = (opts.user?.email || "").toString();
  const avatarUrl = opts.user?.avatar_url || null;
  const roleLabel = (opts.userRole || "admin").toUpperCase();

  const userInfo: UserInfo = {
    name: displayName,
    email: userEmail,
    avatar_url: avatarUrl,
    role: opts.userRole
  };

  // Render mobile and desktop sidebars separately
  const mobileSidebar = renderMobileSidebar({
    ...opts.layoutOptions,
    menu: opts.menu,
    user: userInfo,
    userRole: roleLabel
  });

  const desktopSidebar = renderDesktopSidebar({
    ...opts.layoutOptions,
    menu: opts.menu,
    user: userInfo,
    userRole: roleLabel
  });

  // Combine both sidebars (CSS will handle showing/hiding based on viewport)
  const sidebar = `${mobileSidebar}${desktopSidebar}`;

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
