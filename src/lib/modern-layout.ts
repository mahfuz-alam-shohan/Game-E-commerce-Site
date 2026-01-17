// src/lib/modern-layout.ts
import { getDesignSystemStyles } from "../styles/design-system";
import { getPerformanceOptimizations } from "../scripts/performance";
import { escapeHtml } from "../ui/components/types";

export interface ModernLayoutOptions {
  title: string;
  description?: string;
  user?: {
    name: string;
    email?: string;
    avatar_url?: string;
    role?: string;
  };
  theme?: 'light' | 'dark' | 'auto';
  lang?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  children: string;
}

export function modernLayout(options: ModernLayoutOptions): string {
  const {
    title,
    description = "Professional gaming marketplace - Discover, buy and sell games worldwide",
    user,
    theme = 'auto',
    lang = 'en',
    canonical,
    ogImage,
    ogType = 'website',
    noIndex = false,
    children
  } = options;

  const siteName = "GameStore";
  const siteUrl = "https://gamestore.com";
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return `<!doctype html>
<html lang="${lang}" data-theme="${theme}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="theme-color" content="#6366f1" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="${siteName}" />
  <meta name="application-name" content="${siteName}" />
  <meta name="author" content="GameStore Team" />
  <meta name="keywords" content="gaming, marketplace, games, buy games, sell games, digital games" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(fullTitle)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="${siteName}" />
  <meta property="og:url" content="${canonical || siteUrl}" />
  ${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ''}
  <meta property="og:locale" content="${lang}_US" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  ${ogImage ? `<meta name="twitter:image" content="${ogImage}" />` : ''}
  <meta name="twitter:site" content="@gamestore" />
  
  <!-- Canonical URL -->
  ${canonical ? `<link rel="canonical" href="${canonical}" />` : ''}
  
  <!-- Robots -->
  ${noIndex ? '<meta name="robots" content="noindex,nofollow" />' : '<meta name="robots" content="index,follow" />'}
  
  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://cdn.gamestore.com" />
  
  <!-- DNS Prefetch -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//cdn.gamestore.com" />
  
  <!-- Critical CSS -->
  <style>
    /* Critical above-the-fold styles */
    :root {
      --primary: #6366f1;
      --primary-dark: #4f46e5;
      --text: #111827;
      --text-light: #6b7280;
      --bg: #ffffff;
      --bg-secondary: #f9fafb;
      --border: #e5e7eb;
      --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    }

    [data-theme="dark"] {
      --text: #f9fafb;
      --text-light: #d1d5db;
      --bg: #111827;
      --bg-secondary: #1f2937;
      --border: #374151;
    }

    * {
      box-sizing: border-box;
    }

    html {
      font-size: 16px;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.5;
      color: var(--text);
      background: var(--bg);
      overflow-x: hidden;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    a {
      color: var(--primary);
      text-decoration: none;
    }

    button {
      font-family: inherit;
    }

    /* Loading skeleton */
    .skeleton {
      background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--border) 50%, var(--bg-secondary) 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  </style>
  
  <!-- Design System -->
  <style>${getDesignSystemStyles()}</style>
  
  <!-- Font loading -->
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M12 2L2 7l10 5 10-5M2 17l10 5 10-5M2 12l10 5 10-5'/></svg>" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
  <!-- Manifest for PWA -->
  <link rel="manifest" href="/manifest.json" />
</head>
<body>
  ${children}
  
  <!-- Performance Optimizations -->
  <script>${getPerformanceOptimizations()}</script>
  
  <!-- Analytics (placeholder) -->
  <script async src="https://analytics.gamestore.com/analytics.js"></script>
</body>
</html>`;
}
