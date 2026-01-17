// src/ui/components/topbar/types.ts
import type { LayoutOptions, UserInfo } from "../types";

export interface TopbarOptions extends LayoutOptions {
  hasSidebar?: boolean;
  user?: UserInfo;
}
