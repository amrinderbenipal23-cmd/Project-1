// Punjabi Music Collaboration Platform - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Screen preview interactions
    initScreenPreviews();
    
    // Asset downloads
    initAssetDownloads();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initSmoothScrolling() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

function initScreenPreviews() {
    const screenCards = document.querySelectorAll('.screen-card');
    
    screenCards.forEach(card => {
        const iframe = card.querySelector('iframe');
        const viewButton = card.querySelector('.btn-outline');
        
        if (iframe && viewButton) {
            // Add loading state
            iframe.addEventListener('load', () => {
                iframe.style.opacity = '1';
            });
            
            // Handle view button click
            viewButton.addEventListener('click', (e) => {
                e.preventDefault();
                const href = viewButton.getAttribute('href');
                if (href) {
                    window.open(href, '_blank');
                }
            });
        }
    });
}

function initAssetDownloads() {
    const downloadButtons = document.querySelectorAll('a[download]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add download animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Utility functions
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .screen-card, .asset-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add Punjabi music theme effects
function addPunjabiEffects() {
    // Add floating music notes
    createFloatingNotes();
    
    // Add gradient animations
    animateGradients();
}

function createFloatingNotes() {
    const notes = ['♪', '♫', '♪', '♫'];
    const colors = ['#FF9933', '#339933', '#CC0033', '#3366CC'];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const note = document.createElement('div');
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.position = 'fixed';
            note.style.left = Math.random() * window.innerWidth + 'px';
            note.style.top = '100vh';
            note.style.color = colors[Math.floor(Math.random() * colors.length)];
            note.style.fontSize = '24px';
            note.style.pointerEvents = 'none';
            note.style.zIndex = '1000';
            note.style.opacity = '0.6';
            note.style.animation = 'floatUp 4s linear forwards';
            
            document.body.appendChild(note);
            
            setTimeout(() => {
                note.remove();
            }, 4000);
        }
    }, 2000);
}

function animateGradients() {
    const gradientElements = document.querySelectorAll('.btn-primary, .hero');
    
    gradientElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.background = 'linear-gradient(45deg, #339933, #FF9933)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.background = 'linear-gradient(45deg, #FF9933, #CC0033)';
        });
    });
}

// Initialize Punjabi effects
document.addEventListener('DOMContentLoaded', addPunjabiEffects);

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        padding: 20px;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .nav-links.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);
