// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initContactForm();
    initAnimations();
    initBackToTop();
    initWhatsAppIntegration();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link highlight
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Form validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        let isValid = true;

        // Remove existing error messages
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        fieldGroup.classList.remove('error', 'success');

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            showFieldError(fieldGroup, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldGroup, 'Please enter a valid email address');
                isValid = false;
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
                showFieldError(fieldGroup, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        if (isValid && value) {
            fieldGroup.classList.add('success');
        }

        return isValid;
    }

    function showFieldError(fieldGroup, message) {
        fieldGroup.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        fieldGroup.appendChild(errorDiv);
    }

    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            contactForm.reset();
            formFields.forEach(field => {
                field.closest('.form-group').classList.remove('error', 'success');
            });

            // Generate WhatsApp message
            generateWhatsAppMessage(data);
            
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Animations
function initAnimations() {
    // Add fade-in classes to elements
    const elements = [
        '.section-header',
        '.service-card',
        '.portfolio-item',
        '.about-content',
        '.contact-form-wrapper',
        '.contact-info'
    ];

    elements.forEach(selector => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.classList.add('fade-in');
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = element.textContent.replace(/\d+/, target);
            clearInterval(counter);
        } else {
            element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
        }
    }, 16);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp Integration
function initWhatsAppIntegration() {
    const whatsappBtn = document.querySelector('.whatsapp-float a');
    
    // Track WhatsApp clicks
    whatsappBtn.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
            event_category: 'engagement',
            event_label: 'WhatsApp Float Button'
        });
    });
}

function generateWhatsAppMessage(formData) {
    const message = `
Hi Canvas & Code!

I'm interested in your services. Here are my details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service Needed: ${formData.service}
Message: ${formData.message}

Please get back to me at your earliest convenience.

Thank you!
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
    
    // Show option to user
    const openWhatsApp = confirm('Would you like to continue the conversation on WhatsApp?');
    if (openWhatsApp) {
        window.open(whatsappUrl, '_blank');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// SEO and Performance Optimizations
function initSEOOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Note: Preloading not needed for SVG images as they are lightweight
}

// Analytics Integration
function initAnalytics() {
    // Google Analytics 4 (replace with your tracking ID)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');

    // Track form submissions
    document.getElementById('contact-form').addEventListener('submit', function() {
        gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'Contact Form'
        });
    });

    // Track service card clicks
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('.service-title').textContent;
            gtag('event', 'service_interest', {
                event_category: 'engagement',
                event_label: serviceName
            });
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            gtag('event', 'scroll', {
                event_category: 'engagement',
                event_label: `${scrollPercent}%`
            });
        }
    });
}

// Newsletter Subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Here you would typically send to your email service
    console.log('Newsletter subscription:', email);
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    this.reset();
    
    // Track newsletter signup
    gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'Footer Newsletter'
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to your error tracking service
});

// Initialize SEO optimizations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initSEOOptimizations();
    initAnalytics();
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        generateWhatsAppMessage,
        showNotification
    };
}
