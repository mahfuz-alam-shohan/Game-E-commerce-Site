// src/routes/admin/index.ts
// Admin routes aggregation

import { Hono } from "hono";
import type { Env } from "../../types";
import { adminDashboardRouter } from "./dashboard";
import { adminCategoriesRouter } from "./categories";
import { adminLogoRouter } from "./logo";

export const adminRouter = new Hono<{ Bindings: Env; Variables: { user?: any } }>();

// Mount admin sub-routes
adminRouter.route("/", adminDashboardRouter);
adminRouter.route("/categories", adminCategoriesRouter);
adminRouter.route("/logo", adminLogoRouter);

export default adminRouter;
