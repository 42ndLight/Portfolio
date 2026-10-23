const passiveSupported = (() => {
    let passive = false;
    try {
        const options = { get passive() { passive = true; return false; } };
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
    } catch(err) { passive = false; }
    return passive;
})();

const scrollOptions = passiveSupported ? { passive: true } : false;

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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    requestAnimationFrame(() => {
        initializeApp();
    });
});

function initializeApp() {
    initializeThemeToggle();
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeUtilities();
}

// THEME TOGGLE
function initializeThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    const body = document.body;
    
    if (!themeToggleBtn || !themeIcon) return;
    
    const currentTheme = html.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);
    
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
        html.setAttribute('data-theme', newTheme);
        body.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch(e) {
            console.warn('localStorage not available');
        }
        updateThemeIcon(newTheme);
        
        setTimeout(() => body.style.removeProperty('transition'), 300);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// NAVIGATION
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    });
}

// SCROLL EFFECTS
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const handleNavHighlight = throttle(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);
    
    const handleParallax = throttle(() => {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent && window.scrollY < window.innerHeight) {
            const rate = window.scrollY * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    }, 16);
    
    window.addEventListener('scroll', () => {
        handleNavHighlight();
        handleParallax();
    }, scrollOptions);
}

// ANIMATIONS
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elementsToObserve = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    elementsToObserve.forEach(el => observer.observe(el));
    
    const skillsSection = document.querySelector('.skills');
    let skillsAnimated = false;
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkills();
                    skillsAnimated = true;
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
    });
    
    const heroName = document.querySelector('.hero-name');
    if (heroName && !heroName.dataset.typed) {
        const nameText = heroName.textContent;
        heroName.dataset.typed = 'true';
        typeWriter(heroName, nameText, 100);
    }
}

function animateSkills() {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.transform = 'translateY(0)';
            category.style.opacity = '1';
        }, index * 200);
    });
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            element.appendChild(cursor);
            
            setTimeout(() => cursor.remove(), 2000);
        }
    }
    
    type();
}

// CONTACT FORM
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const mailtoLink = `mailto:leichteed@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            window.location.href = mailtoLink;
            
            showNotification('Email client opened! Thank you for your message.', 'success');
            
            contactForm.reset();
        });
    }
}

// UTILITIES
function initializeUtilities() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        const text = item.querySelector('span');
        
        if (link && link.href.includes('mailto:')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                copyToClipboard(link.textContent, link);
            });
        } else if (text && text.textContent.includes('+254')) {
            text.style.cursor = 'pointer';
            text.addEventListener('click', () => {
                copyToClipboard(text.textContent, text);
            });
        }
    });
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// HELPER FUNCTIONS
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function copyToClipboard(text, element) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = element.textContent;
            element.textContent = 'Copied!';
            element.style.color = '#10b981';
            
            setTimeout(() => {
                element.textContent = originalText;
                element.style.color = '';
            }, 2000);
        }).catch(() => {
            showNotification('Failed to copy to clipboard', 'error');
        });
    } else {
        showNotification('Clipboard not supported', 'error');
    }
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
    });
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// CSS INJECTION
const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
        color: #f59e0b;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    /* Optimize animations with will-change */
    .hero-content > * {
        will-change: opacity, transform;
    }
    
    body.loaded .hero-content > * {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    body.loaded .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
    body.loaded .hero-content > *:nth-child(2) { animation-delay: 0.2s; }
    body.loaded .hero-content > *:nth-child(3) { animation-delay: 0.3s; }
    body.loaded .hero-content > *:nth-child(4) { animation-delay: 0.4s; }
    body.loaded .hero-content > *:nth-child(5) { animation-delay: 0.5s; }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);