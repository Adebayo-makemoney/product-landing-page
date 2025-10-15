// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        mobileMenuBtn.innerHTML = navLinks.style.display === 'flex' ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('error-input');
    });
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        document.getElementById('nameError').style.display = 'block';
        name.classList.add('error-input');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        email.classList.add('error-input');
        isValid = false;
    }
    
    // Validate package
    const package = document.getElementById('package');
    if (!package.value) {
        document.getElementById('packageError').style.display = 'block';
        package.classList.add('error-input');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        document.getElementById('messageError').style.display = 'block';
        message.classList.add('error-input');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
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
            this.style.transform = 'translateY(-10px)';
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
    navLinks.style.display = 'none';
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        navLinks.style.display = 'none';
    }
});