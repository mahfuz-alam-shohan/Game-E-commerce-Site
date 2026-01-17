// src/lib/html.ts
// Re-export types from ui components for backward compatibility
import type { LayoutOptions } from "../ui/components/types";
export type { LayoutOptions };
import type { ThemeMode } from "../services/setupService";
import { renderMobileTopbar, renderDesktopTopbar } from "../ui/components/topbar";
import { escapeHtml } from "../ui/components/types";
import {
  getBaseStyles,
  getTopbarStyles,
  getSidebarStyles,
  getCommonStyles
} from "../ui/styles";
import { getMobileAppStyles } from "../styles/app-mobile";
import { getDesktopAppStyles } from "../styles/app-desktop";

export function layout(title: string, body: string, opts?: LayoutOptions): string {
  const siteName = opts?.siteName || "GameStore";
  const mode: ThemeMode = opts?.themeMode === "light" ? "light" : "dark";
  const primary = opts?.themePrimary || "#22c55e";
  const hasSidebar = !!opts?.showSidebarToggle;

  // Render mobile and desktop topbars separately
  const mobileTopbar = renderMobileTopbar({
    ...opts,
    siteName,
    hasSidebar,
    user: opts?.userName ? { name: opts.userName, avatar_url: opts.userAvatarUrl } : undefined
  });

  const desktopTopbar = renderDesktopTopbar({
    ...opts,
    siteName,
    hasSidebar,
    user: opts?.userName ? { name: opts.userName, avatar_url: opts.userAvatarUrl } : undefined
  });

  // Combine both topbars (CSS will handle showing/hiding based on viewport)
  const headerHtml = `${mobileTopbar}${desktopTopbar}`;

  const bodyClass = hasSidebar ? ' class="has-sidebar"' : "";

  // Get modular styles
  const baseStyles = getBaseStyles(mode, primary);
  const topbarStyles = getTopbarStyles(opts || {});
  const sidebarStyles = getSidebarStyles(opts || {});
  const commonStyles = getCommonStyles();
  const mobileAppStyles = getMobileAppStyles();
  const desktopAppStyles = getDesktopAppStyles();

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="${primary}" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="${siteName}" />
  <style>
    ${baseStyles}
    ${topbarStyles}
    ${sidebarStyles}
    ${commonStyles}
    ${mobileAppStyles}
    ${desktopAppStyles}
  </style>
</head>
<body${bodyClass}>
  ${headerHtml}
  <main>${body}</main>
  
  <!-- Mobile App Navigation -->
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  
  <!-- Enhanced Mobile App Script -->
  <script>
    (function() {
      // Mobile sidebar toggle
      var toggleBtn = document.querySelector(".topbar-toggle");
      var sidebarOverlay = document.getElementById("sidebar-overlay");
      var sidebar = document.querySelector(".app-sidebar-mobile");
      
      if (toggleBtn && sidebar && sidebarOverlay) {
        function openSidebar() {
          document.body.classList.add("sidebar-open");
          sidebar.classList.add("active");
          sidebarOverlay.classList.add("active");
          document.body.style.overflow = "hidden";
        }
        
        function closeSidebar() {
          document.body.classList.remove("sidebar-open");
          sidebar.classList.remove("active");
          sidebarOverlay.classList.remove("active");
          document.body.style.overflow = "";
        }
        
        toggleBtn.addEventListener("click", openSidebar);
        sidebarOverlay.addEventListener("click", closeSidebar);
        
        // Close sidebar on escape key
        document.addEventListener("keydown", function(e) {
          if (e.key === "Escape" && document.body.classList.contains("sidebar-open")) {
            closeSidebar();
          }
        });
      }
      
      // Mobile navigation active state
      var mobileNavItems = document.querySelectorAll(".mobile-nav-item");
      var currentPath = window.location.pathname;
      
      mobileNavItems.forEach(function(item) {
        if (item.getAttribute("href") === currentPath) {
          item.classList.add("active");
        }
      });
      
      // Pull-to-refresh simulation
      var startY = 0;
      var isPulling = false;
      var pullThreshold = 80;
      
      document.addEventListener("touchstart", function(e) {
        if (window.scrollY === 0) {
          startY = e.touches[0].clientY;
          isPulling = true;
        }
      });
      
      document.addEventListener("touchmove", function(e) {
        if (isPulling) {
          var currentY = e.touches[0].clientY;
          var pullDistance = currentY - startY;
          
          if (pullDistance > 0 && pullDistance < pullThreshold) {
            e.preventDefault();
            document.body.style.transform = "translateY(" + (pullDistance * 0.5) + "px)";
          }
        }
      });
      
      document.addEventListener("touchend", function() {
        if (isPulling) {
          document.body.style.transform = "";
          isPulling = false;
        }
      });
      
      // Desktop sidebar collapse functionality
      var desktopSidebar = document.querySelector(".app-sidebar-desktop");
      var sidebarToggle = document.querySelector(".sidebar-toggle");
      
      if (desktopSidebar && sidebarToggle) {
        sidebarToggle.addEventListener("click", function() {
          desktopSidebar.classList.toggle("collapsed");
          
          // Save preference
          localStorage.setItem("sidebar-collapsed", desktopSidebar.classList.contains("collapsed"));
        });
        
        // Restore preference
        var isCollapsed = localStorage.getItem("sidebar-collapsed") === "true";
        if (isCollapsed) {
          desktopSidebar.classList.add("collapsed");
        }
      }
      
      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener("click", function(e) {
          e.preventDefault();
          var target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
      
      // Add loading states to buttons
      document.querySelectorAll(".btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
          if (!this.classList.contains("disabled")) {
            this.classList.add("loading");
            setTimeout(() => this.classList.remove("loading"), 2000);
          }
        });
      });
      
      // Performance optimization: Intersection Observer for lazy animations
      if ("IntersectionObserver" in window) {
        var observerOptions = {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px"
        };
        
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in");
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        
        document.querySelectorAll(".dashboard-card, .card").forEach(function(el) {
          observer.observe(el);
        });
      }
    })();
  </script>
</body>
</html>`;
}