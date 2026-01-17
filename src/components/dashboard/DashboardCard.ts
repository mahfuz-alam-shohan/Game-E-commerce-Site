// src/components/dashboard/DashboardCard.ts
export interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  status: 'complete' | 'ready' | 'coming-soon';
  actionText: string;
  actionUrl: string;
  disabled?: boolean;
}

export function DashboardCard(props: DashboardCardProps): string {
  const { title, description, icon, status, actionText, actionUrl, disabled = false } = props;

  const statusConfig = {
    complete: { color: '#22c55e', icon: '✓', label: 'Complete' },
    ready: { color: '#3b82f6', icon: '⚡', label: 'Ready' },
    'coming-soon': { color: '#64748b', icon: '⏱', label: 'Coming Soon' }
  };

  const config = statusConfig[status];

  return `
    <div class="dashboard-card ${status}">
      <div class="card-icon">
        ${icon}
      </div>
      <div class="card-content">
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${description}</p>
        <div class="card-status ${status}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${getStatusIcon(status)}
          </svg>
          ${config.label}
        </div>
        <a href="${actionUrl}" class="card-action ${disabled ? 'disabled' : ''}">${actionText}</a>
      </div>
    </div>

    <style>
      .dashboard-card {
        background: var(--color-card-bg);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 16px;
        padding: 24px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }
      
      .dashboard-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: ${config.color};
        transform: scaleX(0);
        transition: transform 0.3s ease;
        transform-origin: left;
      }
      
      .dashboard-card:hover {
        transform: translateY(-4px);
        border-color: rgba(148, 163, 184, 0.2);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      }
      
      .dashboard-card:hover::before {
        transform: scaleX(1);
      }
      
      .dashboard-card.coming-soon {
        opacity: 0.7;
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
        transition: all 0.3s ease;
      }
      
      .dashboard-card:hover .card-icon {
        transform: scale(1.05);
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.1));
      }
      
      .dashboard-card .card-content {
        flex: 1;
      }
      
      .dashboard-card .card-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--color-text);
        transition: color 0.2s ease;
      }
      
      .dashboard-card:hover .card-title {
        color: var(--color-primary);
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
        color: ${config.color};
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
        position: relative;
      }
      
      .card-action::after {
        content: '→';
        opacity: 0;
        transform: translateX(-4px);
        transition: all 0.2s ease;
      }
      
      .card-action:hover:not(.disabled) {
        gap: 10px;
        color: #16a34a;
      }
      
      .card-action:hover:not(.disabled)::after {
        opacity: 1;
        transform: translateX(0);
      }
      
      .card-action.disabled {
        color: var(--color-muted);
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      @media (max-width: 768px) {
        .dashboard-card {
          padding: 20px;
        }
        
        .dashboard-card:hover {
          transform: translateY(-2px);
        }
      }
    </style>
  `;
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'complete':
      return '<path d="M22 11.08V12a10 10 0 1 1 0-10 10h-4"/><polyline points="22,4 12,15.46 11,13"/>';
    case 'ready':
      return '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>';
    case 'coming-soon':
      return '<circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>';
    default:
      return '';
  }
}
