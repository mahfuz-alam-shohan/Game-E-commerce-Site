// src/components/dashboard/DashboardStats.ts
export interface DashboardStatsProps {
  stats: {
    products: number;
    categories: number;
    orders: number;
    users: number;
  };
}

export function DashboardStats(props: DashboardStatsProps): string {
  const { stats } = props;

  return `
    <div class="dashboard-footer">
      <div class="footer-card">
        <h3>Quick Stats</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">${stats.products}</div>
            <div class="stat-label">Products</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.categories}</div>
            <div class="stat-label">Categories</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.orders}</div>
            <div class="stat-label">Orders</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${stats.users}</div>
            <div class="stat-label">Admin Users</div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .dashboard-footer {
        display: flex;
        gap: 24px;
        margin-top: 48px;
      }
      
      .footer-card {
        flex: 1;
        background: var(--color-card-bg);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 16px;
        padding: 24px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .footer-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-secondary, #8b5cf6));
        transform: scaleX(0);
        transition: transform 0.3s ease;
        transform-origin: left;
      }
      
      .footer-card:hover {
        transform: translateY(-2px);
        border-color: rgba(148, 163, 184, 0.2);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
      }
      
      .footer-card:hover::before {
        transform: scaleX(1);
      }
      
      .footer-card h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 20px 0;
        color: var(--color-text);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .footer-card h3::before {
        content: '📊';
        font-size: 18px;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 20px;
      }
      
      .stat-item {
        text-align: center;
        padding: 16px;
        border-radius: 12px;
        background: rgba(148, 163, 184, 0.05);
        transition: all 0.3s ease;
        border: 1px solid transparent;
      }
      
      .stat-item:hover {
        background: rgba(34, 197, 94, 0.05);
        border-color: rgba(34, 197, 94, 0.2);
        transform: translateY(-2px);
      }
      
      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: 4px;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .stat-item:hover .stat-value {
        transform: scale(1.05);
        color: #16a34a;
      }
      
      .stat-label {
        font-size: 12px;
        color: var(--color-muted);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      @media (max-width: 768px) {
        .dashboard-footer {
          flex-direction: column;
          gap: 16px;
        }
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .stat-item {
          padding: 12px;
        }
        
        .stat-value {
          font-size: 24px;
        }
      }
      
      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}
