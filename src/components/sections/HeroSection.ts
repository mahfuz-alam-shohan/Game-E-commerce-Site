// src/components/sections/HeroSection.ts
export interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  background?: string;
  variant?: 'center' | 'left' | 'right';
}

export function HeroSection(props: HeroSectionProps): string {
  const {
    title,
    subtitle,
    primaryAction,
    secondaryAction,
    background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    variant = 'center'
  } = props;

  return `
    <section class="hero-section" style="background: ${background};">
      <div class="hero-container">
        <div class="hero-content hero-${variant}">
          <h1 class="hero-title">${title}</h1>
          <p class="hero-subtitle">${subtitle}</p>
          <div class="hero-actions">
            ${primaryAction ? `
              <a href="${primaryAction.href}" class="btn btn-primary">
                ${primaryAction.text}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </a>
            ` : ''}
            ${secondaryAction ? `
              <a href="${secondaryAction.href}" class="btn btn-secondary">
                ${secondaryAction.text}
              </a>
            ` : ''}
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-elements">
            <div class="floating-card card-1">🎮</div>
            <div class="floating-card card-2">🎯</div>
            <div class="floating-card card-3">🏆</div>
            <div class="floating-card card-4">⚡</div>
          </div>
        </div>
      </div>
    </section>

    <style>
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
      }

      .hero-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        gap: 4rem;
        width: 100%;
        min-height: 100vh;
      }

      .hero-content {
        flex: 1;
        z-index: 2;
      }

      .hero-center {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }

      .hero-left {
        text-align: left;
      }

      .hero-right {
        text-align: right;
        order: 2;
      }

      .hero-title {
        font-size: clamp(3rem, 8vw, 6rem);
        font-weight: 900;
        color: white;
        margin-bottom: 1.5rem;
        line-height: 1.1;
        text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: fadeInUp 0.8s ease-out;
      }

      .hero-subtitle {
        font-size: clamp(1.2rem, 3vw, 2rem);
        color: rgba(255,255,255,0.9);
        margin-bottom: 3rem;
        line-height: 1.6;
        animation: fadeInUp 0.8s ease-out 0.2s both;
      }

      .hero-actions {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        animation: fadeInUp 0.8s ease-out 0.4s both;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 2px solid transparent;
        position: relative;
        overflow: hidden;
      }

      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
      }

      .btn:hover::before {
        left: 100%;
      }

      .btn-primary {
        background: white;
        color: #667eea;
        border-color: white;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(255,255,255,0.3);
      }

      .btn-secondary {
        background: transparent;
        color: white;
        border-color: white;
      }

      .btn-secondary:hover {
        background: white;
        color: #667eea;
        transform: translateY(-2px);
      }

      .hero-visual {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .floating-elements {
        position: relative;
        width: 400px;
        height: 400px;
      }

      .floating-card {
        position: absolute;
        width: 80px;
        height: 80px;
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        border: 2px solid rgba(255,255,255,0.2);
        animation: float 6s ease-in-out infinite;
      }

      .card-1 {
        top: 20%;
        left: 20%;
        animation-delay: 0s;
      }

      .card-2 {
        top: 60%;
        left: 10%;
        animation-delay: 1.5s;
      }

      .card-3 {
        top: 30%;
        right: 20%;
        animation-delay: 3s;
      }

      .card-4 {
        top: 70%;
        right: 10%;
        animation-delay: 4.5s;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(5deg);
        }
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .hero-container {
          flex-direction: column;
          text-align: center;
          padding: 2rem 1rem;
          gap: 2rem;
        }

        .hero-content {
          order: 2;
        }

        .hero-visual {
          order: 1;
        }

        .hero-title {
          font-size: clamp(2.5rem, 10vw, 4rem);
        }

        .hero-subtitle {
          font-size: clamp(1rem, 4vw, 1.5rem);
          margin-bottom: 2rem;
        }

        .hero-actions {
          justify-content: center;
          gap: 1rem;
        }

        .btn {
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
        }

        .floating-elements {
          width: 300px;
          height: 300px;
        }

        .floating-card {
          width: 60px;
          height: 60px;
          font-size: 1.5rem;
        }
      }

      /* Tablet Responsive */
      @media (min-width: 769px) and (max-width: 1024px) {
        .hero-container {
          gap: 2rem;
          padding: 0 3rem;
        }

        .floating-elements {
          width: 350px;
          height: 350px;
        }
      }

      /* Large Desktop */
      @media (min-width: 1400px) {
        .hero-container {
          padding: 0 4rem;
        }

        .floating-elements {
          width: 500px;
          height: 500px;
        }

        .floating-card {
          width: 100px;
          height: 100px;
          font-size: 2.5rem;
        }
      }

      /* Accessibility */
      @media (prefers-reduced-motion: reduce) {
        .floating-card {
          animation: none;
        }

        .btn::before {
          transition: none;
        }
      }

      /* High Contrast */
      @media (prefers-contrast: high) {
        .hero-title {
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .floating-card {
          border-width: 3px;
        }
      }
    </style>
  `;
}
