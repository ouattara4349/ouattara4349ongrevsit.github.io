// Script pour mettre à jour toutes les pages avec la nouvelle navigation et images locales
const fs = require('fs');
const path = require('path');

// Fonction pour mettre à jour les liens dans un fichier
function updateFileLinks(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Mettre à jour les liens CSS
        if (content.includes('assets/css/')) {
            content = content.replace(/assets\/css\//g, '');
            updated = true;
        }

        // Mettre à jour les liens JS
        if (content.includes('assets/js/')) {
            content = content.replace(/assets\/js\//g, '');
            updated = true;
        }

        // Mettre à jour les liens d'images
        if (content.includes('assets/images/')) {
            content = content.replace(/assets\/images\//g, 'images/');
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Mis à jour: ${filePath}`);
        } else {
            console.log(`ℹ️  Aucun changement nécessaire: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Erreur lors de la mise à jour de ${filePath}:`, error.message);
    }
}

// Fonction pour optimiser une page HTML
function optimizeHTMLPage(filePath) {
    console.log(`Optimisation de ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Optimiser les polices Google Fonts
    content = content.replace(
        /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Poppins:wght@300;400;500;600;700&family=Open\+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">/g,
        '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">'
    );
    
    // 2. Optimiser Font Awesome
    content = content.replace(
        /<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/css\/all\.min\.css">/g,
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media=\'all\'">'
    );
    
    // 3. Supprimer animations.css
    content = content.replace(
        /<link rel="stylesheet" href="animations\.css">\s*/g,
        ''
    );
    
    // 4. Supprimer le loader overlay
    content = content.replace(
        /<div id="loader-overlay"><div class="loader-spinner"><\/div><\/div>\s*/g,
        ''
    );
    
    // 5. Supprimer ScrollReveal et animations.js
    content = content.replace(
        /<!-- ScrollReveal -->\s*<script src="https:\/\/unpkg\.com\/scrollreveal"><\/script>\s*<!-- JavaScript -->\s*<script src="main\.js"><\/script>\s*<script src="animations\.js"><\/script>/g,
        '<!-- JavaScript - Optimisé -->\n    <script src="main.js" defer></script>'
    );
    
    // 6. Supprimer les classes d'animation complexes
    content = content.replace(
        /animate-fade-in/g,
        ''
    );
    content = content.replace(
        /animate-fade-in-delay/g,
        ''
    );
    content = content.replace(
        /animate-fade-in-delay-2/g,
        ''
    );
    
    // 7. Remplacer les statistiques animées par des valeurs fixes
    content = content.replace(
        /<div class="stat-number" data-target="(\d+)">0<\/div>/g,
        (match, target) => `<div class="stat-number" data-target="${target}">${target}</div>`
    );
    
    // 8. Optimiser EmailJS
    content = content.replace(
        /<script type="text\/javascript" src="https:\/\/cdn\.jsdelivr\.net\/npm\/@emailjs\/browser@3\/dist\/email\.min\.js"><\/script>/g,
        '<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" defer></script>'
    );
    
    // 9. Ajouter des commentaires d'optimisation
    content = content.replace(
        /<!-- Google Fonts -->/g,
        '<!-- Google Fonts - Optimisé -->'
    );
    content = content.replace(
        /<!-- Font Awesome -->/g,
        '<!-- Font Awesome - Optimisé -->'
    );
    content = content.replace(
        /<!-- EmailJS -->/g,
        '<!-- EmailJS - Chargé de manière différée -->'
    );
    
    // 10. Supprimer les scripts de debug
    content = content.replace(
        /<!-- Debug \(temporaire\) -->\s*<script src="debug\.js"><\/script>\s*/g,
        ''
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath} optimisé avec succès`);
}

// Fonction pour optimiser toutes les pages HTML
function optimizeAllPages() {
    const htmlFiles = [
        'index.html',
        'apropos.html', 
        'actions.html',
        'merci.html'
    ];
    
    htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
            optimizeHTMLPage(file);
        } else {
            console.log(`⚠️  Fichier ${file} non trouvé`);
        }
    });
    
    console.log('\n🎉 Optimisation terminée !');
    console.log('\nOptimisations appliquées :');
    console.log('✅ Polices Google Fonts réduites');
    console.log('✅ Font Awesome chargé de manière différée');
    console.log('✅ Fichier animations.css supprimé');
    console.log('✅ Loader overlay supprimé');
    console.log('✅ ScrollReveal supprimé');
    console.log('✅ Animations complexes remplacées par des animations simples');
    console.log('✅ Statistiques affichées directement');
    console.log('✅ EmailJS chargé de manière différée');
    console.log('✅ Scripts de debug supprimés');
    console.log('\nVotre site devrait maintenant se charger beaucoup plus rapidement !');
}

// Exécuter l'optimisation
optimizeAllPages(); 