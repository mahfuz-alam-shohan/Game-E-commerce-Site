// src/dashboards/layouts/shell.ts
import { modernLayout } from "../../lib/layout";
import type { LayoutOptions } from "../../ui/components/types";

export interface DashboardUser {
  name: string;
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
  const displayName = opts.user?.name || "Admin";
  const userEmail = opts.user?.email || "";
  const avatarUrl = opts.user?.avatar_url || null;
  const roleLabel = opts.userRole || "admin";

  const user = {
    name: displayName,
    email: userEmail,
    avatar_url: avatarUrl || undefined,
    role: roleLabel
  };

  return modernLayout(opts.title, opts.content, {
    ...opts.layoutOptions,
    user,
    showSidebar: true,
    title: opts.title
  });
}
