// src/ui/components/types.ts
import type { LogoMode, LogoTextStyle, ThemeMode } from "../../services/setupService";

export interface LayoutOptions {
  siteName?: string;
  themeMode?: ThemeMode;
  themePrimary?: string;
  logoMode?: LogoMode;
  logoUrl?: string;
  logoTextStyle?: LogoTextStyle;
  topbarBg?: string;
  topbarText?: string;
  sidebarBg?: string;
  sidebarText?: string;
  showSidebarToggle?: boolean;
  userName?: string;
  userAvatarUrl?: string | null;
  user?: UserInfo;
}

export interface UserInfo {
  name?: string;
  email?: string;
  avatar_url?: string | null;
  role?: string;
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
