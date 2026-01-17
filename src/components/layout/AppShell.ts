// src/components/layout/AppShell.ts
export interface AppShellProps {
  children: string;
  title: string;
  user?: {
    name: string;
    email?: string;
    avatar_url?: string;
    role?: string;
  };
  siteName?: string;
  themeMode?: 'light' | 'dark';
  themePrimary?: string;
  sidebarBg?: string;
  sidebarText?: string;
  topbarBg?: string;
  topbarText?: string;
  showSidebar?: boolean;
}

export function AppShell(props: AppShellProps): string {
  const {
    children,
    title,
    user,
    siteName = "GameStore",
    themeMode = "dark",
    themePrimary = "#22c55e",
    sidebarBg,
    sidebarText,
    topbarBg,
    topbarText,
    showSidebar = true
  } = props;

  return `
    <div class="app-container" data-theme="${themeMode}">
      <!-- Mobile Top Bar -->
      <header class="mobile-top-bar">
        <button class="mobile-menu-toggle" id="mobile-menu-toggle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div class="mobile-logo">${siteName}</div>
        <div class="mobile-user-avatar">
          ${user?.avatar_url 
            ? `<img src="${user.avatar_url}" alt="${user.name}" />` 
            : user?.name?.charAt(0).toUpperCase() || 'U'
          }
        </div>
      </header>

      <!-- Desktop Top Bar -->
      <header class="desktop-top-bar">
        <div class="desktop-header-left">
          <button class="sidebar-toggle" id="sidebar-toggle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <nav class="breadcrumb">
            <a href="/admin" class="breadcrumb-item">Dashboard</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${title}</span>
          </nav>
        </div>
        <div class="desktop-header-right">
          <div class="search-bar">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="search" placeholder="Search..." class="search-input" />
          </div>
          <button class="notification-bell">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div class="notification-badge"></div>
          </button>
          <div class="user-menu">
            <div class="user-avatar">
              ${user?.avatar_url 
                ? `<img src="${user.avatar_url}" alt="${user.name}" />` 
                : user?.name?.charAt(0).toUpperCase() || 'U'
              }
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Sidebar -->
      <aside class="mobile-sidebar" id="mobile-sidebar">
        <div class="mobile-sidebar-header">
          <div class="mobile-sidebar-logo">
            <div class="logo-icon">🎮</div>
            <div class="logo-text">${siteName}</div>
          </div>
          ${user ? `
            <div class="mobile-sidebar-user">
              <div class="user-avatar">
                ${user.avatar_url 
                  ? `<img src="${user.avatar_url}" alt="${user.name}" />` 
                  : user.name.charAt(0).toUpperCase()
                }
              </div>
              <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-role">${user.role || 'Admin'}</div>
              </div>
            </div>
          ` : ''}
        </div>
        <nav class="mobile-sidebar-nav">
          <div class="nav-group">
            <div class="nav-group-title">Main</div>
            <a href="/admin" class="nav-item active">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              <span>Dashboard</span>
            </a>
            <a href="/admin/categories" class="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 9h6m-6 4h6"/>
              </svg>
              <span>Categories</span>
            </a>
            <a href="/admin/settings" class="nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 8.96l4.24 4.24M18.46 18.46l4.24 4.24M1.54 15.04l4.24 4.24"/>
              </svg>
              <span>Settings</span>
            </a>
          </div>
          ${user ? `
            <div class="nav-group">
              <div class="nav-group-title">Account</div>
              <a href="/auth/logout" class="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Sign Out</span>
              </a>
            </div>
          ` : `
            <div class="nav-group">
              <div class="nav-group-title">Account</div>
              <a href="/auth/login" class="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                <span>Sign In</span>
              </a>
            </div>
          `}
        </nav>
      </aside>

      <!-- Desktop Sidebar -->
      ${showSidebar ? `
        <aside class="desktop-sidebar" id="desktop-sidebar">
          <div class="desktop-sidebar-header">
            <div class="sidebar-logo">
              <div class="logo-icon">🎮</div>
              <div class="logo-text">${siteName}</div>
            </div>
            <div class="user-role-badge">${user?.role || 'Admin'}</div>
          </div>
          <nav class="desktop-sidebar-nav">
            <div class="nav-group">
              <div class="nav-group-title">Main</div>
              <a href="/admin" class="nav-item active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <span class="nav-text">Dashboard</span>
              </a>
              <a href="/admin/categories" class="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 9h6m-6 4h6"/>
                </svg>
                <span class="nav-text">Categories</span>
              </a>
              <a href="/admin/settings" class="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 8.96l4.24 4.24M18.46 18.46l4.24 4.24M1.54 15.04l4.24 4.24"/>
                </svg>
                <span class="nav-text">Settings</span>
              </a>
            </div>
          </nav>
          <div class="desktop-sidebar-footer">
            <div class="footer-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span>Last active: Just now</span>
            </div>
          </div>
        </aside>
      ` : ''}

      <!-- Main Content Area -->
      <main class="main-content">
        <div class="content-wrapper">
          ${children}
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="mobile-bottom-nav">
        <a href="/admin" class="nav-item active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          <span>Home</span>
        </a>
        <a href="/admin/categories" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 9h6m-6 4h6"/>
          </svg>
          <span>Cats</span>
        </a>
        <a href="/admin/settings" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 8.96l4.24 4.24M18.46 18.46l4.24 4.24M1.54 15.04l4.24 4.24"/>
          </svg>
          <span>Settings</span>
        </a>
      </nav>

      <!-- Overlay for mobile sidebar -->
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
    </div>
  `;
}
