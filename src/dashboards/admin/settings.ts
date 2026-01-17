// src/dashboards/admin/settings.ts
import type { SiteSettings } from "../../services/setupService";

export function adminSettingsIndexView(settings: SiteSettings) {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">
          Manage your store configuration, branding, and appearance.
        </p>
      </div>

      <div class="settings-grid">
        <div class="settings-card">
          <div class="settings-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5"/>
              <path d="M2 17l10-5 10 5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="settings-card-content">
            <h3 class="settings-card-title">Site Identity</h3>
            <p class="settings-card-description">
              Name, logo, motto, and brand elements
            </p>
            <a href="/admin/settings/identity" class="settings-card-action">
              Configure
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="settings-card">
          <div class="settings-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 8.96l4.24 4.24M18.46 18.46l4.24 4.24M1.54 15.04l4.24 4.24"/>
            </svg>
          </div>
          <div class="settings-card-content">
            <h3 class="settings-card-title">Site Theme</h3>
            <p class="settings-card-description">
              Colors, dark/light mode, and visual styling
            </p>
            <a href="/admin/settings/theme" class="settings-card-action">
              Customize
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="settings-card">
          <div class="settings-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 9h6m-6 4h6"/>
            </svg>
          </div>
          <div class="settings-card-content">
            <h3 class="settings-card-title">Categories</h3>
            <p class="settings-card-description">
              Product categories and organization
            </p>
            <a href="/admin/categories" class="settings-card-action">
              Manage
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="settings-card">
          <div class="settings-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="M22 12v-1a4 4 0 0 0-3-3.87M16 11.37A4 4 0 0 0 12.63 8"/>
            </svg>
          </div>
          <div class="settings-card-content">
            <h3 class="settings-card-title">Media Library</h3>
            <p class="settings-card-description">
              Images, files, and digital assets
            </p>
            <a href="/admin/media" class="settings-card-action">
              Browse
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <style>
      .page-header {
        text-align: center;
        margin-bottom: 48px;
      }
      
      .settings-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        max-width: 1000px;
        margin: 0 auto;
      }
      
      .settings-card {
        background: var(--color-card-bg);
        border: 1px solid rgba(148, 163, 184, 0.1);
        border-radius: 16px;
        padding: 32px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .settings-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--color-primary), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .settings-card:hover {
        transform: translateY(-4px);
        border-color: rgba(148, 163, 184, 0.2);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      }
      
      .settings-card:hover::before {
        opacity: 1;
      }
      
      .settings-card-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        color: var(--color-primary);
      }
      
      .settings-card-content {
        flex: 1;
      }
      
      .settings-card-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--color-text);
      }
      
      .settings-card-description {
        font-size: 14px;
        color: var(--color-muted);
        line-height: 1.5;
        margin: 0 0 20px 0;
      }
      
      .settings-card-action {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.2s ease;
      }
      
      .settings-card-action:hover {
        gap: 12px;
        color: #16a34a;
      }
      
      @media (max-width: 768px) {
        .settings-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        .settings-card {
          padding: 24px;
        }
      }
    </style>
  `;
}

export function adminSettingsIdentityView(settings: SiteSettings, errorMessage?: string) {
  const mode = settings.siteLogoMode;
  const modeNone = mode === "none" ? "checked" : "";
  const modeText = mode === "text" ? "checked" : "";
  const modeUrl = mode === "url" ? "checked" : "";
  const modeR2 = mode === "r2" ? "checked" : "";

  const stylePlain = settings.siteLogoTextStyle === "plain" ? "checked" : "";
  const styleSticker = settings.siteLogoTextStyle === "sticker" ? "checked" : "";
  const styleOutline = settings.siteLogoTextStyle === "outline" ? "checked" : "";
  const styleSoft = settings.siteLogoTextStyle === "soft" ? "checked" : "";

  const currentLogoSource =
    settings.siteLogoMode === "r2"
      ? "Using R2 image logo"
      : settings.siteLogoMode === "url" && settings.siteLogoUrl
      ? "Using URL image logo"
      : settings.siteLogoMode === "text"
      ? "Using styled text logo"
      : "No logo in use (plain title)";

  const errorBlock = errorMessage
    ? `<div class="alert alert-error">${errorMessage}</div>`
    : `<div class="alert alert-info">
         This controls how your brand appears in the header and public pages.
       </div>`;

  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">Site Identity</h1>
        <p class="page-subtitle">
          Configure your brand name, logo, and visual identity
        </p>
      </div>

      <div class="identity-layout">
        <div class="identity-main">
          <div class="card">
            <h2 class="card-title">Basic Information</h2>
            ${errorBlock}
            
            <form method="POST" action="/admin/settings/identity" enctype="multipart/form-data" class="identity-form">
              <div class="form-row">
                <div class="field">
                  <label for="site_name">Site Name</label>
                  <input id="site_name" name="site_name" required value="${settings.siteName}" placeholder="Enter your site name" />
                </div>
              </div>

              <div class="form-row">
                <div class="field">
                  <label for="site_motto">Site Motto</label>
                  <input id="site_motto" name="site_motto" value="${settings.siteMotto}" placeholder="Optional tagline" />
                  <small>Optional: A short tagline that describes your store</small>
                </div>
              </div>

              <div class="form-section">
                <h3 class="form-section-title">Logo Configuration</h3>
                
                <div class="logo-modes">
                  <div class="logo-mode-card ${modeNone ? 'active' : ''}" data-mode="none">
                    <div class="logo-mode-icon">📝</div>
                    <div class="logo-mode-content">
                      <h4>Plain Text</h4>
                      <p>Simple site name in header</p>
                    </div>
                    <label class="logo-mode-radio">
                      <input type="radio" name="logo_mode" value="none" ${modeNone} />
                      <span class="radio-custom"></span>
                    </label>
                  </div>

                  <div class="logo-mode-card ${modeText ? 'active' : ''}" data-mode="text">
                    <div class="logo-mode-icon">🎨</div>
                    <div class="logo-mode-content">
                      <h4>Text Logo</h4>
                      <p>Styled text with effects</p>
                    </div>
                    <label class="logo-mode-radio">
                      <input type="radio" name="logo_mode" value="text" ${modeText} />
                      <span class="radio-custom"></span>
                    </label>
                  </div>

                  <div class="logo-mode-card ${modeUrl ? 'active' : ''}" data-mode="url">
                    <div class="logo-mode-icon">🔗</div>
                    <div class="logo-mode-content">
                      <h4>URL Image</h4>
                      <p>Host your logo elsewhere</p>
                    </div>
                    <label class="logo-mode-radio">
                      <input type="radio" name="logo_mode" value="url" ${modeUrl} />
                      <span class="radio-custom"></span>
                    </label>
                  </div>

                  <div class="logo-mode-card ${modeR2 ? 'active' : ''}" data-mode="r2">
                    <div class="logo-mode-icon">☁️</div>
                    <div class="logo-mode-content">
                      <h4>R2 Storage</h4>
                      <p>Upload to cloud storage</p>
                    </div>
                    <label class="logo-mode-radio">
                      <input type="radio" name="logo_mode" value="r2" ${modeR2} />
                      <span class="radio-custom"></span>
                    </label>
                  </div>
                </div>

                <div class="conditional-fields">
                  <div class="field-group" id="url-field" style="${mode === 'url' ? '' : 'display: none;'}">
                    <label for="site_logo_url">Logo URL</label>
                    <input id="site_logo_url" name="site_logo_url" value="${settings.siteLogoUrl}" placeholder="https://example.com/logo.png" />
                  </div>

                  <div class="field-group" id="text-style-field" style="${mode === 'text' ? '' : 'display: none;'}">
                    <label>Text Style</label>
                    <div class="style-options">
                      <label class="style-option">
                        <input type="radio" name="logo_text_style" value="plain" ${stylePlain} />
                        <span class="style-preview">PLAIN</span>
                      </label>
                      <label class="style-option">
                        <input type="radio" name="logo_text_style" value="sticker" ${styleSticker} />
                        <span class="style-preview sticker">STICKER</span>
                      </label>
                      <label class="style-option">
                        <input type="radio" name="logo_text_style" value="outline" ${styleOutline} />
                        <span class="style-preview outline">OUTLINE</span>
                      </label>
                      <label class="style-option">
                        <input type="radio" name="logo_text_style" value="soft" ${styleSoft} />
                        <span class="style-preview soft">SOFT</span>
                      </label>
                    </div>
                  </div>

                  <div class="field-group">
                    <label for="logo_file">Upload Logo</label>
                    <div class="file-upload-area">
                      <input id="logo_file" name="logo_file" type="file" accept="image/*" />
                      <div class="file-upload-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17,8 12,3 7,8"/>
                          <line x1="12" y1="3" x2="12" y2="8"/>
                        </svg>
                        <span>Choose file or drag & drop</span>
                        <small>PNG, JPG, SVG up to 2MB</small>
                      </div>
                    </div>
                    <small>${currentLogoSource}</small>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5-5v11z"/>
                  </svg>
                  Save Changes
                </button>
                <a href="/admin/settings" class="btn btn-secondary">Back to Settings</a>
              </div>
            </form>
          </div>
        </div>

        <div class="identity-preview">
          <div class="preview-card">
            <h3 class="preview-title">Live Preview</h3>
            <div class="preview-container">
              <div class="preview-header">
                <div id="logo-preview-area" class="logo-preview">
                  <!-- Canvas will render here -->
                </div>
                <div class="preview-nav">
                  <div class="preview-nav-item active">Home</div>
                  <div class="preview-nav-item">Dashboard</div>
                  <div class="preview-nav-item">Categories</div>
                </div>
              </div>
            </div>
            
            <div class="preview-tools" id="text-tools" style="${mode === 'text' ? '' : 'display: none;'}">
              <h4>Text Logo Designer</h4>
              <div class="tool-section">
                <label>Background Color</label>
                <input type="color" id="bg-color" value="#22c55e" />
              </div>
              <div class="tool-section">
                <label>Text Color</label>
                <input type="color" id="text-color" value="#ffffff" />
              </div>
              <div class="tool-section">
                <label>Font Size</label>
                <input type="range" id="font-size" min="12" max="32" value="20" />
                <span id="font-size-value">20px</span>
              </div>
              <div class="tool-section">
                <label>Font Weight</label>
                <select id="font-weight">
                  <option value="400">Regular</option>
                  <option value="600">Semibold</option>
                  <option value="700" selected>Bold</option>
                  <option value="900">Black</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>
        (function() {
          let canvas, ctx;
          let currentMode = '${mode}';
          
          function initCanvas() {
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            canvas.width = 200;
            canvas.height = 60;
          }

          function renderTextLogo() {
            const nameInput = document.getElementById('site_name');
            const bgColor = document.getElementById('bg-color').value;
            const textColor = document.getElementById('text-color').value;
            const fontSize = document.getElementById('font-size').value;
            const fontWeight = document.getElementById('font-weight').value;
            const styleInputs = document.querySelectorAll("input[name='logo_text_style']");
            let style = 'plain';
            
            styleInputs.forEach(r => {
              if (r.checked) style = r.value;
            });

            if (!ctx || !nameInput) return;
            
            const name = nameInput.value || 'GameStore';
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set font
            ctx.font = \`\${fontWeight} \${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            let x = canvas.width / 2;
            let y = canvas.height / 2;
            
            if (style === 'sticker') {
              // Background with rounded corners
              const padding = 15;
              const textWidth = ctx.measureText(name).width;
              const textHeight = parseInt(fontSize) + 10;
              
              ctx.fillStyle = bgColor;
              ctx.beginPath();
              ctx.roundRect(x - textWidth/2 - padding, y - textHeight/2, textWidth + padding*2, textHeight, 8);
              ctx.fill();
              
              ctx.fillStyle = textColor;
              ctx.fillText(name, x, y);
            } else if (style === 'outline') {
              // Text with outline
              ctx.strokeStyle = bgColor;
              ctx.lineWidth = 3;
              ctx.strokeText(name, x, y);
              
              ctx.fillStyle = textColor;
              ctx.fillText(name, x, y);
            } else if (style === 'soft') {
              // Gradient background
              const padding = 20;
              const textWidth = ctx.measureText(name).width;
              const textHeight = parseInt(fontSize) + 10;
              
              const gradient = ctx.createLinearGradient(x - textWidth/2 - padding, 0, x + textWidth/2 + padding, 0);
              gradient.addColorStop(0, bgColor);
              gradient.addColorStop(1, adjustColor(bgColor, -20));
              
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.roundRect(x - textWidth/2 - padding, y - textHeight/2, textWidth + padding*2, textHeight, 12);
              ctx.fill();
              
              ctx.fillStyle = textColor;
              ctx.fillText(name, x, y);
            } else {
              // Plain background
              const padding = 12;
              const textWidth = ctx.measureText(name).width;
              const textHeight = parseInt(fontSize) + 10;
              
              ctx.fillStyle = bgColor;
              ctx.fillRect(x - textWidth/2 - padding, y - textHeight/2, textWidth + padding*2, textHeight);
              
              ctx.fillStyle = textColor;
              ctx.fillText(name, x, y);
            }
            
            updatePreview();
          }

          function updatePreview() {
            const preview = document.getElementById('logo-preview-area');
            if (canvas && preview) {
              preview.innerHTML = '';
              preview.appendChild(canvas);
            }
          }

          function adjustColor(color, amount) {
            const num = parseInt(color.replace('#', ''), 16);
            const r = Math.max(0, Math.min(255, (num >> 16) + amount));
            const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
            const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
            return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
          }

          function handleModeChange() {
            const modeInputs = document.querySelectorAll("input[name='logo_mode']");
            currentMode = 'none';
            modeInputs.forEach(r => {
              if (r.checked) currentMode = r.value;
            });
            
            // Show/hide conditional fields
            document.getElementById('url-field').style.display = currentMode === 'url' ? 'block' : 'none';
            document.getElementById('text-style-field').style.display = currentMode === 'text' ? 'block' : 'none';
            document.getElementById('text-tools').style.display = currentMode === 'text' ? 'block' : 'none';
            
            renderPreview();
          }

          function renderPreview() {
            const nameInput = document.getElementById('site_name');
            const urlInput = document.getElementById('site_logo_url');
            const mode = currentMode;
            const styleInputs = document.querySelectorAll("input[name='logo_text_style']");
            let style = 'plain';
            
            styleInputs.forEach(r => {
              if (r.checked) style = r.value;
            });

            const name = nameInput.value || "GameStore";
            const url = urlInput ? urlInput.value : "";
            const preview = document.getElementById('logo-preview-area');
            
            if (!preview) return;
            
            let html = '';
            
            if (mode === 'text') {
              renderTextLogo();
            } else if (mode === 'url' && url) {
              html = \`
                <div class="brand-logo-wrap">
                  <img src="\${url}" alt="\${name}" class="brand-logo-img" />
                  <span class="brand-logo-text">\${name}</span>
                </div>
              \`;
            } else if (mode === 'r2') {
              html = \`
                <div class="brand-logo-wrap">
                  <img src="/media/logo" alt="\${name}" class="brand-logo-img" />
                  <span class="brand-logo-text">\${name}</span>
                </div>
              \`;
            } else {
              html = \`<div class="brand-title">\${name}</div>\`;
            }
            
            if (!canvas) {
              preview.innerHTML = html;
            }
          }

          // Initialize
          document.addEventListener('DOMContentLoaded', function() {
            initCanvas();
            
            // Mode change handlers
            document.addEventListener('input', handleModeChange);
            
            // Text logo designer handlers
            const fontSizeInput = document.getElementById('font-size');
            const fontSizeValue = document.getElementById('font-size-value');
            
            if (fontSizeInput && fontSizeValue) {
              fontSizeInput.addEventListener('input', function() {
                fontSizeValue.textContent = this.value + 'px';
                renderTextLogo();
              });
            }
            
            ['bg-color', 'text-color', 'font-weight'].forEach(id => {
              const element = document.getElementById(id);
              if (element) {
                element.addEventListener('change', renderTextLogo);
              }
            });
            
            // Initial render
            renderPreview();
          });
        })();
      </script>

      <style>
        .identity-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .identity-main {
          min-width: 0;
        }
        
        .identity-preview {
          position: sticky;
          top: 24px;
        }
        
        .logo-modes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin: 24px 0;
        }
        
        .logo-mode-card {
          position: relative;
          border: 2px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .logo-mode-card:hover {
          border-color: rgba(148, 163, 184, 0.2);
          transform: translateY(-2px);
        }
        
        .logo-mode-card.active {
          border-color: var(--color-primary);
          background: rgba(34, 197, 94, 0.05);
        }
        
        .logo-mode-icon {
          font-size: 24px;
          margin-bottom: 12px;
        }
        
        .logo-mode-content h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .logo-mode-content p {
          margin: 0;
          font-size: 13px;
          color: var(--color-muted);
        }
        
        .logo-mode-radio {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          cursor: pointer;
        }
        
        .logo-mode-radio input {
          position: absolute;
          opacity: 0;
        }
        
        .radio-custom {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(148, 163, 184, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .logo-mode-card input:checked ~ .radio-custom {
          border-color: var(--color-primary);
          background: var(--color-primary);
        }
        
        .logo-mode-card input:checked ~ .radio-custom::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        
        .conditional-fields {
          margin-top: 24px;
        }
        
        .field-group {
          margin-bottom: 20px;
        }
        
        .file-upload-area {
          position: relative;
          border: 2px dashed rgba(148, 163, 184, 0.3);
          border-radius: 8px;
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .file-upload-area:hover {
          border-color: var(--color-primary);
          background: rgba(34, 197, 94, 0.02);
        }
        
        .file-upload-area input[type="file"] {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        
        .file-upload-content {
          pointer-events: none;
        }
        
        .file-upload-content svg {
          margin-bottom: 8px;
          color: var(--color-muted);
        }
        
        .preview-card {
          background: var(--color-card-bg);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          padding: 24px;
        }
        
        .preview-title {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .preview-container {
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .preview-header {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo-preview {
          display: flex;
          align-items: center;
          min-height: 40px;
        }
        
        .preview-nav {
          display: flex;
          gap: 24px;
        }
        
        .preview-nav-item {
          color: #94a3b8;
          font-size: 12px;
          font-weight: 500;
        }
        
        .preview-nav-item.active {
          color: #f1f5f9;
        }
        
        .preview-tools {
          margin-top: 20px;
          padding: 16px;
          background: rgba(148, 163, 184, 0.05);
          border-radius: 8px;
        }
        
        .preview-tools h4 {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 600;
        }
        
        .tool-section {
          margin-bottom: 16px;
        }
        
        .tool-section:last-child {
          margin-bottom: 0;
        }
        
        .style-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        
        .style-option {
          display: flex;
          align-items: center;
          padding: 12px;
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .style-option:hover {
          border-color: rgba(148, 163, 184, 0.2);
        }
        
        .style-option input:checked ~ .style-preview {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        
        .style-preview {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 4px;
        }
        
        .style-preview.sticker {
          background: #22c55e;
          color: white;
          border-color: #22c55e;
        }
        
        .style-preview.outline {
          background: transparent;
          color: var(--color-text);
        }
        
        .style-preview.soft {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
        }
        
        input[type="range"] {
          width: 100%;
          margin: 8px 0;
        }
        
        @media (max-width: 1024px) {
          .identity-layout {
            grid-template-columns: 1fr;
          }
          
          .identity-preview {
            position: static;
            margin-top: 32px;
          }
        }
      </style>
    </div>
  `;
}

export function adminSettingsThemeView(settings: SiteSettings, errorMessage?: string) {
  const darkSelected = settings.themeMode === "dark" ? "selected" : "";
  const lightSelected = settings.themeMode === "light" ? "selected" : "";

  const errorBlock = errorMessage
    ? `<div class="alert alert-error">${errorMessage}</div>`
    : `<div class="alert alert-info">
         Customize your site's appearance with colors and themes.
       </div>`;

  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">Site Theme</h1>
        <p class="page-subtitle">
          Customize colors, dark/light mode, and visual styling
        </p>
      </div>

      <div class="theme-layout">
        <div class="theme-main">
          <div class="card">
            <h2 class="card-title">Theme Configuration</h2>
            ${errorBlock}
            
            <form method="POST" action="/admin/settings/theme" class="theme-form">
              <div class="field">
                <label for="theme_mode">Theme mode</label>
                <select id="theme_mode" name="theme_mode" style="padding:7px 9px;border-radius:6px;border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text);">
                  <option value="dark" ${darkSelected}>Dark</option>
                  <option value="light" ${lightSelected}>Light</option>
              </select>
              </div>
          </div>

          <div class="field">
            <label for="theme_primary">
              Primary accent color
              <small>(used for main buttons and accents)</small>
            </label>
            <input id="theme_primary" name="theme_primary" type="color" value="${settings.themePrimary}" />
          </div>

          <h3 class="card-title" style="margin-top:18px;font-size:14px;">Title bar</h3>
          <div class="field">
            <label for="topbar_bg">
              Title bar background
            </label>
            <input id="topbar_bg" name="topbar_bg" type="color" value="${settings.topbarBg}" />
          </div>
          <div class="field">
            <label for="topbar_text">
              Title bar text
            </label>
            <input id="topbar_text" name="topbar_text" type="color" value="${settings.topbarText}" />
          </div>

          <h3 class="card-title" style="margin-top:18px;font-size:14px;">Sidebar</h3>
          <div class="field">
            <label for="sidebar_bg">
              Sidebar background
            </label>
            <input id="sidebar_bg" name="sidebar_bg" type="color" value="${settings.sidebarBg}" />
          </div>
          <div class="field">
            <label for="sidebar_text">
              Sidebar text
            </label>
            <input id="sidebar_text" name="sidebar_text" type="color" value="${settings.sidebarText}" />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn">Save theme</button>
            <a href="/admin/settings" class="btn-secondary btn">Back to settings</a>
          </div>
        </form>
      </section>
    </div>
  `;
}

export function adminSettingsErrorView(message: string) {
  return `
    <div class="page">
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">Something went wrong.</p>
      <div>
        <p class="card-subtitle" style="color:#f97373;">${message}</p>
        <a href="/admin/settings" class="btn-secondary btn">Back to settings</a>
      </div>
    </div>
  `;
}
