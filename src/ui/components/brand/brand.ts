// src/ui/components/brand/brand.ts
import type { LayoutOptions } from "../types";
import type { LogoMode, LogoTextStyle } from "../../../services/setupService";

export function renderBrand(opts: LayoutOptions): string {
  const name = opts.siteName || "GameStore";
  const mode: LogoMode = opts.logoMode || "none";
  const textStyle: LogoTextStyle = opts.logoTextStyle || "plain";
  const url = opts.logoUrl || "";

  if (mode === "text") {
    const cls =
      textStyle === "sticker"
        ? "logo-text logo-sticker"
        : textStyle === "outline"
        ? "logo-text logo-outline"
        : textStyle === "soft"
        ? "logo-text logo-soft"
        : "logo-text";
    return `<span class="${cls}">${name}</span>`;
  }

  if (mode === "r2") {
    return `
      <div class="brand-logo-wrap">
        <img src="/media/logo" alt="${name}" class="brand-logo-img" />
        <span class="brand-logo-text">${name}</span>
      </div>
    `;
  }

  if (mode === "url" && url) {
    return `
      <div class="brand-logo-wrap">
        <img src="${url}" alt="${name}" class="brand-logo-img" />
        <span class="brand-logo-text">${name}</span>
      </div>
    `;
  }

  return `<div class="brand-title">${name}</div>`;
}
