// src/lib/layout.ts
import type { LayoutOptions } from "../ui/components/types";
import type { ThemeMode } from "../services/setupService";
import { AppShell, type AppShellProps } from "../components/layout/AppShell";
import { getLayoutStyles } from "../styles/layout";
import { getBaseStyles } from "../ui/styles/base";
import { getCommonStyles } from "../ui/styles/common";
import { getLayoutScript } from "../scripts/layout";
import { escapeHtml } from "../ui/components/types";

export interface ModernLayoutOptions extends Omit<LayoutOptions, 'showSidebarToggle'> {
  title: string;
  user?: {
    name: string;
    email?: string;
    avatar_url?: string;
    role?: string;
  };
  showSidebar?: boolean;
}

export function modernLayout(title: string, content: string, opts?: ModernLayoutOptions): string {
  const siteName = opts?.siteName || "GameStore";
  const mode: ThemeMode = opts?.themeMode === "light" ? "light" : "dark";
  const primary = opts?.themePrimary || "#22c55e";
  const sidebarBg = opts?.sidebarBg || (mode === "light" ? "#f3f4f6" : "#020617");
  const sidebarText = opts?.sidebarText || (mode === "light" ? "#020617" : "#e5e7eb");
  const topbarBg = opts?.topbarBg || (mode === "light" ? "#ffffff" : "#1e293b");
  const topbarText = opts?.topbarText || (mode === "light" ? "#020617" : "#f1f5f9");

  const appShellProps: AppShellProps = {
    children: content,
    title,
    user: opts?.user,
    siteName,
    themeMode: mode,
    themePrimary: primary,
    sidebarBg,
    sidebarText,
    topbarBg,
    topbarText,
    showSidebar: opts?.showSidebar ?? true
  };

  const shell = AppShell(appShellProps);

  // Get all styles
  const baseStyles = getBaseStyles(mode, primary);
  const commonStyles = getCommonStyles();
  const layoutStyles = getLayoutStyles();
  const layoutScript = getLayoutScript();

  return `<!doctype html>
<html lang="en" data-theme="${mode}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="theme-color" content="${primary}" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="${siteName}" />
  <meta name="description" content="Professional gaming e-commerce platform" />
  <meta name="keywords" content="gaming, ecommerce, store, marketplace" />
  
  <!-- Preconnect to improve performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'><path d='M12 2L2 7l10 5 10-5M2 17l10 5 10-5M2 12l10 5 10-5'/></svg>" />
  
  <style>
    /* Base Styles */
    ${baseStyles}
    
    /* Common Component Styles */
    ${commonStyles}
    
    /* Layout System */
    ${layoutStyles}
    
    /* Custom Theme Variables */
    :root {
      --sidebar-bg: ${sidebarBg};
      --sidebar-text: ${sidebarText};
      --topbar-bg: ${topbarBg};
      --topbar-text: ${topbarText};
      --color-primary: ${primary};
      --color-primary-rgb: ${hexToRgb(primary)};
      --color-card-bg-rgb: ${mode === 'light' ? '248, 250, 252' : '30, 41, 59'};
    }
    
    /* Performance Optimizations */
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
      color: var(--color-text);
      background: var(--color-bg);
      overflow-x: hidden;
    }
    
    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
    
    /* GPU acceleration for smooth animations */
    .gpu-accelerated {
      transform: translateZ(0);
      will-change: transform;
    }
    
    /* Loading animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    
    /* Button loading state */
    .btn.loading {
      position: relative;
      color: transparent !important;
      pointer-events: none;
    }
    
    .btn.loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid currentColor;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Focus styles for accessibility */
    *:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      :root {
        --color-border: ButtonText;
        --color-muted: GrayText;
      }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    
    /* Print styles */
    @media print {
      .mobile-top-bar,
      .desktop-top-bar,
      .mobile-sidebar,
      .desktop-sidebar,
      .mobile-bottom-nav,
      .sidebar-overlay {
        display: none !important;
      }
      
      .main-content {
        margin: 0 !important;
        height: auto !important;
      }
      
      .content-wrapper {
        padding: 0 !important;
      }
    }
  </style>
</head>
<body>
  ${shell}
  
  <script>
    ${layoutScript}
  </script>
  
  <!-- Service Worker Registration (for PWA) -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
          .then(function(registration) {
            console.log('SW registered: ', registration);
          })
          .catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  </script>
</body>
</html>`;
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '34, 197, 94'; // Default to green
}

// Legacy layout function for backward compatibility
export function layout(title: string, body: string, opts?: LayoutOptions): string {
  // Convert old options to new format
  const modernOpts: ModernLayoutOptions = {
    title,
    siteName: opts?.siteName,
    themeMode: opts?.themeMode,
    themePrimary: opts?.themePrimary,
    sidebarBg: opts?.sidebarBg,
    sidebarText: opts?.sidebarText,
    topbarBg: opts?.topbarBg,
    topbarText: opts?.topbarText,
    user: opts?.userName ? {
      name: opts.userName,
      email: (opts as any)?.userEmail,
      avatar_url: opts?.userAvatarUrl || undefined,
      role: (opts as any)?.userRole
    } : undefined,
    showSidebar: opts?.showSidebarToggle
  };

  return modernLayout(title, body, modernOpts);
}
