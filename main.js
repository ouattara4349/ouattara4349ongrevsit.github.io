// ===== MAIN.JS - FONCTIONNALITÉS PRINCIPALES =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du site...');
    
    try {
        // Initialisation de toutes les fonctionnalités
        initNavigation();
        initScrollAnimations();
        initStatistics();
        initTestimonials();
        initSmoothScrolling();
        initFormValidation();
        initMobileMenu();
        initParallaxEffects();
        initLoadingAnimations();

        const contactForm = document.querySelector('.contact-form');
        const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
        let formMessage = document.getElementById('form-message');
        if (contactForm) {
            // Ajouter dynamiquement le div si absent
            if (!formMessage) {
                formMessage = document.createElement('div');
                formMessage.id = 'form-message';
                formMessage.className = 'form-message';
                submitBtn.parentNode.insertBefore(formMessage, submitBtn);
            }
            contactForm.addEventListener('submit', function(e) {
                submitBtn.textContent = "Envoi en cours...";
                submitBtn.disabled = true;
                formMessage.className = 'form-message success';
                formMessage.textContent = "Votre message a été envoyé avec succès !";
                setTimeout(function() {
                    // Le formulaire sera soumis automatiquement
                }, 2000);
            });
        }
        
        console.log('✅ Initialisation terminée avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
    }
});

// Loader overlay
window.addEventListener('DOMContentLoaded', function() {
  try {
    const loader = document.getElementById('loader-overlay');
    if (loader) {
      window.addEventListener('load', function() {
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 400);
      });
    }
  } catch (error) {
    console.error('❌ Erreur avec le loader:', error);
  }
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Changement de style de la navbar au scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menu hamburger mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navigation active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec la classe animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Observer les éléments avec les classes reveal
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== STATISTIQUES ANIMÉES =====
function initStatistics() {
    // Fourchettes pour chaque statistique (ordre : femmes, enfants, familles, bénévoles)
    const ranges = [
        {min: 280, max: 350}, // Femmes accompagnées
        {min: 100, max: 140}, // Enfants formés
        {min: 40, max: 60},   // Familles soutenues
        {min: 20, max: 35}    // Bénévoles actifs
    ];
    const statNumbers = document.querySelectorAll('.stat-number');
    // Générer et appliquer un nombre aléatoire à chaque statistique
    statNumbers.forEach((el, i) => {
        if (ranges[i]) {
            const value = Math.floor(Math.random() * (ranges[i].max - ranges[i].min + 1)) + ranges[i].min;
            el.setAttribute('data-target', value);
        }
    });

    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// ===== SLIDER DE TÉMOIGNAGES =====
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    // Créer les points de navigation
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showSlide(currentIndex);
    }
    
    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }
    
    // Événements des boutons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play
    setInterval(nextSlide, 5000);
}

// ===== DÉFILEMENT FLUIDE =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== VALIDATION DES FORMULAIRES =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(form)) {
                showNotification('Formulaire envoyé avec succès !', 'success');
                form.reset();
            } else {
                showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
            }
        });
    });
    
    // Validation en temps réel
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
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
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Supprimer les messages d'erreur précédents
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('error');
    
    // Validation des champs requis
    if (required && !value) {
        showFieldError(field, 'Ce champ est requis');
        return false;
    }
    
    // Validation email
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Veuillez entrer une adresse email valide');
            return false;
        }
    }
    
    // Validation téléphone
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Veuillez entrer un numéro de téléphone valide');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Gestion des sous-menus en mobile
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (link && menu) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                        link.querySelector('i')?.classList.toggle('rotated');
                    }
                });
            }
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Fermer tous les sous-menus
                const dropdowns = document.querySelectorAll('.dropdown-menu');
                dropdowns.forEach(menu => {
                    menu.style.display = 'none';
                });
                
                const icons = document.querySelectorAll('.nav-dropdown .nav-link i');
                icons.forEach(icon => {
                    icon.classList.remove('rotated');
                });
            }
        });
        
        // Fermer le menu en redimensionnant la fenêtre
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Réinitialiser les sous-menus
                const dropdowns = document.querySelectorAll('.dropdown-menu');
                dropdowns.forEach(menu => {
                    menu.style.display = '';
                });
                
                const icons = document.querySelectorAll('.nav-dropdown .nav-link i');
                icons.forEach(icon => {
                    icon.classList.remove('rotated');
                });
            }
        });
    }
}

// ===== EFFETS PARALLAXE =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== ANIMATIONS DE CHARGEMENT =====
function initLoadingAnimations() {
    // Animation de chargement de la page
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Animation des images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInFromRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Couleurs selon le type
    switch (type) {
        case 'success':
            notification.style.background = 'var(--primary-green)';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = 'var(--primary-orange)';
    }
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== UTILITAIRES =====

// Fonction pour créer des particules
function createParticles(container, count = 50) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            animation-duration: ${Math.random() * 3 + 3}s;
        `;
        container.appendChild(particle);
    }
}

// Fonction pour créer un effet de typewriter
function typewriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Fonction pour créer un effet de compteur
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Fonction pour créer un effet de scroll progressif
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-orange), var(--primary-green));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Fonction pour créer un effet de retour en haut
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-orange);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-5px)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
    });
}

// Initialisation des effets supplémentaires
document.addEventListener('DOMContentLoaded', function() {
    createScrollProgress();
    createBackToTop();
    
    // Créer des particules dans le hero si nécessaire
    const hero = document.querySelector('.hero');
    if (hero) {
        createParticles(hero, 30);
    }
});

// Filtrage des projets en cours
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Retirer l'état actif de tous les boutons
    filterButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== GESTION DES ERREURS =====
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
    showNotification('Une erreur est survenue. Veuillez rafraîchir la page.', 'error');
});

// ===== PERFORMANCE =====
// Optimisation du scroll avec throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Appliquer le throttling aux événements de scroll
const throttledScroll = throttle(() => {
    // Code de scroll optimisé
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll); 