/* ===== H1-PREFIXED HEADER JAVASCRIPT - ENHANCED FUNCTIONALITY ===== */
(function() {
  'use strict';

  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // Main header functionality
  ready(function() {
    initializeHeader();
  });

  function initializeHeader() {
    // Initialize all header components
    initializeHamburgerMenu();
    initializeUserDropdown();
    initializeScrollEffect();
    initializeMobileMenu();
    initializeAccessibility();
    
    console.log('H1-Prefixed Header initialized successfully');
  }

  // Hamburger menu functionality
  function initializeHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.h1-hamburger-menu');
    const mobileMenu = document.querySelector('.h1-mobile-menu');
    
    if (!hamburgerMenu || !mobileMenu) {
      console.log('Hamburger menu or mobile menu not found');
      return;
    }

    hamburgerMenu.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle active class on hamburger
      hamburgerMenu.classList.toggle('active');
      
      // Toggle mobile menu visibility
      mobileMenu.classList.toggle('hidden');
      
      // Update aria attributes for accessibility
      const isExpanded = !mobileMenu.classList.contains('hidden');
      hamburgerMenu.setAttribute('aria-expanded', isExpanded);
      mobileMenu.setAttribute('aria-hidden', !isExpanded);
      
      // Prevent body scroll when mobile menu is open
      if (isExpanded) {
        document.body.style.overflow = 'hidden';
        mobileMenu.focus();
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 767) {
        closeMobileMenu();
      }
    });

    function closeMobileMenu() {
      hamburgerMenu.classList.remove('active');
      mobileMenu.classList.add('hidden');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Handle ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
        hamburgerMenu.focus();
      }
    });
  }

  // User dropdown functionality
  function initializeUserDropdown() {
    const dropdownToggle = document.querySelector('.h1-toggle-user-dropdown');
    const dropdownMenu = document.querySelector('.h1-dropdown-user-menu');
    
    if (!dropdownToggle || !dropdownMenu) {
      console.log('User dropdown not found');
      return;
    }

    // Initially hide dropdown
    dropdownMenu.classList.add('hidden');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownMenu.setAttribute('aria-hidden', 'true');

    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isHidden = dropdownMenu.classList.contains('hidden');
      
      if (isHidden) {
        // Show dropdown
        dropdownMenu.classList.remove('hidden');
        dropdownToggle.setAttribute('aria-expanded', 'true');
        dropdownMenu.setAttribute('aria-hidden', 'false');
        
        // Focus first dropdown item
        const firstItem = dropdownMenu.querySelector('a');
        if (firstItem) {
          setTimeout(() => firstItem.focus(), 100);
        }
      } else {
        // Hide dropdown
        closeUserDropdown();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        closeUserDropdown();
      }
    });

    function closeUserDropdown() {
      dropdownMenu.classList.add('hidden');
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownMenu.setAttribute('aria-hidden', 'true');
    }

    // Handle keyboard navigation in dropdown
    dropdownMenu.addEventListener('keydown', function(e) {
      const items = dropdownMenu.querySelectorAll('a');
      const currentIndex = Array.from(items).indexOf(document.activeElement);
      
      switch (e.key) {
        case 'Escape':
          closeUserDropdown();
          dropdownToggle.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items[nextIndex].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items[prevIndex].focus();
          break;
        case 'Tab':
          if (e.shiftKey && currentIndex === 0) {
            closeUserDropdown();
          } else if (!e.shiftKey && currentIndex === items.length - 1) {
            closeUserDropdown();
          }
          break;
      }
    });
  }

  // Scroll effect for header
  function initializeScrollEffect() {
    const header = document.querySelector('.h1-global-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Mobile menu specific functionality
  function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.h1-mobile-menu');
    if (!mobileMenu) return;

    // Handle keyboard navigation in mobile menu
    mobileMenu.addEventListener('keydown', function(e) {
      const items = mobileMenu.querySelectorAll('.h1-mobile-nav-item a');
      const currentIndex = Array.from(items).indexOf(document.activeElement);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items[nextIndex].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items[prevIndex].focus();
          break;
      }
    });

    // Auto-focus first item when mobile menu opens
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (!target.classList.contains('hidden')) {
            const firstItem = target.querySelector('.h1-mobile-nav-item a');
            if (firstItem) {
              setTimeout(() => firstItem.focus(), 150);
            }
          }
        }
      });
    });

    observer.observe(mobileMenu, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // Accessibility enhancements
  function initializeAccessibility() {
    // Add skip to content link if not present
    addSkipToContentLink();
    
    // Enhance focus management
    enhanceFocusManagement();
    
    // Add ARIA landmarks
    addAriaLandmarks();
  }

  function addSkipToContentLink() {
    const header = document.querySelector('.h1-global-header');
    if (!header || document.querySelector('.h1-skip-link')) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'h1-skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('tabindex', '0');
    
    header.insertBefore(skipLink, header.firstChild);
  }

  function enhanceFocusManagement() {
    // Trap focus within mobile menu when open
    const mobileMenu = document.querySelector('.h1-mobile-menu');
    if (!mobileMenu) return;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab' && !mobileMenu.classList.contains('hidden')) {
        const focusableElements = mobileMenu.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  function addAriaLandmarks() {
    const header = document.querySelector('.h1-global-header');
    if (header && !header.getAttribute('role')) {
      header.setAttribute('role', 'banner');
    }

    const nav = document.querySelector('.h1-nav-links');
    if (nav && !nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'Main navigation');
    }

    const mobileMenu = document.querySelector('.h1-mobile-menu');
    if (mobileMenu && !mobileMenu.getAttribute('role')) {
      mobileMenu.setAttribute('role', 'navigation');
      mobileMenu.setAttribute('aria-label', 'Mobile navigation');
    }
  }

  // High contrast mode detection and enhancement
  function handleHighContrast() {
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
      document.documentElement.classList.add('high-contrast');
    }
  }

  // Reduced motion detection
  function handleReducedMotion() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  // Dark mode detection
  function handleDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark-mode');
    }
  }

  // Initialize preference-based enhancements
  ready(function() {
    handleHighContrast();
    handleReducedMotion();
    handleDarkMode();
  });

  // Handle preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-contrast: high)').addListener(handleHighContrast);
    window.matchMedia('(prefers-reduced-motion: reduce)').addListener(handleReducedMotion);
    window.matchMedia('(prefers-color-scheme: dark)').addListener(handleDarkMode);
  }

  // Performance optimization: Debounce scroll events
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

  // Analytics tracking for header interactions (optional)
  function trackHeaderInteraction(action, element) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'header_interaction', {
        'action': action,
        'element': element,
        'timestamp': Date.now()
      });
    }
  }

  // Export functions for external use if needed
  window.H1Header = {
    closeMobileMenu: function() {
      const hamburger = document.querySelector('.h1-hamburger-menu');
      const mobile = document.querySelector('.h1-mobile-menu');
      if (hamburger && mobile) {
        hamburger.classList.remove('active');
        mobile.classList.add('hidden');
        document.body.style.overflow = '';
      }
    },
    closeUserDropdown: function() {
      const dropdown = document.querySelector('.h1-dropdown-user-menu');
      const toggle = document.querySelector('.h1-toggle-user-dropdown');
      if (dropdown && toggle) {
        dropdown.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }
    },
    reinitialize: function() {
      initializeHeader();
    }
  };

  // Handle page visibility changes
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      // Reinitialize if needed when page becomes visible
      const mobileMenu = document.querySelector('.h1-mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        if (window.innerWidth > 767) {
          window.H1Header.closeMobileMenu();
        }
      }
    }
  });

  // Handle orientation changes on mobile
  window.addEventListener('orientationchange', function() {
    setTimeout(function() {
      const mobileMenu = document.querySelector('.h1-mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        if (window.innerWidth > 767) {
          window.H1Header.closeMobileMenu();
        }
      }
    }, 100);
  });

  console.log('H1-Prefixed Header JavaScript loaded successfully');
})();