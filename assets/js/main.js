/**
 * Fluentra Academy Global Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME TOGGLER ENGINE ---
  const themeToggleBtn = document.querySelector('.theme-toggle');
  const activeTheme = localStorage.getItem('theme') || 'light';

  // Set initial theme
  document.documentElement.setAttribute('data-theme', activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      let newTheme = 'light';

      if (currentTheme === 'light') {
        newTheme = 'dark';
      }

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- 2. STICKY GLASSMORPHIC NAVBAR ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // --- 3. MOBILE HAMBURGER NAVIGATION ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownToggles = document.querySelectorAll('.nav-item-dropdown > .nav-link');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Accessibility attributes
      const isExpanded = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Handle dropdown clicks on mobile devices (< 992px)
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const parent = toggle.parentElement;
        parent.classList.toggle('active');
      }
    });
  });

  // Close mobile menu when a simple link is clicked
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Highlight Active Link
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link, .dropdown-link');
  
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === pageName) {
      link.classList.add('active');
      // Highlight parent dropdown link if nested
      const parentDropdown = link.closest('.nav-item-dropdown');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });

  // --- 4. POPUP SEARCH MODAL ---
  const searchTrigger = document.querySelector('.search-trigger');
  const searchModal = document.querySelector('.search-modal');
  const searchClose = document.querySelector('.search-close');

  if (searchTrigger && searchModal) {
    searchTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scrolling
      setTimeout(() => {
        const searchInput = searchModal.querySelector('input');
        if (searchInput) searchInput.focus();
      }, 300);
    });
  }

  if (searchClose && searchModal) {
    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
      document.body.style.overflow = ''; // Unlock scrolling
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- 5. INTERACTIVE STATISTICS COUNTERS ---
  const counterElements = document.querySelectorAll('.count-number');
  
  if (counterElements.length > 0) {
    const runCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetVal = parseInt(target.getAttribute('data-target'), 10);
          const duration = 2000; // 2 seconds
          const stepTime = Math.abs(Math.floor(duration / targetVal));
          let currentVal = 0;
          
          const counterInterval = setInterval(() => {
            currentVal += 1;
            target.textContent = currentVal + (target.getAttribute('data-suffix') || '');
            
            if (currentVal >= targetVal) {
              target.textContent = targetVal + (target.getAttribute('data-suffix') || '');
              clearInterval(counterInterval);
            }
          }, stepTime || 20);
          
          observer.unobserve(target); // Only animate once
        }
      });
    };

    const counterObserver = new IntersectionObserver(runCounters, {
      root: null,
      threshold: 0.1
    });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // --- 6. MULTI-SLIDE TESTIMONIAL SLIDER ---
  const slider = document.querySelector('.testimonial-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (slider && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    const goToSlide = (slideIndex) => {
      slider.style.transform = `translateX(-${slideIndex * 100}%)`;
      currentSlide = slideIndex;
    };

    const nextSlide = () => {
      let index = currentSlide + 1;
      if (index >= totalSlides) index = 0;
      goToSlide(index);
    };

    const prevSlide = () => {
      let index = currentSlide - 1;
      if (index < 0) index = totalSlides - 1;
      goToSlide(index);
    };

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-advance every 6 seconds
    let autoPlay = setInterval(nextSlide, 6000);
    
    // Pause autoplay on mouse hover
    const testimonialWrap = document.querySelector('.testimonial-container');
    if (testimonialWrap) {
      testimonialWrap.addEventListener('mouseenter', () => clearInterval(autoPlay));
      testimonialWrap.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 6000);
      });
    }
  }

  // --- 7. REUSABLE FAQ ACCORDIONS ---
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const body = parent.querySelector('.faq-body');
      
      // Close other active FAQs
      const activeFaq = document.querySelector('.faq-item.active');
      if (activeFaq && activeFaq !== parent) {
        activeFaq.classList.remove('active');
        activeFaq.querySelector('.faq-body').style.maxHeight = '0px';
      }

      parent.classList.toggle('active');

      if (parent.classList.contains('active')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0px';
      }
    });
  });

  // Pre-expand first FAQ if exists
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    firstFaq.classList.add('active');
    const firstBody = firstFaq.querySelector('.faq-body');
    firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // --- 8. LIVE FORM VALIDATIONS ---
  const contactForm = document.getElementById('academyContactForm');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-input[required]');

    const validateInput = (input) => {
      const errorMsg = input.nextElementSibling;
      let isValid = true;

      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(input.value.trim());
      } else {
        isValid = input.value.trim().length >= 2;
      }

      if (isValid) {
        input.classList.remove('invalid');
        if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
          errorMsg.style.display = 'none';
        }
      } else {
        input.classList.add('invalid');
        if (errorMsg && errorMsg.classList.contains('form-error-msg')) {
          errorMsg.style.display = 'block';
        }
      }

      return isValid;
    };

    inputs.forEach(input => {
      input.addEventListener('blur', () => validateInput(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          validateInput(input);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      let isFormValid = true;

      inputs.forEach(input => {
        if (!validateInput(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        e.preventDefault();
        // Shake form or show alert message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.style.animation = 'none';
          setTimeout(() => {
            submitBtn.style.animation = 'shake 0.5s ease';
          }, 10);
        }
      } else {
        // Success mockup (prevent reload in demo)
        e.preventDefault();
        const cardContent = contactForm.parentElement;
        const successHTML = `
          <div class="text-center" style="padding: 40px 20px;">
            <div class="badge-icon purple" style="margin: 0 auto 24px auto; width: 70px; height: 70px; font-size: 32px;">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h2 style="font-size: 28px; margin-bottom: 12px;">Thank You!</h2>
            <p style="color: var(--text-muted); margin-bottom: 30px;">Your message has been successfully sent. Our academic counselor will reach out to you within 24 hours.</p>
            <button class="btn btn-primary" onclick="window.location.reload()">Send Another Message</button>
          </div>
        `;
        
        cardContent.innerHTML = successHTML;
      }
    });
  }

  // --- 9. NEWSLETTER FORM HANDLER ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value.trim()) {
        const button = newsletterForm.querySelector('button');
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        button.style.background = '#10b981';
        input.value = '';
        input.placeholder = 'Subscription Active!';
        input.disabled = true;
      }
    });
  }

  // --- 10. GLOBAL PRICING TOGGLE ---
  const pricingSwitch = document.querySelector('.pricing-switch-bg');
  if (pricingSwitch) {
    pricingSwitch.addEventListener('click', () => {
      pricingSwitch.classList.toggle('yearly');
      const isYearly = pricingSwitch.classList.contains('yearly');
      
      const priceVals = document.querySelectorAll('.price-val');
      priceVals.forEach(val => {
        const monthlyPrice = val.getAttribute('data-monthly');
        const yearlyPrice = val.getAttribute('data-yearly');
        
        // Add a smooth fade out/in effect
        val.style.opacity = '0';
        val.style.transform = 'scale(0.9)';
        setTimeout(() => {
          val.textContent = isYearly ? yearlyPrice : monthlyPrice;
          val.style.opacity = '1';
          val.style.transform = 'scale(1)';
        }, 150);
      });
      
      // Update duration text
      const pricePeriods = document.querySelectorAll('.price-period');
      pricePeriods.forEach(period => {
        period.textContent = isYearly ? '/year' : '/month';
      });
    });
  }

  // --- 11. GLOBAL COURSE ENROLLMENT ENGINE ---
  const handleEnrollment = (e) => {
    const btn = e.target.closest('.course-enroll, #navbarEnrollBtn');
    if (!btn) return; // Only run if an enroll button was clicked
    
    e.preventDefault();

    const courseCard = btn.closest('.course-card, .blog-card, .course-detail-card, .lang-path-card');
    
    let courseData = {
      title: 'Fluentra Direct Enrollment',
      info: 'Enrolled • Ready to Start',
      progress: 0,
      color: 'purple'
    };

    if (courseCard) {
      const titleEl = courseCard.querySelector('.course-title a, h3 a, h3, .detail-title');
      const metaEl = courseCard.querySelector('.course-meta span, .course-category, .blog-category');
      
      if (titleEl) courseData.title = titleEl.textContent.trim();
      if (metaEl) courseData.info = `Track: ${metaEl.textContent.trim()} • Ready to Start`;
    }

    // Store as Pending Course for the new Enrollment Workflow
    localStorage.setItem('fluentra_pending_course', JSON.stringify(courseData));
    
    // Check if user is authenticated
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Redirect to the new dedicated auth page
      window.location.href = 'auth.html';
      return; 
    }
    
    // Redirect to Dashboard enrollment processing tab if already logged in
    window.location.href = 'user-dashboard.html?tab=enrollment';
  };

  // Handle all enroll clicks globally via robust event delegation
  document.addEventListener('click', handleEnrollment);

  // --- 12. DYNAMIC USER ACCOUNT DROPDOWN ---
  const accountTriggerBtn = document.getElementById('accountTriggerBtn');
  const accountDropdownMenu = document.getElementById('accountDropdownMenu');

  if (accountTriggerBtn && accountDropdownMenu) {
    // Fixed 3-item menu — always the same regardless of login state
    accountDropdownMenu.innerHTML = `
      <a href="auth.html" class="acct-drop-link primary-link">
        <i class="fa-solid fa-right-to-bracket"></i>
        Login / Signup
      </a>
      <div class="acct-drop-divider"></div>
      <a href="user-dashboard.html" class="acct-drop-link">
        <i class="fa-solid fa-graduation-cap"></i>
        User Dashboard
      </a>
      <a href="admin-dashboard.html" class="acct-drop-link">
        <i class="fa-solid fa-shield-halved"></i>
        Admin Dashboard
      </a>
    `;

    const openDropdown = () => {
      accountDropdownMenu.classList.add('open');
      accountTriggerBtn.classList.add('open');
      accountTriggerBtn.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
      accountDropdownMenu.classList.remove('open');
      accountTriggerBtn.classList.remove('open');
      accountTriggerBtn.setAttribute('aria-expanded', 'false');
    };

    accountTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      accountDropdownMenu.classList.contains('open') ? closeDropdown() : openDropdown();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        accountDropdownMenu.classList.contains('open') &&
        !accountDropdownMenu.contains(e.target) &&
        !accountTriggerBtn.contains(e.target)
      ) {
        closeDropdown();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

});
