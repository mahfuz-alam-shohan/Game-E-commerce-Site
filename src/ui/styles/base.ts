// src/ui/styles/base.ts
import type { ThemeMode } from "../../services/setupService";

export function getBaseStyles(mode: ThemeMode, primary: string): string {
  const bg = mode === "light" ? "#fafbfc" : "#0f172a";
  const text = mode === "light" ? "#1e293b" : "#f1f5f9";
  const border = mode === "light" ? "rgba(148, 163, 184, 0.2)" : "rgba(148, 163, 184, 0.1)";
  const cardBg = mode === "light" ? "#ffffff" : "#1e293b";
  const muted = mode === "light" ? "#64748b" : "#94a3b8";

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
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-feature-settings: "cv02", "cv03", "cv04", "cv11";
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;
}
