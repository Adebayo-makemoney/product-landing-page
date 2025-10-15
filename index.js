// Initialize AOS with reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    AOS.init({
        disable: true
    });
} else {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        delay: 0
    });
}

// Mobile Menu Toggle with Scroll Color Change
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('header');
const floatingBackToTop = document.getElementById('floatingBackToTop');
const backToTopBtn = document.getElementById('backToTop');

let scrollTimeout;

// Function to handle scroll behavior
function handleScroll() {
    const scrollPosition = window.pageYOffset;
    
    // Header background on scroll
    if (header) {
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
            // Add scrolled class to mobile menu button
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.add('scrolled');
            }
        } else {
            header.classList.remove('scrolled');
            // Remove scrolled class from mobile menu button
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('scrolled');
            }
        }
    }
    
    // Show floating back to top button
    if (floatingBackToTop) {
        if (scrollPosition > 500) {
            floatingBackToTop.classList.add('show');
        } else {
            floatingBackToTop.classList.remove('show');
        }
    }
}

// Scroll event listener with debouncing
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
});

// Mobile menu toggle functionality
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        
        // Update icon
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Form Validation with Real-time Feedback
const contactForm = document.getElementById('contactForm');
const formControls = document.querySelectorAll('.form-control');

// Real-time validation
formControls.forEach(control => {
    control.addEventListener('blur', validateField);
    control.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Clear previous error
    clearErrorOnField(field);
    
    // Validate based on field type
    let isValid = true;
    let errorMessage = '';
    
    switch(field.type) {
        case 'text':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'This field is required';
            }
            break;
        case 'email':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'select-one':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Please select an option';
            }
            break;
        case 'textarea':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Message should be at least 10 characters';
            }
            break;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(field, message) {
    field.classList.add('error-input');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(e) {
    clearErrorOnField(e.target);
}

function clearErrorOnField(field) {
    field.classList.remove('error-input');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const fieldsToValidate = ['name', 'email', 'package', 'message'];
        
        fieldsToValidate.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const event = new Event('blur');
                field.dispatchEvent(event);
                if (field.classList.contains('error-input')) {
                    isValid = false;
                }
            }
        });
        
        if (!isValid) {
            // Focus on first error field
            const firstError = document.querySelector('.error-input');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline-block';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            // Reset button state
            buttonText.style.display = 'inline-block';
            buttonLoading.style.display = 'none';
            submitButton.disabled = false;
        }
    });
}

// Back to Top Functionality
function setupBackToTop(button) {
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

setupBackToTop(backToTopBtn);
setupBackToTop(floatingBackToTop);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Update URL without page reload
            history.pushState(null, null, this.getAttribute('href'));
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        }
    });
});

// Form input animations
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-12px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        } else {
            this.style.transform = 'scale(1.05)';
        }
    });
});

// Initialize with mobile menu closed
if (window.innerWidth <= 768) {
    if (navLinks) {
        navLinks.style.display = 'none';
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (navLinks) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('active');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    } else {
        if (navLinks) {
            navLinks.style.display = 'none';
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                mobileMenuBtn.focus();
            }
        }
    }
});

// Service Worker Registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize scroll state on page load
document.addEventListener('DOMContentLoaded', function() {
    handleScroll(); // Check initial scroll position
});