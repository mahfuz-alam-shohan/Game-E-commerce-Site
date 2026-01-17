// src/styles/app-mobile.ts
export function getMobileAppStyles(): string {
  return `
    /* Mobile App Experience */
    @media (max-width: 768px) {
      /* App Shell */
      .app-shell {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: var(--color-bg);
      }

      /* Mobile Navigation Bar */
      .mobile-nav-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: var(--color-card-bg);
        border-top: 1px solid rgba(148, 163, 184, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: 100;
        padding: 0 16px;
        backdrop-filter: blur(10px);
        background: rgba(var(--color-card-bg-rgb, 255, 255, 255), 0.95);
      }

      .mobile-nav-item {
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

      .mobile-nav-item.active {
        color: var(--color-primary);
        background: rgba(34, 197, 94, 0.1);
      }

      .mobile-nav-item:hover {
        transform: translateY(-2px);
      }

      .mobile-nav-item svg {
        width: 20px;
        height: 20px;
      }

      /* Mobile Top Bar */
      .mobile-top-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 56px;
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
      }

      .mobile-menu-toggle:hover {
        background: rgba(148, 163, 184, 0.1);
      }

      .mobile-menu-toggle svg {
        width: 20px;
        height: 20px;
        color: var(--color-text);
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
      }

      .mobile-user-avatar:hover {
        transform: scale(1.05);
      }

      /* Mobile Main Content */
      .app-main {
        flex: 1;
        margin-top: 56px;
        margin-bottom: 60px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      .app-main-content {
        padding: 16px;
        width: 100%;
      }

      /* Mobile Sidebar Overlay */
      .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 90;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .sidebar-overlay.active {
        opacity: 1;
        visibility: visible;
      }

      /* Mobile Sidebar */
      .app-sidebar-mobile {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 280px;
        background: var(--sidebar-bg);
        z-index: 95;
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      .app-sidebar-mobile.active {
        transform: translateX(0);
      }

      /* Mobile Cards */
      .card {
        border-radius: 12px;
        margin-bottom: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      /* Mobile Forms */
      .field {
        margin-bottom: 16px;
      }

      .field label {
        font-size: 14px;
        margin-bottom: 6px;
      }

      .field input,
      .field select,
      .field textarea {
        font-size: 16px; /* Prevents zoom on iOS */
        padding: 12px;
      }

      /* Mobile Buttons */
      .btn {
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 8px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      /* Mobile Tables */
      table {
        font-size: 14px;
      }

      .table-responsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      /* Mobile Animations */
      .slide-up {
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      /* Touch-friendly targets */
      .clickable {
        min-height: 44px;
        min-width: 44px;
      }

      /* Safe area insets for notched phones */
      .safe-area-top {
        padding-top: env(safe-area-inset-top);
      }

      .safe-area-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }

      /* Mobile performance optimizations */
      .gpu-accelerated {
        transform: translateZ(0);
        will-change: transform;
      }

      /* Pull-to-refresh indicator */
      .pull-to-refresh {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-muted);
        font-size: 12px;
      }
    }

    /* Tablet styles */
    @media (min-width: 769px) and (max-width: 1024px) {
      .app-main-content {
        padding: 24px;
      }

      .mobile-nav-bar,
      .mobile-top-bar {
        display: none;
      }
    }
  `;
}
