// src/dashboards/admin/home.ts

export function adminHomeView() {
  return `
    <div class="page">
      <h1 class="page-title">Admin dashboard</h1>
      <p class="page-subtitle">
        NutterTools is installed. Use the sidebar to access management areas as they come online.
      </p>

      <div class="stack-md">
        <section class="card">
          <h2 class="card-title">Current status</h2>
          <p class="card-subtitle">
            Core setup (site details and first admin) is complete. Product, category and page-builder modules will be added on top of this base.
          </p>
          <div class="stack-sm">
            <p class="muted">What already works today:</p>
            <ul style="margin:0 0 6px 18px;font-size:13px;color:#d1d5db;">
              <li>First-run setup flow (site + admin account)</li>
              <li>Role-aware admin shell layout</li>
              <li>Responsive dashboard viewport</li>
            </ul>
            <p class="muted">Next modules will plug in here without changing this dashboard structure.</p>
          </div>
        </section>
      </div>
    </div>
  `;
}
