// src/ui/styles/common.ts

export function getCommonStyles(): string {
  return `
    main {
      width: 100%;
      padding: 18px 16px 40px;
      flex: 1;
    }

    .page {
      margin: 0 auto;
      max-width: 1040px;
      width: 100%;
    }
    .page-narrow {
      margin: 0 auto;
      max-width: 540px;
      width: 100%;
    }
    .page-title {
      font-size: 22px;
      font-weight: 600;
      margin: 0 0 4px 0;
    }
    .page-subtitle {
      margin: 0 0 20px 0;
      font-size: 13px;
      color: var(--color-muted);
    }

    .card {
      background: var(--color-card-bg);
      border-radius: 6px;
      border: 1px solid var(--color-border);
      padding: 18px 18px 20px;
      box-shadow: none;
    }
    .card-title {
      margin: 0 0 6px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .card-subtitle {
      margin: 0 0 14px 0;
      font-size: 12px;
      color: var(--color-muted);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 4px;
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
      color: var(--color-text);
    }
    input {
      padding: 7px 9px;
      border-radius: 6px;
      border: 1px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text);
      font-size: 14px;
      width: 100%;
    }
    input::placeholder {
      color: var(--color-muted);
    }
    small {
      font-size: 11px;
      color: var(--color-muted);
    }
    .muted {
      color: var(--color-muted);
      font-size: 13px;
    }
    .stack-sm {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .stack-md {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .form-actions {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .list-row {
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:10px 4px;
      border-bottom:1px solid var(--color-border);
    }
    .list-row-main {
      display:flex;
      flex-direction:column;
      gap:2px;
    }
    .list-row-title {
      font-size:14px;
      font-weight:500;
    }
    .list-row-subtitle {
      font-size:12px;
      color:var(--color-muted);
    }

    .logo-preview-box {
      margin-top:10px;
      padding:12px 10px;
      border-radius:6px;
      border:1px dashed var(--color-border);
      display:flex;
      align-items:center;
      gap:10px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      main {
        padding: 14px 10px 28px;
      }
      .page, .page-narrow, .app-main-content {
        max-width: 100%;
      }
    }
  `;
}
