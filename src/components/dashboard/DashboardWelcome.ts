// src/components/dashboard/DashboardWelcome.ts
export interface DashboardWelcomeProps {
  siteName?: string;
  userName?: string;
}

export function DashboardWelcome(props: DashboardWelcomeProps): string {
  const { siteName = "GameStore", userName = "Admin" } = props;

  return `
    <div class="dashboard-welcome">
      <div class="welcome-header">
        <div class="welcome-icon">🎮</div>
        <div class="welcome-content">
          <h1 class="welcome-title">Welcome to ${siteName} Admin</h1>
          <p class="welcome-subtitle">Your gaming e-commerce platform is ready to configure</p>
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
        transition: all 0.3s ease;
      }
      
      .welcome-header:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
      }
      
      .welcome-icon {
        font-size: 48px;
        line-height: 1;
        animation: float 3s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .welcome-content {
        flex: 1;
      }
      
      .welcome-title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 8px 0;
        color: var(--color-text);
        background: linear-gradient(135deg, var(--color-text), var(--color-primary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .welcome-subtitle {
        font-size: 16px;
        color: var(--color-muted);
        margin: 0;
        line-height: 1.5;
      }
      
      @media (max-width: 768px) {
        .welcome-header {
          flex-direction: column;
          text-align: center;
          gap: 16px;
          padding: 24px;
        }
        
        .welcome-title {
          font-size: 24px;
        }
        
        .welcome-subtitle {
          font-size: 14px;
        }
      }
    </style>
  `;
}
