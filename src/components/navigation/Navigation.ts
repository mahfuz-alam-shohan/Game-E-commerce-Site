// src/components/navigation/Navigation.ts
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
}

export interface NavigationProps {
  items: NavigationItem[];
  variant?: 'header' | 'sidebar' | 'mobile';
  user?: {
    name: string;
    avatar?: string;
  };
}

export function Navigation(props: NavigationProps): string {
  const { items, variant = 'header', user } = props;

  const renderItem = (item: NavigationItem, level: number = 0): string => {
    const hasChildren = item.children && item.children.length > 0;
    
    return `
      <li class="nav-item ${level > 0 ? 'nav-item-sub' : ''}">
        <a href="${item.href}" class="nav-link ${hasChildren ? 'nav-link-dropdown' : ''}">
          ${item.icon ? `<span class="nav-icon">${item.icon}</span>` : ''}
          <span class="nav-text">${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          ${hasChildren ? `
            <svg class="nav-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          ` : ''}
        </a>
        ${hasChildren ? `
          <ul class="nav-dropdown">
            ${item.children?.map(child => renderItem(child, level + 1)).join('')}
          </ul>
        ` : ''}
      </li>
    `;
  };

  const baseClasses = {
    header: 'nav-header',
    sidebar: 'nav-sidebar',
    mobile: 'nav-mobile'
  };

  return `
    <nav class="${baseClasses[variant]}">
      <ul class="nav-list">
        ${items.map(item => renderItem(item)).join('')}
      </ul>
      ${user && variant === 'header' ? `
        <div class="nav-user">
          <div class="user-avatar">
            ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" />` : user.name.charAt(0).toUpperCase()}
          </div>
          <span class="user-name">${user.name}</span>
          <svg class="user-dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </div>
      ` : ''}
    </nav>

    <style>
      .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-4) var(--space-6);
        background: white;
        border-bottom: 1px solid var(--gray-200);
        position: sticky;
        top: 0;
        z-index: var(--z-sticky);
      }

      .nav-list {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);
        color: var(--gray-700);
        text-decoration: none;
        border-radius: var(--radius);
        font-weight: 500;
        transition: all var(--transition);
        position: relative;
      }

      .nav-link:hover {
        background: var(--gray-100);
        color: var(--primary);
      }

      .nav-link:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }

      .nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }

      .nav-badge {
        background: var(--error);
        color: white;
        font-size: var(--text-xs);
        font-weight: 600;
        padding: 2px 6px;
        border-radius: var(--radius-full);
        margin-left: var(--space-2);
      }

      .nav-dropdown-icon {
        margin-left: var(--space-1);
        transition: transform var(--transition);
      }

      .nav-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        min-width: 200px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all var(--transition);
        z-index: var(--z-dropdown);
        list-style: none;
        padding: var(--space-2);
        margin: 0;
      }

      .nav-link-dropdown:hover .nav-dropdown,
      .nav-link-dropdown:focus-within .nav-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .nav-item-sub .nav-link {
        padding: var(--space-2) var(--space-3);
        font-size: var(--text-sm);
      }

      .nav-user {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius);
        cursor: pointer;
        transition: background var(--transition);
      }

      .nav-user:hover {
        background: var(--gray-100);
      }

      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-full);
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: var(--text-sm);
        overflow: hidden;
      }

      .user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .user-name {
        font-weight: 500;
        color: var(--gray-700);
      }

      /* Mobile Navigation */
      .nav-mobile {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid var(--gray-200);
        z-index: var(--z-fixed);
        padding: var(--space-2) var(--space-4) env(safe-area-inset-bottom, var(--space-2));
      }

      .nav-mobile .nav-list {
        justify-content: space-around;
        gap: 0;
      }

      .nav-mobile .nav-link {
        flex-direction: column;
        gap: var(--space-1);
        padding: var(--space-3);
        min-width: 60px;
        text-align: center;
        font-size: var(--text-xs);
      }

      .nav-mobile .nav-icon {
        width: 24px;
        height: 24px;
      }

      .nav-mobile .nav-text {
        display: block;
      }

      /* Sidebar Navigation */
      .nav-sidebar {
        width: 280px;
        background: white;
        border-right: 1px solid var(--gray-200);
        height: 100vh;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      .nav-sidebar .nav-list {
        flex-direction: column;
        gap: 0;
        padding: var(--space-4);
      }

      .nav-sidebar .nav-item {
        width: 100%;
      }

      .nav-sidebar .nav-link {
        width: 100%;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-md);
      }

      .nav-sidebar .nav-link:hover {
        background: var(--gray-100);
      }

      .nav-sidebar .nav-link.active {
        background: var(--primary);
        color: white;
      }

      .nav-sidebar .nav-dropdown {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        border: none;
        background: var(--gray-50);
        margin-top: var(--space-2);
        margin-left: var(--space-6);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .nav-header {
          padding: var(--space-3) var(--space-4);
        }

        .nav-header .nav-list {
          display: none;
        }

        .nav-sidebar {
          transform: translateX(-100%);
          transition: transform var(--transition-slow);
        }

        .nav-sidebar.open {
          transform: translateX(0);
        }
      }

      @media (min-width: 769px) {
        .nav-mobile {
          display: none;
        }
      }

      /* High Contrast */
      @media (prefers-contrast: high) {
        .nav-link {
          border: 1px solid transparent;
        }

        .nav-link:hover {
          border-color: var(--primary);
        }
      }

      /* Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        .nav-dropdown,
        .nav-sidebar {
          transition: none;
        }
      }
    </style>
  `;
}
