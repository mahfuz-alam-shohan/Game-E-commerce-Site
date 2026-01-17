// src/scripts/performance.ts
export function getPerformanceOptimizations(): string {
  return `
    (function() {
      'use strict';
      
      // Performance monitoring
      let perfData = {
        loadTime: 0,
        renderTime: 0,
        interactionTime: 0
      };

      // Measure page load performance
      function measurePerformance() {
        if ('performance' in window) {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            perfData.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            console.log('Page load time:', perfData.loadTime + 'ms');
          }
        }
      }

      // Lazy loading for images
      function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
      }

      // Smooth scroll with performance optimization
      function optimizeScrolling() {
        let ticking = false;
        
        function updateScroll() {
          ticking = false;
          // Update scroll-based animations
          updateScrollAnimations();
        }

        function requestTick() {
          if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
          }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
      }

      // Update scroll-based animations
      function updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
          const speed = parseFloat(element.dataset.parallax) || 0.5;
          const yPos = -(scrolled * speed);
          element.style.transform = \`translateY(\${yPos}px)\`;
        });
      }

      // Optimize font loading
      function optimizeFontLoading() {
        const fontDisplay = document.createElement('style');
        fontDisplay.textContent = \`
          @font-face {
            font-family: 'Inter';
            font-display: swap;
            src: url('/fonts/inter-var.woff2') format('woff2');
          }
        \`;
        document.head.appendChild(fontDisplay);
      }

      // Preload critical resources
      function preloadCriticalResources() {
        const criticalResources = [
          '/fonts/inter-var.woff2',
          '/images/hero-bg.jpg',
          '/css/critical.css'
        ];

        criticalResources.forEach(resource => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource;
          
          if (resource.endsWith('.woff2')) {
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
          } else if (resource.endsWith('.jpg')) {
            link.as = 'image';
          } else if (resource.endsWith('.css')) {
            link.as = 'style';
          }
          
          document.head.appendChild(link);
        });
      }

      // Service Worker registration for offline support
      function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
              .then(registration => {
                console.log('SW registered:', registration);
              })
              .catch(error => {
                console.log('SW registration failed:', error);
              });
          });
        }
      }

      // Intersection Observer for animations
      function setupIntersectionObserver() {
        const observerOptions = {
          threshold: [0.1, 0.5, 1],
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
              element.classList.add('visible');
              
              // Trigger one-time animations
              if (element.dataset.animateOnce && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.classList.remove('animate-once');
              }
            } else {
              element.classList.remove('visible');
            }
          });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll, .fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
          observer.observe(el);
        });
      }

      // Optimize images for different devices
      function optimizeImages() {
        const images = document.querySelectorAll('img');
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        images.forEach(img => {
          const src = img.src;
          if (src.includes('?')) return; // Already optimized
          
          // Add device pixel ratio and format optimization
          const optimizedSrc = src + 
            '?auto=' + (devicePixelRatio > 1 ? 'webp' : 'format') + 
            '&fit=max&w=' + Math.round(img.offsetWidth * devicePixelRatio);
          
          img.src = optimizedSrc;
        });
      }

      // Debounce function for performance
      function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }

      // Throttle function for scroll events
      function throttle(func, limit) {
        let inThrottle;
        return function() {
          const args = arguments;
          const context = this;
          if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
          }
        };
      }

      // Performance monitoring for user interactions
      function setupInteractionMonitoring() {
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        
        interactiveElements.forEach(element => {
          element.addEventListener('click', () => {
            const startTime = performance.now();
            requestAnimationFrame(() => {
              perfData.interactionTime = performance.now() - startTime;
              console.log('Interaction time:', perfData.interactionTime + 'ms');
            });
          });
        });
      }

      // Memory management
      function setupMemoryManagement() {
        // Clean up event listeners on page unload
        window.addEventListener('beforeunload', () => {
          // Remove all event listeners
          document.querySelectorAll('*').forEach(element => {
            const clone = element.cloneNode(false);
            element.parentNode?.replaceChild(clone, element);
          });
        });

        // Monitor memory usage
        if ('memory' in performance) {
          setInterval(() => {
            const memory = (performance as any).memory;
            console.log('Memory usage:', {
              used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
              total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
              limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
            });
          }, 30000); // Every 30 seconds
        }
      }

      // Initialize all optimizations
      function init() {
        // Run immediately
        measurePerformance();
        optimizeFontLoading();
        preloadCriticalResources();
        setupIntersectionObserver();
        optimizeImages();
        setupInteractionMonitoring();
        setupMemoryManagement();
        
        // Run after DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            lazyLoadImages();
            optimizeScrolling();
            registerServiceWorker();
          });
        } else {
          lazyLoadImages();
          optimizeScrolling();
          registerServiceWorker();
        }
      }

      // Initialize performance optimizations
      init();

      // Expose performance data for debugging
      window.sitePerformance = perfData;

    })();
  `;
}
