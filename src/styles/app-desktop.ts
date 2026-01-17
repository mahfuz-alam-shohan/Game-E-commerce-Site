// src/styles/app-desktop.ts
export function getDesktopAppStyles(): string {
  return `
    /* Desktop App Experience */
    @media (min-width: 769px) {
      /* App Shell */
      .app-shell {
        display: flex;
        min-height: calc(100vh - 58px);
        width: 100%;
        background: var(--color-bg);
      }

      /* Desktop Sidebar */
      .app-sidebar-desktop {
        width: 280px;
        background: var(--sidebar-bg);
        border-right: 1px solid rgba(148, 163, 184, 0.1);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .app-sidebar-desktop:hover {
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      }

      /* Collapsible Sidebar */
      .app-sidebar-desktop.collapsed {
        width: 80px;
      }

      .app-sidebar-desktop.collapsed .sidebar-logo-text,
      .app-sidebar-desktop.collapsed .sidebar-subtitle,
      .app-sidebar-desktop.collapsed .sidebar-menu-item-text,
      .app-sidebar-desktop.collapsed .sidebar-footer-item span {
        display: none;
      }

      .app-sidebar-desktop.collapsed .sidebar-menu-item {
        justify-content: center;
        padding: 12px;
      }

      .app-sidebar-desktop.collapsed .sidebar-menu-group-title {
        text-align: center;
        font-size: 10px;
      }

      /* Desktop Main Content */
      .app-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        background: var(--color-bg);
        transition: all 0.3s ease;
      }

      .app-main-content {
        padding: 32px 32px 40px;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
      }

      /* Desktop Header */
      .desktop-header {
        height: 58px;
        background: var(--color-card-bg);
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        position: sticky;
        top: 0;
        z-index: 50;
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
      }

      .user-avatar:hover {
        transform: scale(1.05);
        border-color: var(--color-primary);
      }

      /* Desktop Cards */
      .card {
        border-radius: 16px;
        background: var(--color-card-bg);
        border: 1px solid rgba(148, 163, 184, 0.1);
        padding: 24px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary), transparent);
        transform: scaleX(0);
        transition: transform 0.3s ease;
        transform-origin: left;
      }

      .card:hover {
        transform: translateY(-4px);
        border-color: rgba(148, 163, 184, 0.2);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      }

      .card:hover::before {
        transform: scaleX(1);
      }

      /* Desktop Tables */
      .table-container {
        background: var(--color-card-bg);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 12px;
        overflow: hidden;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      thead {
        background: rgba(148, 163, 184, 0.05);
      }

      th {
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--color-muted);
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      }

      td {
        padding: 16px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.05);
        font-size: 14px;
      }

      tbody tr:hover {
        background: rgba(148, 163, 184, 0.05);
      }

      /* Desktop Forms */
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
      }

      .field {
        margin-bottom: 20px;
      }

      .field label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--color-text);
      }

      .field input,
      .field select,
      .field textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 8px;
        background: var(--color-bg);
        color: var(--color-text);
        font-size: 14px;
        transition: all 0.2s ease;
      }

      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
      }

      /* Desktop Buttons */
      .btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        position: relative;
        overflow: hidden;
      }

      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }

      .btn:hover::before {
        left: 100%;
      }

      .btn-primary {
        background: var(--color-primary);
        color: white;
      }

      .btn-primary:hover {
        background: #16a34a;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
      }

      .btn-secondary {
        background: rgba(148, 163, 184, 0.1);
        color: var(--color-text);
        border: 1px solid rgba(148, 163, 184, 0.2);
      }

      .btn-secondary:hover {
        background: rgba(148, 163, 184, 0.2);
        transform: translateY(-2px);
      }

      /* Desktop Animations */
      .fade-in {
        animation: fadeIn 0.3s ease-out;
      }

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

      /* GPU acceleration for smooth animations */
      .gpu-accelerated {
        transform: translateZ(0);
        will-change: transform;
      }

      /* Focus styles for accessibility */
      .focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      /* Loading states */
      .loading {
        position: relative;
        overflow: hidden;
      }

      .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: loading 1.5s infinite;
      }

      @keyframes loading {
        0% {
          left: -100%;
        }
        100% {
          left: 100%;
        }
      }
    }

    /* Large desktop screens */
    @media (min-width: 1400px) {
      .app-main-content {
        max-width: 1600px;
      }

      .search-bar {
        width: 400px;
      }
    }
  `;
}
