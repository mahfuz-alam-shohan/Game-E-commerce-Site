// src/pages/home/LandingPage.ts
import { HeroSection } from "../../components/sections/HeroSection";
import { Navigation } from "../../components/navigation/Navigation";

export function LandingPage() {
  const navigationItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Games", href: "/games", icon: "🎮", badge: "New" },
    { label: "Categories", href: "/categories", icon: "📂" },
    { 
      label: "More", 
      href: "#", 
      icon: "⋯",
      children: [
        { label: "Deals", href: "/deals", icon: "🏷️" },
        { label: "Support", href: "/support", icon: "💬" },
        { label: "About", href: "/about", icon: "ℹ️" }
      ]
    }
  ];

  return `
    ${Navigation({ items: navigationItems, variant: 'header' })}

    <main>
      ${HeroSection({
        title: "GameStore",
        subtitle: "Your Ultimate Gaming Marketplace - Discover, Buy, and Sell Games Worldwide",
        primaryAction: {
          text: "Browse Games",
          href: "/games"
        },
        secondaryAction: {
          text: "Start Selling",
          href: "/sell"
        },
        variant: 'center'
      })}

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Why Choose GameStore?</h2>
            <p class="section-subtitle">The most trusted platform for gamers worldwide</p>
          </div>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <span class="feature-icon">🚀</span>
              </div>
              <h3 class="feature-title">Instant Delivery</h3>
              <p class="feature-description">Get your games instantly after purchase. No waiting, no hassle.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <span class="feature-icon">🔒</span>
              </div>
              <h3 class="feature-title">100% Secure</h3>
              <p class="feature-description">Bank-level encryption and fraud protection for every transaction.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <span class="feature-icon">🌍</span>
              </div>
              <h3 class="feature-title">Global Access</h3>
              <p class="feature-description">Available worldwide with multi-language support and regional pricing.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <span class="feature-icon">💰</span>
              </div>
              <h3 class="feature-title">Best Prices</h3>
              <p class="feature-description">Competitive pricing with regular deals and special offers.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <span class="feature-icon">🎮</span>
              </div>
              <h3 class="feature-title">Huge Library</h3>
              <p class="feature-description">Thousands of games across all platforms and genres.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <span class="feature-icon">🤝</span>
              </div>
              <h3 class="feature-title">Community</h3>
              <p class="feature-description">Join millions of gamers and share your experiences.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number" data-target="5000000">0</div>
              <div class="stat-label">Happy Gamers</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" data-target="50000">0</div>
              <div class="stat-label">Games Available</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" data-target="150">0</div>
              <div class="stat-label">Countries</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" data-target="99.9">0</div>
              <div class="stat-label">% Uptime</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Preview -->
      <section class="categories-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Popular Categories</h2>
            <a href="/categories" class="view-all-link">View All →</a>
          </div>
          
          <div class="categories-grid">
            <a href="/categories/action" class="category-card">
              <div class="category-icon">⚔️</div>
              <h3>Action</h3>
              <span class="category-count">2,456 games</span>
            </a>
            
            <a href="/categories/rpg" class="category-card">
              <div class="category-icon">🗡️</div>
              <h3>RPG</h3>
              <span class="category-count">1,823 games</span>
            </a>
            
            <a href="/categories/sports" class="category-card">
              <div class="category-icon">⚽</div>
              <h3>Sports</h3>
              <span class="category-count">987 games</span>
            </a>
            
            <a href="/categories/strategy" class="category-card">
              <div class="category-icon">♟️</div>
              <h3>Strategy</h3>
              <span class="category-count">1,234 games</span>
            </a>
            
            <a href="/categories/simulation" class="category-card">
              <div class="category-icon">🏗️</div>
              <h3>Simulation</h3>
              <span class="category-count">756 games</span>
            </a>
            
            <a href="/categories/racing" class="category-card">
              <div class="category-icon">🏎️</div>
              <h3>Racing</h3>
              <span class="category-count">543 games</span>
            </a>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Start Your Gaming Journey?</h2>
            <p class="cta-subtitle">Join millions of gamers and discover your next favorite game today.</p>
            <div class="cta-actions">
              <a href="/signup" class="btn btn-primary btn-large">Get Started Free</a>
              <a href="/learn-more" class="btn btn-secondary btn-large">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Mobile Navigation -->
    ${Navigation({ items: navigationItems, variant: 'mobile' })}

    <script>
      // Animated Counter
      function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target % 1 === 0 ? target.toLocaleString() : target.toFixed(1) + '%';
            }
          };
          
          updateCounter();
        });
      }

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-section')) {
              animateCounters();
            }
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe sections
      document.querySelectorAll('.features-section, .stats-section, .categories-section, .cta-section').forEach(section => {
        observer.observe(section);
      });

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    </script>

    <style>
      /* Base Styles */
      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      main {
        padding-top: 80px; /* Account for fixed header */
      }

      /* Section Headers */
      .section-header {
        text-align: center;
        margin-bottom: 4rem;
      }

      .section-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 800;
        color: var(--gray-900);
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      .section-subtitle {
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        color: var(--gray-600);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }

      .view-all-link {
        display: inline-flex;
        align-items: center;
        color: var(--primary);
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        gap: 0.5rem;
      }

      .view-all-link:hover {
        gap: 1rem;
        transform: translateX(4px);
      }

      /* Features Section */
      .features-section {
        padding: 6rem 0;
        background: var(--gray-50);
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 3rem;
      }

      .feature-card {
        text-align: center;
        padding: 3rem 2rem;
        background: white;
        border-radius: 20px;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
        border: 1px solid var(--gray-200);
      }

      .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-xl);
        border-color: var(--primary);
      }

      .feature-icon-wrapper {
        width: 80px;
        height: 80px;
        margin: 0 auto 2rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .feature-icon-wrapper::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
        animation: shimmer 3s infinite;
      }

      .feature-icon {
        font-size: 2.5rem;
        z-index: 1;
        position: relative;
      }

      .feature-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--gray-900);
        margin-bottom: 1rem;
      }

      .feature-description {
        font-size: 1.1rem;
        color: var(--gray-600);
        line-height: 1.6;
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      }

      /* Stats Section */
      .stats-section {
        padding: 6rem 0;
        background: var(--primary);
        color: white;
        position: relative;
        overflow: hidden;
      }

      .stats-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 3rem;
        position: relative;
        z-index: 1;
      }

      .stat-item {
        text-align: center;
      }

      .stat-number {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 900;
        margin-bottom: 0.5rem;
        line-height: 1;
      }

      .stat-label {
        font-size: 1.2rem;
        opacity: 0.9;
        font-weight: 500;
      }

      /* Categories Section */
      .categories-section {
        padding: 6rem 0;
        background: white;
      }

      .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }

      .category-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem 2rem;
        background: var(--gray-50);
        border-radius: 20px;
        text-decoration: none;
        color: var(--gray-900);
        transition: all 0.3s ease;
        border: 2px solid transparent;
        position: relative;
        overflow: hidden;
      }

      .category-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      .category-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-lg);
        background: white;
        border-color: var(--primary);
      }

      .category-card:hover::before {
        transform: scaleX(1);
      }

      .category-icon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
        transition: transform 0.3s ease;
      }

      .category-card:hover .category-icon {
        transform: scale(1.2);
      }

      .category-card h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .category-count {
        font-size: 0.9rem;
        color: var(--gray-600);
        font-weight: 500;
      }

      /* CTA Section */
      .cta-section {
        padding: 8rem 0;
        background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
        color: white;
        text-align: center;
      }

      .cta-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 800;
        margin-bottom: 1.5rem;
        line-height: 1.2;
      }

      .cta-subtitle {
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        margin-bottom: 3rem;
        opacity: 0.9;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .cta-actions {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .btn-large {
        padding: 1.25rem 3rem;
        font-size: 1.2rem;
      }

      /* Animations */
      .animate-in {
        animation: fadeInUp 0.8s ease-out;
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

      /* Responsive Design */
      @media (max-width: 768px) {
        .container {
          padding: 0 1rem;
        }

        main {
          padding-top: 60px;
        }

        .features-grid,
        .categories-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .cta-actions {
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .btn-large {
          width: 100%;
          max-width: 300px;
        }
      }

      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }

        .feature-card,
        .category-card {
          padding: 2rem 1.5rem;
        }
      }

      /* Performance Optimizations */
      .feature-card,
      .category-card {
        will-change: transform;
        transform: translateZ(0);
      }

      /* Accessibility */
      @media (prefers-reduced-motion: reduce) {
        .feature-card,
        .category-card,
        .stat-number {
          animation: none;
          transition: none;
        }
      }

      @media (prefers-contrast: high) {
        .feature-card,
        .category-card {
          border-width: 2px;
        }
      }
    </style>
  `;
}
