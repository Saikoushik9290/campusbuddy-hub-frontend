
// Navigation functionality
function toggleNav() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Modal functionality
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Tab functionality
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Hide all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Activate corresponding button
    event.target.classList.add('active');
}

// Form handlers
function handleStudentLogin(event) {
    event.preventDefault();
    alert('Student login successful! Redirecting to dashboard...');
    closeModal('loginModal');
    setTimeout(() => {
        window.location.href = 'student-dashboard.html';
    }, 1000);
}

function handleAdminLogin(event) {
    event.preventDefault();
    alert('Admin login successful! Redirecting to dashboard...');
    closeModal('loginModal');
    setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
    }, 1000);
}

function handleStudentSignup(event) {
    event.preventDefault();
    const form = event.target;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    alert('Student account created successfully! Redirecting to dashboard...');
    closeModal('signupModal');
    setTimeout(() => {
        window.location.href = 'student-dashboard.html';
    }, 1000);
}

function handleAdminSignup(event) {
    event.preventDefault();
    const form = event.target;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const adminKey = form.querySelectorAll('input[type="password"]')[2].value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (adminKey !== 'ADMIN123') {
        alert('Invalid admin key!');
        return;
    }
    
    alert('Admin account created successfully! Redirecting to dashboard...');
    closeModal('signupModal');
    setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
    }, 1000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
    
    // Contact form handler
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Add animation on scroll
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
    const animateElements = document.querySelectorAll('.feature-card, .about-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});
