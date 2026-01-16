export function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body { margin:0; font-family: system-ui, -apple-system, sans-serif; background:#050816; color:#f9fafb; }
    main { max-width: 720px; margin: 40px auto; padding: 0 16px; }
    header { padding:16px; border-bottom:1px solid #111827; display:flex; justify-content:space-between; align-items:center; }
    a, button { cursor:pointer; }
    .btn { display:inline-block; padding:10px 18px; border-radius:999px; border:none; background:#22c55e; color:#020617; font-weight:600; text-decoration:none; }
    .btn-secondary { background:transparent; border:1px solid #4b5563; color:#e5e7eb; }
    form { display:flex; flex-direction:column; gap:12px; margin-top:16px; }
    label { font-size:14px; font-weight:500; }
    input { padding:8px 10px; border-radius:8px; border:1px solid #4b5563; background:#020617; color:#f9fafb; }
    small { color:#9ca3af; font-size:12px; }
    .field { display:flex; flex-direction:column; gap:4px; }
  </style>
</head>
<body>
  <header>
    <div>GameStore Setup</div>
    <nav><a href="/" class="btn-secondary btn">Home</a></nav>
  </header>
  <main>${body}</main>
</body>
</html>`;
}
