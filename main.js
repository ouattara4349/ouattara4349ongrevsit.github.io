// ===== MAIN.JS - VERSION OPTIMISÉE =====

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initFormHandling();
    initSimpleAnimations();
    animateStatsCounters();
    initTestimonialCarousel();
    initPartnersCarousel();
    initCarouselButtons();
});

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
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
}

// ===== DÉFILEMENT FLUIDE =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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

// ===== ANIMATIONS SIMPLES =====
function initSimpleAnimations() {
    // Animation simple pour les éléments au scroll
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
    
    // Observer les éléments avec animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== GESTION DES FORMULAIRES =====
function initFormHandling() {
    // Initialisation d'EmailJS si disponible
    if (typeof emailjs !== 'undefined') {
        emailjs.init("nZYZOsyl1MGMrUd1R");
    }
    
    // Formulaire de bénévole
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerForm);
    }
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleVolunteerForm(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('volunteerSubmit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;

    const formData = {
        nom: document.getElementById('volunteer-name').value,
        email: document.getElementById('volunteer-email').value,
        telephone: document.getElementById('volunteer-phone').value,
        age: document.getElementById('volunteer-age').value,
        disponibilite: document.getElementById('volunteer-availability').value,
        competences: document.getElementById('volunteer-skills').value,
        motivation: document.getElementById('volunteer-motivation').value
    };

    if (typeof emailjs !== 'undefined') {
        emailjs.send('service_bopookk', 'template_j39ncbs', formData)
            .then(function(response) {
                showMessage('volunteerMessage', 'Votre candidature a été envoyée avec succès ! Nous vous contacterons bientôt.', true);
                volunteerForm.reset();
                setTimeout(() => {
                    window.location.href = 'merci.html';
                }, 2000);
            })
            .catch(function(error) {
                showMessage('volunteerMessage', 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.', false);
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    } else {
        // Fallback si EmailJS n'est pas disponible
        showMessage('volunteerMessage', 'Formulaire soumis avec succès !', true);
        volunteerForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('contactSubmit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;

    const formData = {
        nom: document.getElementById('name').value,
        email: document.getElementById('email').value,
        sujet: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    if (typeof emailjs !== 'undefined') {
        emailjs.send('service_bopookk', 'template_lvbio5g', formData)
            .then(function(response) {
                showMessage('contactMessage', 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', true);
                document.getElementById('contactForm').reset();
                setTimeout(() => {
                    window.location.href = 'merci.html';
                }, 2000);
            })
            .catch(function(error) {
                showMessage('contactMessage', 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.', false);
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    } else {
        // Fallback si EmailJS n'est pas disponible
        showMessage('contactMessage', 'Message envoyé avec succès !', true);
        document.getElementById('contactForm').reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showMessage(elementId, message, isSuccess = true) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${isSuccess ? 'success' : 'error'}`;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
} 

function animateStatsCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!isNaN(target)) {
            counter.textContent = '0';
            let current = 0;
            const duration = 2200; // plus lent
            const increment = Math.ceil(target / (duration / 16));
            function update() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    requestAnimationFrame(update);
                }
            }
            update();
        }
    });
} 

function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    let scrollAmount = 0;
    let cardWidth = carousel.querySelector('.testimonial-card').offsetWidth + 24; // 24 = gap
    let autoScroll = setInterval(() => {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        scrollAmount += cardWidth;
        // Si on arrive à la fin, on revient au début
        if (scrollAmount + carousel.offsetWidth >= carousel.scrollWidth) {
            setTimeout(() => {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
                scrollAmount = 0;
            }, 600);
        }
    }, 4000); // 4 secondes

    // Pause au survol
    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
            scrollAmount += cardWidth;
            if (scrollAmount + carousel.offsetWidth >= carousel.scrollWidth) {
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                    scrollAmount = 0;
                }, 600);
            }
        }, 4000); // 4 secondes
    });
}

function initPartnersCarousel() {
    const carousel = document.querySelector('.partners-carousel');
    if (!carousel) return;
    
    let scrollAmount = 0;
    let cardWidth = carousel.querySelector('.partner-card').offsetWidth + 24; // 24 = gap
    let autoScroll = setInterval(() => {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        scrollAmount += cardWidth;
        // Si on arrive à la fin, on revient au début
        if (scrollAmount + carousel.offsetWidth >= carousel.scrollWidth) {
            setTimeout(() => {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
                scrollAmount = 0;
            }, 600);
        }
    }, 6000);

    // Pause au survol
    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
            scrollAmount += cardWidth;
            if (scrollAmount + carousel.offsetWidth >= carousel.scrollWidth) {
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                    scrollAmount = 0;
                }, 600);
            }
        }, 6000);
    });
}

// Fonction pour la navigation manuelle du carrousel des partenaires
function scrollPartners(direction) {
    const carousel = document.querySelector('.partners-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.partners-track');
    if (!track) return;
    
    const cardWidth = carousel.querySelector('.partner-card').offsetWidth + 24; // 24 = gap
    const currentScroll = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
    
    let newScroll;
    if (direction === 'left') {
        newScroll = Math.max(0, currentScroll - cardWidth);
    } else {
        newScroll = Math.min(maxScroll, currentScroll + cardWidth);
    }
    
    carousel.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });
    
    // Mise à jour de l'état des boutons
    updateCarouselButtons(carousel, newScroll, maxScroll);
}

// Fonction pour mettre à jour l'état des boutons de navigation
function updateCarouselButtons(carousel, currentScroll, maxScroll) {
    const prevBtn = carousel.querySelector('.carousel-nav.prev');
    const nextBtn = carousel.querySelector('.carousel-nav.next');
    
    if (prevBtn) {
        prevBtn.disabled = currentScroll <= 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentScroll >= maxScroll;
    }
}

// Initialisation des boutons de navigation du carrousel
function initCarouselButtons() {
    const carousel = document.querySelector('.partners-carousel');
    if (!carousel) return;
    
    // Initialiser l'état des boutons
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
    updateCarouselButtons(carousel, 0, maxScroll);
    
    // Écouter les événements de scroll pour mettre à jour les boutons
    carousel.addEventListener('scroll', () => {
        const currentScroll = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
        updateCarouselButtons(carousel, currentScroll, maxScroll);
    });
} 