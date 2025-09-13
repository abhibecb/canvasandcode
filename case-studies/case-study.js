// Case Studies JavaScript - loads header from subdirectory

// Function to load header component for case studies
async function loadHeaderComponent() {
  try {
    const response = await fetch('header.html');
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
    // Initialize basic functionality after header is loaded
    initializeCaseStudyPage();
  });
});

function initializeCaseStudyPage() {
  // Header scroll effect
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('back-to-top');
  
  // Mobile navigation toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Header scroll effects and back to top visibility
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Header background on scroll
    if (header && scrollY > 100) {
      header.classList.add('scrolled');
    } else if (header) {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (backToTop) {
      if (scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });
  
  // Back to top functionality
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && navToggle && !nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}
