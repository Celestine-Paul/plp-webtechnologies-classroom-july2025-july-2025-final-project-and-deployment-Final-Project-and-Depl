// JS/SCRIPT.JS - Main JavaScript file for Kaarupet Wholesaler

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeNavigation();
    initializeHeroSlider();
    initializeTestimonialSlider();
    initializeScrollAnimations();
    initializeBackToTop();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeLoadingAnimations();
    
    // Initialize page-specific functionality
    if (window.location.pathname.includes('gallery')) {
        initializeGallery();
    }
    
    if (window.location.pathname.includes('contact')) {
        initializeFAQ();
    }
    
    if (window.location.pathname.includes('products')) {
        initializeProductFilters();
    }
    
    console.log('Kaarupet Wholesaler website initialized successfully!');
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        }
    });
}

// Hero Slider Functionality
function initializeHeroSlider() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    let currentSlide = 0;
    
    if (showcaseItems.length > 0) {
        function showSlide(index) {
            showcaseItems.forEach(item => item.classList.remove('active'));
            showcaseItems[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % showcaseItems.length;
            showSlide(currentSlide);
        }
        
        // Auto-advance slides
        setInterval(nextSlide, 4000);
        
        // Initialize first slide
        showSlide(currentSlide);
    }
}

// Testimonial Slider Functionality
function initializeTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    if (testimonialCards.length > 0) {
        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialCards[index].classList.add('active');
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }
        
        // Auto-advance testimonials
        setInterval(nextTestimonial, 6000);
        
        // Initialize first testimonial
        showTestimonial(currentTestimonial);
    }
}

// Global function for dot navigation (called from HTML)
function currentSlide(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index - 1].classList.add('active');
    dots[index - 1].classList.add('active');
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .category-card, .product-card, .gallery-item');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-on-scroll', 'animated');
            }
        });
    }
    
    // Initial check
    checkAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Add stagger effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact Form Validation and Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
        isValid = false;
    }
    
    // Email validation
    else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }
    
    // Phone validation
    else if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            errorMessage = 'Please enter a valid phone number.';
            isValid = false;
        }
    }
    
    // Name validation
    else if (fieldName === 'name' && value) {
        if (value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
            isValid = false;
        }
    }
    
    // Message validation
    else if (fieldName === 'message' && value) {
        if (value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
        }
    }
    
    // Display error or clear it
    if (!isValid) {
        showError(field, errorMessage);
    } else {
        clearError(field);
    }
    
    return isValid;
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        inquiry: 'Inquiry Type',
        message: 'Message'
    };
    
    return labels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--success-color);
            color: white;
            padding: 20px 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            text-align: center;
            animation: fadeInUp 0.3s ease-out;
        ">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
            <h3 style="margin-bottom: 10px;">Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon!</p>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 3000);
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading Animations
function initializeLoadingAnimations() {
    // Animate elements on page load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate cards with stagger effect
    const cards = document.querySelectorAll('.feature-card, .category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
}

// Gallery Functionality (for gallery page)
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showGalleryModal(title);
        });
    });
}

function showGalleryModal(title) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                text-align: center;
                max-width: 500px;
                margin: 20px;
                position: relative;
            ">
                <button style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #999;
                " onclick="this.closest('.gallery-modal').remove()">×</button>
                <i class="fas fa-images" style="font-size: 4rem; color: var(--secondary-color); margin-bottom: 20px;"></i>
                <h2 style="margin-bottom: 15px; color: var(--primary-color);">${title}</h2>
                <p style="color: var(--dark-gray); margin-bottom: 25px;">This is a sample gallery item. In a real implementation, you would display the actual image and details here.</p>
                <button class="btn btn-primary" onclick="this.closest('.gallery-modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Enhanced Product Card Interactions
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click functionality
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button') && !e.target.closest('a')) {
                const productName = this.querySelector('h3').textContent;
                showProductModal(productName);
            }
        });
    });
}

function showProductModal(productName) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeInUp 0.3s ease-out;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                max-width: 600px;
                margin: 20px;
                position: relative;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <button style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    color: #999;
                    transition: color 0.3s ease;
                " onclick="this.closest('.product-modal').remove()">×</button>
                <i class="fas fa-tshirt" style="font-size: 5rem; color: var(--secondary-color); margin-bottom: 25px;"></i>
                <h2 style="margin-bottom: 20px; color: var(--primary-color);">${productName}</h2>
                <p style="color: var(--dark-gray); margin-bottom: 30px; line-height: 1.6;">
                    This is a detailed view of ${productName}. Here you would display comprehensive product information, 
                    pricing details, size charts, and ordering options for wholesale customers.
                </p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button class="btn btn-primary" onclick="alert('Contact form functionality would be implemented here')">
                        Request Quote
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.product-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Search Functionality (for future implementation)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.product-card, .category-card');
            
            searchableItems.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (itemText.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Newsletter Subscription (for future implementation)
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showNewsletterSuccess();
                this.reset();
            } else {
                showNewsletterError('Please enter a valid email address');
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNewsletterSuccess() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--success-color);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        ">
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            Successfully subscribed to newsletter!
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

// Utility Functions
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(function() {
    initializeScrollAnimations();
}, 10);

// Lazy loading for images (future enhancement)
function initializeLazyLoading() {
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
}

// Theme Toggle (future enhancement)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize additional functionality when DOM is ready
window.addEventListener('load', function() {
    initializeProductCards();
    initializeSearch();
    initializeNewsletter();
    
    // Initialize gallery filters if on gallery page
    if (window.location.pathname.includes('gallery')) {
        initializeGalleryFilters();
    }
    
    // Initialize lazy loading if supported
    if ('IntersectionObserver' in window) {
        initializeLazyLoading();
    }
    
    console.log('All Kaarupet Wholesaler features loaded successfully!');
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate any size-dependent elements
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        // Refresh animations or layouts if needed
        item.style.transform = item.classList.contains('active') 
            ? 'rotateY(0deg) scale(1)' 
            : 'rotateY(-30deg) scale(0.8)';
    });
}, 250));

// FAQ Functionality (for contact page)
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Product Filters (for products page)
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Gallery Filters (for gallery page)
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}