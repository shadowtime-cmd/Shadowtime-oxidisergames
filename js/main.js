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
});

console.log('Shadowtime - Welcome to the game platform!');
