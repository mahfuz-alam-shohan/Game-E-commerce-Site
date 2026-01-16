// src/lib/html.ts

export function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root {
      color-scheme: dark;
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #020617;
      color: #e5e7eb;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      width: 100%;
      padding: 12px 20px;
      border-bottom: 1px solid #111827;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    header > div {
      font-weight: 600;
      font-size: 15px;
    }
    header nav a {
      margin-left: 8px;
    }
    main {
      width: 100%;
      padding: 20px 16px 40px;
      flex: 1;
    }
    .btn {
      display: inline-block;
      padding: 10px 18px;
      border-radius: 999px;
      border: none;
      background: #22c55e;
      color: #020617;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
      white-space: nowrap;
    }
    .btn-secondary {
      background: transparent;
      color: #e5e7eb;
      border: 1px solid #4b5563;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 16px;
      max-width: 480px;
      width: 100%;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }
    label {
      font-size: 13px;
      font-weight: 500;
      color: #d1d5db;
    }
    input {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid #4b5563;
      background: #020617;
      color: #f9fafb;
      font-size: 14px;
      width: 100%;
    }
    input::placeholder {
      color: #6b7280;
    }
    small {
      font-size: 11px;
      color: #9ca3af;
    }
    .muted {
      color: #9ca3af;
      font-size: 13px;
    }

    /* Dashboard layout classes (shared shell) */
    .app-shell {
      display: flex;
      min-height: calc(100vh - 56px);
      width: 100%;
    }
    .app-sidebar {
      width: 240px;
      padding: 16px 14px;
      border-right: 1px solid #111827;
    }
    .app-sidebar-title {
      margin: 0 0 16px 0;
      font-size: 13px;
      letter-spacing: 0.06em;
      color: #9ca3af;
    }
    .app-sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 14px;
    }
    .app-sidebar-nav a {
      color: #e5e7eb;
      text-decoration: none;
      padding: 6px 8px;
      border-radius: 6px;
    }
    .app-sidebar-nav a:hover {
      background: #111827;
    }
    .app-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .app-topbar {
      padding: 12px 18px;
      border-bottom: 1px solid #111827;
    }
    .app-topbar h2 {
      margin: 0;
      font-size: 16px;
    }
    .app-main-content {
      padding: 20px 18px 32px;
      width: 100%;
      max-width: 1200px;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      header {
        padding: 10px 14px;
      }
      main {
        padding: 16px 10px 28px;
      }
      .app-shell {
        flex-direction: column;
      }
      .app-sidebar {
        width: 100%;
        padding: 10px 10px;
        border-right: none;
        border-bottom: 1px solid #111827;
        overflow-x: auto;
        white-space: nowrap;
      }
      .app-sidebar-nav {
        flex-direction: row;
        gap: 6px;
      }
      .app-main-content {
        padding: 16px 10px 28px;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <header>
    <div>GameStore</div>
    <nav>
      <a href="/" class="btn-secondary btn">Home</a>
    </nav>
  </header>
  <main>${body}</main>
</body>
</html>`;
}
