// src/styles/layout.ts
export function getLayoutStyles(): string {
  return `
    /* ===== APP LAYOUT SYSTEM ===== */
    
    /* Root Variables */
    :root {
      --app-height: 100vh;
      --mobile-top-bar-height: 56px;
      --mobile-bottom-nav-height: 60px;
      --desktop-top-bar-height: 58px;
      --desktop-sidebar-width: 280px;
      --desktop-sidebar-collapsed-width: 80px;
    }

    /* App Container - Fixed Height */
    .app-container {
      height: 100vh;
      height: var(--app-height);
      width: 100vw;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      background: var(--color-bg);
    }

    /* ===== MOBILE LAYOUT ===== */
    
    /* Mobile Top Bar - Fixed */
    .mobile-top-bar {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--mobile-top-bar-height);
      background: var(--color-card-bg);
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      z-index: 100;
      backdrop-filter: blur(10px);
    }

    .mobile-menu-toggle {
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--color-text);
    }

    .mobile-menu-toggle:hover {
      background: rgba(148, 163, 184, 0.1);
      transform: scale(1.05);
    }

    .mobile-menu-toggle:active {
      transform: scale(0.95);
    }

    .mobile-logo {
      font-size: 18px;
      font-weight: 700;
      color: var(--color-text);
    }

    .mobile-user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .mobile-user-avatar:hover {
      transform: scale(1.05);
    }

    .mobile-user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Mobile Sidebar - Overlay */
    .mobile-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 280px;
      background: var(--sidebar-bg);
      z-index: 200;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .mobile-sidebar.active {
      transform: translateX(0);
    }

    .mobile-sidebar-header {
      padding: 20px 16px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    }

    .mobile-sidebar-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .logo-icon {
      font-size: 24px;
      line-height: 1;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 700;
      color: var(--sidebar-text);
    }

    .mobile-sidebar-user {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .mobile-sidebar-user .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
    }

    .mobile-sidebar-user .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info {
      flex: 1;
    }

    .user-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--sidebar-text);
      margin-bottom: 2px;
    }

    .user-role {
      font-size: 12px;
      color: var(--sidebar-text);
      opacity: 0.7;
    }

    .mobile-sidebar-nav {
      padding: 16px 0;
    }

    .nav-group {
      margin-bottom: 24px;
    }

    .nav-group:last-child {
      margin-bottom: 0;
    }

    .nav-group-title {
      font-size: 11px;
      font-weight: 600;
      color: var(--sidebar-text);
      opacity: 0.5;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 16px 8px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: var(--sidebar-text);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      position: relative;
    }

    .nav-item:hover {
      background: rgba(148, 163, 184, 0.1);
      color: var(--sidebar-text);
    }

    .nav-item.active {
      background: rgba(34, 197, 94, 0.1);
      color: var(--color-primary);
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--color-primary);
    }

    /* Mobile Bottom Navigation - Fixed */
    .mobile-bottom-nav {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--mobile-bottom-nav-height);
      background: var(--color-card-bg);
      border-top: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 100;
      padding: 0 16px;
      backdrop-filter: blur(10px);
    }

    .mobile-bottom-nav .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--color-muted);
      font-size: 10px;
      font-weight: 500;
      transition: all 0.2s ease;
      min-width: 44px;
      min-height: 44px;
      justify-content: center;
    }

    .mobile-bottom-nav .nav-item.active {
      color: var(--color-primary);
      background: rgba(34, 197, 94, 0.1);
    }

    .mobile-bottom-nav .nav-item:hover {
      transform: translateY(-2px);
    }

    .mobile-bottom-nav .nav-item svg {
      width: 20px;
      height: 20px;
    }

    /* Main Content - Scrollable */
    .main-content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      margin-top: var(--mobile-top-bar-height);
      margin-bottom: var(--mobile-bottom-nav-height);
      height: calc(100vh - var(--mobile-top-bar-height) - var(--mobile-bottom-nav-height));
    }

    .content-wrapper {
      padding: 16px;
      min-height: 100%;
    }

    /* ===== DESKTOP LAYOUT ===== */
    
    /* Desktop Top Bar - Fixed */
    .desktop-top-bar {
      display: none;
      height: var(--desktop-top-bar-height);
      background: var(--color-card-bg);
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 100;
      position: sticky;
      top: 0;
      backdrop-filter: blur(10px);
    }

    .desktop-header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .sidebar-toggle {
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--color-text);
    }

    .sidebar-toggle:hover {
      background: rgba(148, 163, 184, 0.1);
      transform: scale(1.05);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--color-muted);
    }

    .breadcrumb-item {
      color: var(--color-muted);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .breadcrumb-item:hover {
      color: var(--color-text);
    }

    .breadcrumb-separator {
      color: var(--color-muted);
      opacity: 0.5;
    }

    .breadcrumb-current {
      color: var(--color-text);
      font-weight: 500;
    }

    .desktop-header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .search-bar {
      position: relative;
      width: 300px;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px 8px 36px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 8px;
      background: var(--color-bg);
      color: var(--color-text);
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: var(--color-muted);
      pointer-events: none;
    }

    .notification-bell {
      position: relative;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--color-text);
    }

    .notification-bell:hover {
      background: rgba(148, 163, 184, 0.1);
      transform: scale(1.05);
    }

    .notification-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid var(--color-card-bg);
    }

    .user-menu {
      position: relative;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px solid transparent;
      overflow: hidden;
    }

    .user-avatar:hover {
      transform: scale(1.05);
      border-color: var(--color-primary);
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Desktop Sidebar - Fixed */
    .desktop-sidebar {
      display: none;
      width: var(--desktop-sidebar-width);
      background: var(--sidebar-bg);
      border-right: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: var(--desktop-top-bar-height);
      left: 0;
      bottom: 0;
      z-index: 50;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .desktop-sidebar.collapsed {
      width: var(--desktop-sidebar-collapsed-width);
    }

    .desktop-sidebar-header {
      padding: 24px 20px 20px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .sidebar-logo .logo-text {
      font-size: 18px;
      font-weight: 700;
      color: var(--sidebar-text);
    }

    .user-role-badge {
      font-size: 11px;
      font-weight: 600;
      color: var(--sidebar-text);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      background: rgba(100, 116, 139, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
    }

    .desktop-sidebar-nav {
      flex: 1;
      padding: 20px 16px;
      overflow-y: auto;
    }

    .nav-text {
      flex: 1;
    }

    .desktop-sidebar.collapsed .nav-text,
    .desktop-sidebar.collapsed .sidebar-logo .logo-text,
    .desktop-sidebar.collapsed .user-role-badge {
      display: none;
    }

    .desktop-sidebar.collapsed .nav-item {
      justify-content: center;
      padding: 12px;
    }

    .desktop-sidebar.collapsed .nav-group-title {
      text-align: center;
      font-size: 10px;
    }

    .desktop-sidebar-footer {
      padding: 16px 20px 24px;
      border-top: 1px solid rgba(148, 163, 184, 0.1);
    }

    .footer-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--sidebar-text);
      opacity: 0.6;
      font-weight: 500;
    }

    .footer-item svg {
      flex-shrink: 0;
    }

    .desktop-sidebar.collapsed .footer-item span {
      display: none;
    }

    /* Desktop Main Content - Scrollable */
    @media (min-width: 769px) {
      .main-content {
        margin-left: var(--desktop-sidebar-width);
        margin-top: var(--desktop-top-bar-height);
        margin-bottom: 0;
        height: calc(100vh - var(--desktop-top-bar-height));
        transition: margin-left 0.3s ease;
      }

      .desktop-sidebar.collapsed ~ .main-content {
        margin-left: var(--desktop-sidebar-collapsed-width);
      }

      .content-wrapper {
        padding: 32px;
        max-width: 1400px;
        margin: 0 auto;
      }
    }

    /* ===== OVERLAY ===== */
    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 150;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .sidebar-overlay.active {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }

    /* ===== RESPONSIVE BREAKPOINTS ===== */
    
    /* Mobile Styles */
    @media (max-width: 768px) {
      .mobile-top-bar,
      .mobile-bottom-nav {
        display: flex;
      }

      .desktop-top-bar,
      .desktop-sidebar {
        display: none !important;
      }

      .main-content {
        margin-left: 0;
      }

      .content-wrapper {
        padding: 16px;
      }
    }

    /* Tablet Styles */
    @media (min-width: 769px) and (max-width: 1024px) {
      .mobile-top-bar,
      .mobile-bottom-nav {
        display: none !important;
      }

      .desktop-top-bar,
      .desktop-sidebar {
        display: flex;
      }

      .content-wrapper {
        padding: 24px;
      }
    }

    /* Desktop Styles */
    @media (min-width: 1025px) {
      .mobile-top-bar,
      .mobile-bottom-nav {
        display: none !important;
      }

      .desktop-top-bar,
      .desktop-sidebar {
        display: flex;
      }
    }

    /* ===== ACCESSIBILITY ===== */
    
    /* Focus styles */
    .nav-item:focus-visible,
    .mobile-menu-toggle:focus-visible,
    .sidebar-toggle:focus-visible,
    .notification-bell:focus-visible,
    .user-avatar:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .mobile-sidebar,
      .sidebar-overlay,
      .main-content {
        transition: none;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .mobile-top-bar,
      .desktop-top-bar,
      .mobile-sidebar,
      .desktop-sidebar {
        border-color: ButtonText;
      }
    }
  `;
}
