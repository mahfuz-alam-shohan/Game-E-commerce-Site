// src/pages/dashboard/home.ts
import { DashboardWelcome } from "../../components/dashboard/DashboardWelcome";
import { DashboardCard } from "../../components/dashboard/DashboardCard";
import { DashboardStats } from "../../components/dashboard/DashboardStats";

export function DashboardHomePage() {
  const welcome = DashboardWelcome({ siteName: "GameStore", userName: "Admin" });
  
  const cards = [
    DashboardCard({
      title: "Site Setup",
      description: "Configure your store name, logo, and basic settings",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5"/>
        <path d="M2 17l10-5 10 5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>`,
      status: "complete",
      actionText: "Configure",
      actionUrl: "/admin/settings/identity"
    }),
    DashboardCard({
      title: "Categories",
      description: "Manage product categories and organization",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6m-6 4h6"/>
      </svg>`,
      status: "ready",
      actionText: "Manage",
      actionUrl: "/admin/categories"
    }),
    DashboardCard({
      title: "Media Library",
      description: "Upload and manage images, files, and assets",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="M22 12v-1a4 4 0 0 0-3-3.87M16 11.37A4 4 0 0 0 12.63 8"/>
      </svg>`,
      status: "coming-soon",
      actionText: "Browse",
      actionUrl: "/admin/media",
      disabled: true
    })
  ];

  const stats = DashboardStats({
    stats: {
      products: 0,
      categories: 0,
      orders: 0,
      users: 1
    }
  });

  return `
    <div class="dashboard-home">
      ${welcome}
      
      <div class="dashboard-grid">
        ${cards.join('')}
      </div>

      ${stats}
    </div>

    <style>
      .dashboard-home {
        max-width: 100%;
      }
      
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
        margin-bottom: 48px;
      }

      @media (max-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
      }
    </style>
  `;
}
