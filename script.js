// Premium WordPress Theme JavaScript

// Function to load header component
async function loadHeaderComponent() {
  try {
    const response = await fetch('components/header.html');
    const headerHTML = await response.text();
    
    // Find the header placeholder and replace it with the loaded content
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      headerPlaceholder.outerHTML = headerHTML;
    }
  } catch (error) {
    console.error('Error loading header component:', error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Load header component first
  loadHeaderComponent().then(() => {
    // Initialize all other functionality after header is loaded
    initializeApp();
  });
});

function initializeApp() {
  // Header scroll effect
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('back-to-top');
  
  // Smooth scrolling for in-page links (nav and buttons)
  const navLinks = document.querySelectorAll('.nav-link');
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  function smoothScrollHandler(e) {
    const targetId = this.getAttribute('href');
    // Ignore empty hashes
    if (!targetId || targetId === '#') return;
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu if open
    nav.classList.remove('active');
    navToggle.classList.remove('active');
  }

  // Attach to nav links
  navLinks.forEach(link => link.addEventListener('click', smoothScrollHandler));
  // Attach to all internal links (buttons etc.)
  internalLinks.forEach(link => link.addEventListener('click', smoothScrollHandler));
  
  // Mobile navigation toggle
  navToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Header scroll effects and back to top visibility
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Header background on scroll
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    
    // Update active navigation link
    updateActiveNavLink();
  });
  
  // Back to top functionality
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Scroll indicator click
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
  
  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (correspondingLink) {
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      }
    });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .feature');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
  
  // Counter animation for stats
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.innerText);
      const increment = target / 200;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = counter.dataset.target || target + (counter.innerText.includes('%') ? '%' : '+');
          clearInterval(timer);
        } else {
          counter.innerText = Math.floor(current) + (counter.innerText.includes('%') ? '%' : '+');
        }
      }, 10);
    });
  }
  
  // Animate counters when hero section is visible
  const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    heroObserver.observe(heroStats);
  }
  
  // Form handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--success)';
        
        // Reset form
        setTimeout(() => {
          this.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }, 2000);
    });
  }
  
  // Parallax effect for hero background
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
  
  // Typing effect for hero title (optional enhancement)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }
  
  // Smooth reveal animations on load
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
  });
  
  // Portfolio hover effects
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Service card hover effects
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Apply hover effects to all cards
      this.style.transform = 'translateY(-12px) scale(1.03)';
      this.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.1)';
      
      // Only change background for non-featured cards
      if (!this.classList.contains('featured')) {
        this.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(236, 72, 153, 0.05))';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'var(--shadow-md)';
      
      // Only reset background for non-featured cards
      if (!this.classList.contains('featured')) {
        this.style.background = 'var(--white)';
      }
    });
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Founders "Read more" toggle
  function toggleFounderPanel(btn){
    const targetId = btn.getAttribute('data-target');
    const panel = document.getElementById(targetId);
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    if (!panel) return;

    if (expanded){
      panel.style.maxHeight = panel.scrollHeight + 'px';
      requestAnimationFrame(() => { panel.style.maxHeight = '0px'; });
      setTimeout(() => { panel.hidden = true; panel.style.maxHeight=''; }, 350);
      btn.setAttribute('aria-expanded','false');
      btn.textContent = 'Read more';
    } else {
      panel.hidden = false;
      panel.style.maxHeight = '0px';
      requestAnimationFrame(() => { panel.style.maxHeight = panel.scrollHeight + 'px'; });
      setTimeout(() => { panel.style.maxHeight=''; }, 350);
      btn.setAttribute('aria-expanded','true');
      btn.textContent = 'Show less';
    }
  }

  document.querySelectorAll('.founder-toggle[data-target]').forEach(btn => {
    btn.addEventListener('click', () => toggleFounderPanel(btn));
  });
  
  // Preloader (optional)
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-content">
      <i class="fas fa-palette"></i>
      <div class="loading-text">Loading...</div>
    </div>
  `;
  
  // Add preloader styles
  const preloaderStyles = `
    .preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease-out;
    }
    
    .preloader-content {
      text-align: center;
      color: white;
    }
    
    .preloader-content i {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    .loading-text {
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.7; }
    }
  `;
  
  // Add styles to head
  const styleSheet = document.createElement('style');
  styleSheet.textContent = preloaderStyles;
  document.head.appendChild(styleSheet);
  
  // Show preloader briefly
  document.body.appendChild(preloader);
  
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(preloader);
    }, 500);
  }, 1500);
  
  // Initialize
  updateActiveNavLink();

  // Services Carousel Functionality
  initServicesCarousel();

  // Testimonials Carousel Functionality
  initTestimonialsCarousel();
}

// Testimonial Read More Functionality
function toggleTestimonial(button) {
  const testimonialCard = button.closest('.testimonial-card');
  const preview = testimonialCard.querySelector('.testimonial-preview');
  const full = testimonialCard.querySelector('.testimonial-full');
  
  if (full.style.display === 'none') {
    preview.style.display = 'none';
    full.style.display = 'block';
    button.textContent = 'Show less';
  } else {
    preview.style.display = 'block';
    full.style.display = 'none';
    button.textContent = 'Read more';
  }
}

function initServicesCarousel() {
  const carousel = document.querySelector('.service-grid');
  const prevButton = document.querySelector('.carousel-arrow-left');
  const nextButton = document.querySelector('.carousel-arrow-right');
  
  if (!carousel || !prevButton || !nextButton) return;
  
  let currentIndex = 0;
  const totalCards = carousel.children.length;
  
  // Function to get cards per view based on screen size
  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }
  
  // Function to update carousel position
  function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    // Ensure currentIndex is within bounds
    currentIndex = Math.min(currentIndex, maxIndex);
    
    const cardWidth = carousel.children[0].offsetWidth;
    const gap = 32; // 2rem in pixels
    const translateX = -(currentIndex * (cardWidth + gap));
    
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
  }
  
  // Event listeners for navigation buttons
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextButton.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    if (currentIndex < maxIndex) {
      currentIndex++;
      currentIndex++;
      currentIndex++;
      
      updateCarousel();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    updateCarousel();
  }, 250));
  
  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevButton.click();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextButton.click();
    }
  });
  
  // Make carousel focusable for keyboard navigation
  carousel.tabIndex = 0;
  
  // Initialize carousel
  updateCarousel();
}

// Testimonials Carousel Functionality
function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonial-grid');
  const prevButton = document.querySelector('.testimonial-carousel-container .carousel-arrow-left');
  const nextButton = document.querySelector('.testimonial-carousel-container .carousel-arrow-right');
  const dotsContainer = document.querySelector('.testimonial-dots');
  
  if (!carousel || !prevButton || !nextButton) return;
  
  let currentIndex = 0;
  let autoPlayInterval;
  const totalCards = carousel.children.length;
  
  // Function to get cards per view based on screen size
  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }
  
  // Function to get total pages for dots
  function getTotalPages() {
    const cardsPerView = getCardsPerView();
    return Math.ceil(totalCards / cardsPerView);
  }
  
  // Function to create dots
  function createDots() {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const totalPages = getTotalPages();
    
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        resetAutoPlay();
      });
      
      dotsContainer.appendChild(dot);
    }
  }
  
  // Function to update dots
  function updateDots() {
    if (!dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    const cardsPerView = getCardsPerView();
    const currentPage = Math.floor(currentIndex / cardsPerView);
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPage);
    });
  }
  
  // Function to update carousel position
  function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    // Ensure currentIndex is within bounds
    currentIndex = Math.min(currentIndex, maxIndex);
    
    const cardWidth = carousel.children[0].offsetWidth;
    const gap = 32; // 2rem in pixels
    const translateX = -(currentIndex * (cardWidth + gap));
    
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
    
    // Update dots
    updateDots();
  }
  
  // Auto-play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, totalCards - cardsPerView);
      
      if (currentIndex >= maxIndex) {
        currentIndex = 0; // Loop back to start
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 5000); // Change slide every 5 seconds
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }
  
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }
  
  // Event listeners for navigation buttons
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      resetAutoPlay();
    }
  });
  
  nextButton.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
      resetAutoPlay();
    }
  });
  
  // Pause auto-play on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    createDots();
    updateCarousel();
  }, 250));
  
  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevButton.click();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextButton.click();
    }
  });
  
  // Make carousel focusable for keyboard navigation
  carousel.tabIndex = 0;
  
  // Initialize carousel
  createDots();
  updateCarousel();
  startAutoPlay();
}

// Additional utility functions
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

// Debounced scroll handler for better performance
window.addEventListener('scroll', debounce(function() {
  // Additional scroll-based animations can go here
}, 10));
