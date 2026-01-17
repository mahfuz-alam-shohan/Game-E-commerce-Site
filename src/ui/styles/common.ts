// src/ui/styles/common.ts

export function getCommonStyles(): string {
  return `
    main {
      width: 100%;
      padding: 0;
      flex: 1;
    }

    .page {
      margin: 0 auto;
      max-width: 1200px;
      width: 100%;
    }
    
    .page-narrow {
      margin: 0 auto;
      max-width: 640px;
      width: 100%;
    }
    
    .page-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: var(--color-text);
      letter-spacing: -0.025em;
    }
    
    .page-subtitle {
      margin: 0 0 32px 0;
      font-size: 15px;
      color: var(--color-muted);
      font-weight: 400;
      line-height: 1.5;
    }

    .card {
      background: var(--color-card-bg);
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.1);
      padding: 24px 28px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
      transition: all 0.2s ease;
    }
    
    .card:hover {
      border-color: rgba(148, 163, 184, 0.2);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    
    .card-title {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text);
    }
    
    .card-subtitle {
      margin: 0 0 20px 0;
      font-size: 14px;
      color: var(--color-muted);
      line-height: 1.4;
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
      gap: 6px;
      width: 100%;
    }
    
    label {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 2px;
    }
    
    input, select, textarea {
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: var(--color-card-bg);
      color: var(--color-text);
      font-size: 14px;
      width: 100%;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }
    
    input::placeholder {
      color: var(--color-muted);
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 40px;
    }
    
    .btn-primary {
      background: var(--color-primary);
      color: white;
    }
    
    .btn-primary:hover {
      background: #16a34a;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
    }
    
    .btn-secondary {
      background: rgba(148, 163, 184, 0.1);
      color: var(--color-text);
      border: 1px solid rgba(148, 163, 184, 0.2);
    }
    
    .btn-secondary:hover {
      background: rgba(148, 163, 184, 0.15);
      transform: translateY(-1px);
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
      margin-top: 24px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .alert {
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid;
    }

    .alert-info {
      background: rgba(59, 130, 246, 0.1);
      border-left-color: #3b82f6;
      color: #1e40af;
    }

    .alert-error {
      background: rgba(239, 68, 68, 0.1);
      border-left-color: #ef4444;
      color: #dc2626;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-section {
      margin-top: 32px;
    }

    .form-section-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: var(--color-text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-section-title::before {
      content: '';
      height: 1px;
      flex: 1;
      background: rgba(148, 163, 184, 0.2);
    }

    .brand-logo-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo-img {
      height: 32px;
      width: auto;
      object-fit: contain;
    }

    .brand-logo-text {
      font-size: 18px;
      font-weight: 700;
      color: var(--color-text);
    }

    .brand-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--color-text);
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
