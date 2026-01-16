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
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #020617;
      color: #e5e7eb;
    }
    header {
      padding: 12px 16px;
      border-bottom: 1px solid #111827;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 960px;
      margin: 0 auto;
    }
    main {
      max-width: 960px;
      margin: 32px auto;
      padding: 0 16px 48px;
    }
    h1, h2 {
      margin: 0 0 8px 0;
    }
    p {
      margin: 4px 0 12px 0;
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
    }
    .btn-secondary {
      background: transparent;
      color: #e5e7eb;
      border: 1px solid #4b5563;
    }
    nav a {
      margin-left: 8px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 16px;
      max-width: 420px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
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
