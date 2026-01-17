// src/ui/components/sidebar/types.ts
import type { LayoutOptions, UserInfo } from "../types";

export interface SidebarMenuItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SidebarOptions extends LayoutOptions {
  menu?: SidebarMenuItem[];
  user?: UserInfo;
  userRole?: string;
}
