// src/ui/styles/base.ts
import type { ThemeMode } from "../../services/setupService";

export function getBaseStyles(mode: ThemeMode, primary: string): string {
  const bg = mode === "light" ? "#f9fafb" : "#020617";
  const text = mode === "light" ? "#020617" : "#e5e7eb";
  const border = mode === "light" ? "#e5e7eb" : "#111827";
  const cardBg = mode === "light" ? "#ffffff" : "#020617";
  const muted = mode === "light" ? "#6b7280" : "#9ca3af";

  return `
    :root {
      color-scheme: ${mode === "light" ? "light" : "dark"};
      --color-bg: ${bg};
      --color-text: ${text};
      --color-border: ${border};
      --color-card-bg: ${cardBg};
      --color-muted: ${muted};
      --color-primary: ${primary};
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `;
}
