// src/dashboards/admin/home.ts (LEGACY - Use src/pages/dashboard/home.ts instead)
// This file is kept for backward compatibility and will be removed in future versions

import { DashboardHomePage } from "../../pages/dashboard/home";

export function adminHomeView() {
  // Return the new modern dashboard home
  return DashboardHomePage();
}
