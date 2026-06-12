// Smooth scroll animation on page load and scroll
document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add scroll-animate class to elements
    const animateElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .game-card, .feature-card, .stat, ' +
        '.cta-section h2, .cta-section p'
    );

    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const parallaxElements = document.querySelectorAll('.game-card, .feature-card');
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 10;
            const rotateY = (x / rect.width) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Reset perspective on mouse leave
    document.addEventListener('mouseleave', function() {
        const parallaxElements = document.querySelectorAll('.game-card, .feature-card');
        parallaxElements.forEach(element => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // CTA button scroll animation
    const ctaBtn = document.querySelector('.hero .cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            document.querySelector('#games').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Create floating particles effect
    createParticles();

    // Add scroll reveal effect
    window.addEventListener('scroll', handleScroll);
});

// Create particles for background
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#8a2be2' : '#ff1493';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `float ${5 + Math.random() * 10}s infinite`;
        particle.style.pointerEvents = 'none';
        
        heroSection.appendChild(particle);
    }
}

// Scroll reveal effect
let ticking = false;
function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            // Update background gradient based on scroll
            document.body.style.backgroundPosition = `0% ${scrollPercent * 0.5}%`;
            
            ticking = false;
        });
        ticking = true;
    }
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
        }
        25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.3;
        }
        75% {
            transform: translateY(-20px) translateX(15px);
            opacity: 0.6;
        }
    }

    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
`;
document.head.appendChild(style);

// Add glow effect on scroll
document.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    // Change glow color based on scroll position
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        const cardScrollPercent = (card.offsetTop - scrollTop) / (window.innerHeight + card.offsetHeight);
        
        if (cardScrollPercent > -1 && cardScrollPercent < 1) {
            const intensity = 1 - Math.abs(cardScrollPercent);
            card.style.boxShadow = `0 10px ${40 * intensity}px rgba(138, 43, 226, ${0.4 * intensity})`;
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    if (e.key === 'ArrowUp') {
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }
});

console.log('Shadowtime - Welcome to the game platform!');
