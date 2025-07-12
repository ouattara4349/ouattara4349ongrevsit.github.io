// Script de débogage pour identifier les erreurs
console.log('🔍 Début du débogage...');

// Capturer toutes les erreurs
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript détectée:', e.error);
    console.error('📍 Fichier:', e.filename);
    console.error('📍 Ligne:', e.lineno);
    console.error('📍 Message:', e.message);
});

// Capturer les erreurs de promesses non gérées
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesse rejetée non gérée:', e.reason);
});

// Vérifier les éléments critiques
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM chargé');
    
    // Vérifier les éléments importants
    const loader = document.getElementById('loader-overlay');
    console.log('📦 Loader overlay:', loader ? '✅ Trouvé' : '❌ Non trouvé');
    
    const navbar = document.querySelector('.navbar');
    console.log('📦 Navbar:', navbar ? '✅ Trouvée' : '❌ Non trouvée');
    
    const hamburger = document.getElementById('hamburger');
    console.log('📦 Hamburger:', hamburger ? '✅ Trouvé' : '❌ Non trouvé');
    
    const navMenu = document.getElementById('nav-menu');
    console.log('📦 Nav menu:', navMenu ? '✅ Trouvé' : '❌ Non trouvé');
    
    // Vérifier les scripts
    console.log('📦 ScrollReveal disponible:', typeof ScrollReveal !== 'undefined' ? '✅ Oui' : '❌ Non');
    
    // Vérifier les images
    const images = document.querySelectorAll('img');
    console.log('📦 Nombre d\'images:', images.length);
    
    // Vérifier les liens CSS
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    console.log('📦 Liens CSS:', cssLinks.length);
    
    console.log('🔍 Débogage terminé');
}); 