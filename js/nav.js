// ============================================================
// RESENHAS & ETC — MOBILE HAMBURGER MENU LOGIC (nav.js)
// ============================================================

(function () {
  function initMobileNav() {
    const mainNav = document.querySelector('.main-nav');
    if (!mainNav) return;

    // Check if toggle button already exists to prevent duplicate injection
    let toggleBtn = mainNav.querySelector('.nav-toggle');

    if (!toggleBtn) {
      // Create mobile nav header wrapper if needed
      toggleBtn = document.createElement('button');
      toggleBtn.className = 'nav-toggle';
      toggleBtn.setAttribute('aria-label', 'Menu de Navegação');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
        <span class="nav-toggle-text">Menu</span>
      `;

      // Insert toggle button at the beginning of main-nav
      mainNav.insertBefore(toggleBtn, mainNav.firstChild);
    }

    const navMenu = mainNav.querySelector('.nav-menu');
    if (!navMenu) return;

    // Toggle menu open/closed
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.contains('nav-open');

      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    function openNav() {
      mainNav.classList.add('nav-open');
      navMenu.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-overlay-active');
    }

    function closeNav() {
      mainNav.classList.remove('nav-open');
      navMenu.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-overlay-active');

      // Close all open dropdown accordions on mobile
      const openDropdowns = mainNav.querySelectorAll('.dropdown.mobile-open');
      openDropdowns.forEach(d => d.classList.remove('mobile-open'));
    }

    // Handle Mobile Accordion Dropdowns (Resenhas ▾, Jogos de tabuleiro ▾)
    const dropdownItems = mainNav.querySelectorAll('.dropdown');
    dropdownItems.forEach(dropdown => {
      const trigger = dropdown.querySelector('> a');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          // Only intervene on mobile viewport
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle current dropdown
            const isAlreadyOpen = dropdown.classList.contains('mobile-open');
            
            // Close other open dropdowns
            dropdownItems.forEach(d => d.classList.remove('mobile-open'));

            if (!isAlreadyOpen) {
              dropdown.classList.add('mobile-open');
            }
          }
        });
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('nav-open') && !mainNav.contains(e.target)) {
        closeNav();
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('nav-open')) {
        closeNav();
      }
    });

    // Close menu on window resize if scaling up to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mainNav.classList.contains('nav-open')) {
        closeNav();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
