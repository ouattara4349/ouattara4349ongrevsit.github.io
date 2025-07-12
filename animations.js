// ===== ANIMATIONS.JS - ANIMATIONS AVANCÉES =====

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    initScrollTriggeredAnimations();
    initHoverEffects();
    initTextAnimations();
    initParticleSystem();
    initMorphingEffects();
    
    // Initialiser ScrollReveal seulement s'il est disponible
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false
        });
        sr.reveal('.animate-on-scroll', { interval: 200 });
    }
});

// ===== ANIMATIONS AVANCÉES =====
function initAdvancedAnimations() {
    // Animation d'entrée pour les éléments
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Ajouter des classes d'animation selon les attributs data
                if (element.dataset.animation) {
                    element.classList.add(element.dataset.animation);
                }
                
                // Animation de délai
                if (element.dataset.delay) {
                    const delay = parseInt(element.dataset.delay);
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, delay);
                } else {
                    element.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec des animations
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== ANIMATIONS DÉCLENCHÉES PAR LE SCROLL =====
function initScrollTriggeredAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialisation
    handleScrollAnimation();
}

// ===== EFFETS DE HOVER =====
function initHoverEffects() {
    // Effet de tilt sur les cartes
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
    
    // Effet de ripple sur les boutons
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== ANIMATIONS DE TEXTE =====
function initTextAnimations() {
    // Animation de typewriter
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-orange)';
        
        let i = 0;
        const typeSpeed = element.dataset.speed || 100;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, typeSpeed);
            } else {
                element.style.borderRight = 'none';
            }
        }
        
        // Démarrer l'animation quand l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // Animation de texte révélé
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    textRevealElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.1s ease ${index * 0.05}s`;
            element.appendChild(span);
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== SYSTÈME DE PARTICULES =====
function initParticleSystem() {
    const particleContainers = document.querySelectorAll('.particle-container');
    
    particleContainers.forEach(container => {
        const particleCount = parseInt(container.dataset.particles) || 50;
        createParticleSystem(container, particleCount);
    });
}

function createParticleSystem(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: var(--primary-orange);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
    }
}

// ===== EFFETS DE MORPHING =====
function initMorphingEffects() {
    const morphElements = document.querySelectorAll('.morph-element');
    
    morphElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.borderRadius = '50%';
            element.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.borderRadius = '';
            element.style.transform = '';
        });
    });
}

// ===== ANIMATIONS DE CHARGEMENT =====
function createLoadingAnimation(container) {
    const loader = document.createElement('div');
    loader.className = 'custom-loader';
    loader.innerHTML = `
        <div class="loader-circle"></div>
        <div class="loader-circle"></div>
        <div class="loader-circle"></div>
    `;
    
    loader.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    `;
    
    const circles = loader.querySelectorAll('.loader-circle');
    circles.forEach((circle, index) => {
        circle.style.cssText = `
            width: 12px;
            height: 12px;
            background: var(--primary-orange);
            border-radius: 50%;
            animation: bounce 1.4s ease-in-out infinite both;
            animation-delay: ${index * 0.16}s;
        `;
    });
    
    container.appendChild(loader);
    
    return loader;
}

// ===== ANIMATIONS DE PROGRESSION =====
function animateProgressBar(bar, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    function update() {
        current += increment;
        if (current < target) {
            bar.style.width = current + '%';
            requestAnimationFrame(update);
        } else {
            bar.style.width = target + '%';
        }
    }
    
    update();
}

// ===== ANIMATIONS DE GALERIE =====
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(2deg)';
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
            item.style.zIndex = '1';
        });
    });
}

// ===== ANIMATIONS DE TIMELINE =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== ANIMATIONS DE MODALE =====
function createModalAnimation(modal) {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
}

function closeModalAnimation(modal, callback) {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        if (callback) callback();
    }, 300);
}

// ===== ANIMATIONS DE NOTIFICATION =====
function createNotificationAnimation(notification) {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
}

// ===== ANIMATIONS DE MENU =====
function animateMenuOpen(menu) {
    const items = menu.querySelectorAll('.menu-item');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateMenuClose(menu) {
    const items = menu.querySelectorAll('.menu-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
        }, index * 50);
    });
}

// ===== ANIMATIONS DE SCROLL SMOOTH =====
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// ===== ANIMATIONS DE COUNTER =====
function animateCounterWithEasing(element, target, duration = 2000, easing = 'easeOutQuart') {
    let start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easingFunctions[easing](progress);
        const current = start + (target - start) * easedProgress;
        
        element.textContent = Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// Fonctions d'easing
const easingFunctions = {
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeOutBack: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    easeOutBounce: (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        
        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    }
};

// ===== ANIMATIONS DE BACKGROUND =====
function createAnimatedBackground(container) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    `;
    
    container.appendChild(canvas);
    
    // Ajuster la taille du canvas
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Créer des particules animées
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 140, 0, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== EXPORT DES FONCTIONS =====
window.AnimationUtils = {
    createLoadingAnimation,
    animateProgressBar,
    initGalleryAnimations,
    initTimelineAnimations,
    createModalAnimation,
    closeModalAnimation,
    createNotificationAnimation,
    animateMenuOpen,
    animateMenuClose,
    smoothScrollTo,
    animateCounterWithEasing,
    createAnimatedBackground
}; 