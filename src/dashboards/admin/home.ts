// src/dashboards/admin/home.ts

export function adminHomeView() {
  return `
    <div class="page">
      <div class="dashboard-welcome">
        <div class="welcome-header">
          <div class="welcome-icon">🎮</div>
          <div class="welcome-content">
            <h1 class="welcome-title">Welcome to GameStore Admin</h1>
            <p class="welcome-subtitle">Your gaming e-commerce platform is ready to configure</p>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5"/>
              <path d="M2 17l10-5 10 5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">Site Setup</h3>
            <p class="card-description">Configure your store name, logo, and basic settings</p>
            <div class="card-status complete">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1 0-10 10h-4"/>
                <polyline points="22,4 12,15.46 11,13"/>
              </svg>
              Complete
            </div>
            <a href="/admin/settings/identity" class="card-action">Configure</a>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 9h6m-6 4h6"/>
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">Categories</h3>
            <p class="card-description">Manage product categories and organization</p>
            <div class="card-status ready">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              Ready
            </div>
            <a href="/admin/categories" class="card-action">Manage</a>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="M22 12v-1a4 4 0 0 0-3-3.87M16 11.37A4 4 0 0 0 12.63 8"/>
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">Media Library</h3>
            <p class="card-description">Upload and manage images, files, and assets</p>
            <div class="card-status coming-soon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              Coming Soon
            </div>
            <a href="/admin/media" class="card-action disabled">Browse</a>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">Products</h3>
            <p class="card-description">Add and manage your gaming products and services</p>
            <div class="card-status coming-soon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              Coming Soon
            </div>
            <a href="#" class="card-action disabled">Manage</a>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20m9-9H3"/>
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">Analytics</h3>
            <p class="card-description">Track sales, visitors, and performance metrics</p>
            <div class="card-status coming-soon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              Coming Soon
            </div>
            <a href="#" class="card-action disabled">View</a>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="M22 12v-1a4 4 0 0 0-3-3.87M16 11.37A4 4 0 0 0 12.63 8"/>
            </svg>
          </div>
          <div class="card-content">
            <h3 class="card-title">Orders</h3>
            <p class="card-description">Process customer orders and manage fulfillment</p>
            <div class="card-status coming-soon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              Coming Soon
            </div>
            <a href="#" class="card-action disabled">Process</a>
          </div>
        </div>
      </div>

      <div class="dashboard-footer">
        <div class="footer-card">
          <h3>Quick Stats</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">Products</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">Categories</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">Orders</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">1</div>
              <div class="stat-label">Admin Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .dashboard-welcome {
        margin-bottom: 48px;
      }
      
      .welcome-header {
        display: flex;
        align-items: center;
        gap: 24px;
        padding: 32px;
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
        border-radius: 16px;
        border: 1px solid rgba(34, 197, 94, 0.2);
      }
      
      .welcome-icon {
        font-size: 48px;
        line-height: 1;
      }
      
      .welcome-content {
        flex: 1;
      }
      
      .welcome-title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 8px 0;
        color: var(--color-text);
      }
      
      .welcome-subtitle {
        font-size: 16px;
        color: var(--color-muted);
        margin: 0;
        line-height: 1.5;
      }
      
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
        margin-bottom: 48px;
      }
      
      .dashboard-card {
        background: var(--color-card-bg);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 16px;
        padding: 24px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .dashboard-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--color-primary), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .dashboard-card:hover {
        transform: translateY(-4px);
        border-color: rgba(148, 163, 184, 0.2);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      }
      
      .dashboard-card:hover::before {
        opacity: 1;
      }
      
      .dashboard-card .card-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        color: var(--color-primary);
      }
      
      .dashboard-card .card-content {
        flex: 1;
      }
      
      .dashboard-card .card-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--color-text);
      }
      
      .dashboard-card .card-description {
        font-size: 14px;
        color: var(--color-muted);
        line-height: 1.5;
        margin: 0 0 16px 0;
      }
      
      .card-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      
      .card-status.complete {
        color: #22c55e;
      }
      
      .card-status.ready {
        color: #3b82f6;
      }
      
      .card-status.coming-soon {
        color: #64748b;
      }
      
      .card-action {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.2s ease;
      }
      
      .card-action:hover:not(.disabled) {
        gap: 10px;
        color: #16a34a;
      }
      
      .card-action.disabled {
        color: var(--color-muted);
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .dashboard-footer {
        display: flex;
        gap: 24px;
      }
      
      .footer-card {
        flex: 1;
        background: var(--color-card-bg);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 16px;
        padding: 24px;
      }
      
      .footer-card h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 20px 0;
        color: var(--color-text);
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 20px;
      }
      
      .stat-item {
        text-align: center;
      }
      
      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: 4px;
      }
      
      .stat-label {
        font-size: 12px;
        color: var(--color-muted);
        font-weight: 500;
      }
      
      @media (max-width: 768px) {
        .welcome-header {
          flex-direction: column;
          text-align: center;
          gap: 16px;
        }
        
        .dashboard-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        .dashboard-footer {
          flex-direction: column;
        }
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    </style>
  `;
}
