// src/routes/media.ts
import { Hono } from "hono";
import type { Env } from "../../types";
import { getSiteSettings } from "../../services/setupService";

export const mediaRouter = new Hono<{ Bindings: Env }>();

mediaRouter.get("/logo", async c => {
  const settings = await getSiteSettings(c.env);
  const key = settings.siteLogoR2Key || "site-logo";

  if (!key) {
    return c.text("No logo", 404);
  }

  const obj = await c.env.BUCKET.get(key);

  if (!obj || !obj.body) {
    return c.text("Logo not found", 404);
  }

  const headers: Record<string, string> = {
    "Cache-Control": "public, max-age=3600"
  };
  const meta = obj.httpMetadata || {};
  if (meta.contentType) {
    headers["Content-Type"] = meta.contentType;
  }

  return new Response(obj.body, { headers });
});
