// src/scripts/layout.ts
export function getLayoutScript(): string {
  return `
    (function() {
      'use strict';
      
      // ===== MOBILE SIDEBAR =====
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const mobileSidebar = document.getElementById('mobile-sidebar');
      const sidebarOverlay = document.getElementById('sidebar-overlay');
      
      function openMobileSidebar() {
        if (mobileSidebar && sidebarOverlay) {
          mobileSidebar.classList.add('active');
          sidebarOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Focus management
          const firstFocusable = mobileSidebar.querySelector('a, button, input');
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      }
      
      function closeMobileSidebar() {
        if (mobileSidebar && sidebarOverlay) {
          mobileSidebar.classList.remove('active');
          sidebarOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
      
      // Mobile sidebar event listeners
      if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileSidebar);
      }
      
      if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
      }
      
      // Close sidebar on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar?.classList.contains('active')) {
          closeMobileSidebar();
          mobileMenuToggle?.focus();
        }
      });
      
      // ===== DESKTOP SIDEBAR =====
      const sidebarToggle = document.getElementById('sidebar-toggle');
      const desktopSidebar = document.getElementById('desktop-sidebar');
      
      function toggleDesktopSidebar() {
        if (desktopSidebar) {
          desktopSidebar.classList.toggle('collapsed');
          
          // Save preference
          const isCollapsed = desktopSidebar.classList.contains('collapsed');
          localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
        }
      }
      
      if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleDesktopSidebar);
      }
      
      // Restore sidebar state
      function restoreSidebarState() {
        const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (desktopSidebar && isCollapsed) {
          desktopSidebar.classList.add('collapsed');
        }
      }
      
      // ===== NAVIGATION ACTIVE STATE =====
      function updateActiveNavigation() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === currentPath || (href === '/admin' && currentPath.startsWith('/admin'))) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
      
      // ===== SEARCH FUNCTIONALITY =====
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.addEventListener('input', function(e) {
          const query = e.target.value.toLowerCase();
          // Implement search functionality here
          console.log('Search query:', query);
        });
        
        searchInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value;
            if (query.trim()) {
              window.location.href = '/search?q=' + encodeURIComponent(query);
            }
          }
        });
      }
      
      // ===== NOTIFICATION SYSTEM =====
      const notificationBell = document.querySelector('.notification-bell');
      if (notificationBell) {
        notificationBell.addEventListener('click', function() {
          // Toggle notification panel
          console.log('Notifications clicked');
        });
      }
      
      // ===== USER MENU =====
      const userAvatar = document.querySelector('.user-avatar');
      if (userAvatar) {
        userAvatar.addEventListener('click', function() {
          // Toggle user menu
          console.log('User menu clicked');
        });
      }
      
      // ===== PULL-TO-REFRESH (MOBILE) =====
      let startY = 0;
      let isPulling = false;
      const pullThreshold = 80;
      const mainContent = document.querySelector('.main-content');
      
      if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function(e) {
          if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
          }
        });
        
        document.addEventListener('touchmove', function(e) {
          if (isPulling && mainContent) {
            const currentY = e.touches[0].clientY;
            const pullDistance = currentY - startY;
            
            if (pullDistance > 0 && pullDistance < pullThreshold) {
              e.preventDefault();
              mainContent.style.transform = 'translateY(' + (pullDistance * 0.5) + 'px)';
            }
          }
        });
        
        document.addEventListener('touchend', function() {
          if (isPulling && mainContent) {
            const currentY = mainContent.style.transform;
            mainContent.style.transform = '';
            isPulling = false;
            
            // Trigger refresh if threshold met
            const pullDistance = parseFloat(currentY.replace('translateY(', '').replace('px)', '')) || 0;
            if (pullDistance > pullThreshold * 0.5) {
              // Implement refresh functionality
              console.log('Triggering refresh...');
              window.location.reload();
            }
          }
        });
      }
      
      // ===== SMOOTH SCROLL =====
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
      
      // ===== LOADING STATES =====
      document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
          if (!this.classList.contains('disabled') && !this.classList.contains('loading')) {
            this.classList.add('loading');
            
            // Remove loading state after 2 seconds (or when request completes)
            setTimeout(() => {
              this.classList.remove('loading');
            }, 2000);
          }
        });
      });
      
      // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        
        // Observe cards and other elements
        document.querySelectorAll('.dashboard-card, .card').forEach(el => {
          observer.observe(el);
        });
      }
      
      // ===== KEYBOARD NAVIGATION =====
      document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          searchInput?.focus();
        }
        
        // Ctrl/Cmd + / for help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
          e.preventDefault();
          console.log('Help shortcut pressed');
        }
      });
      
      // ===== WINDOW RESIZE HANDLING =====
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          // Handle responsive layout changes
          if (window.innerWidth > 768) {
            closeMobileSidebar();
          }
          updateActiveNavigation();
        }, 250);
      });
      
      // ===== PERFORMANCE MONITORING =====
      if ('performance' in window) {
        window.addEventListener('load', function() {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
      }
      
      // ===== INITIALIZATION =====
      function init() {
        restoreSidebarState();
        updateActiveNavigation();
        
        // Set CSS custom properties for viewport height
        const appHeight = window.innerHeight;
        document.documentElement.style.setProperty('--app-height', appHeight + 'px');
        
        console.log('Layout system initialized');
      }
      
      // Initialize when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
      
      // Handle viewport height changes (iOS Safari)
      window.addEventListener('resize', function() {
        const appHeight = window.innerHeight;
        document.documentElement.style.setProperty('--app-height', appHeight + 'px');
      });
      
      // ===== ERROR HANDLING =====
      window.addEventListener('error', function(e) {
        console.error('Layout system error:', e.error);
      });
      
    })();
  `;
}
