const fs = require('fs');
const path = require('path');

console.log('🖼️  Ajout du lazy loading aux images...');

// Fonction pour ajouter lazy loading aux images
function addLazyLoading(html) {
    // Remplacer les balises img sans lazy loading
    let updatedHtml = html.replace(
        /<img([^>]*?)src="([^"]*?)"([^>]*?)>/gi,
        (match, before, src, after) => {
            // Vérifier si lazy loading est déjà présent
            if (match.includes('loading=')) {
                return match;
            }
            
            // Ajouter lazy loading
            return `<img${before}src="${src}"${after} loading="lazy">`;
        }
    );
    
    // Ajouter lazy loading aux images dans les sections critiques
    const criticalImages = [
        'medium-shot-smiley-kids-playing-together.jpg',
        'nous.jpg',
        'veuve.jpg',
        'actions.jpg',
        'Enfant de la rue.jpg'
    ];
    
    criticalImages.forEach(image => {
        // Ne pas ajouter lazy loading aux images critiques (above the fold)
        const regex = new RegExp(`<img([^>]*?)src="[^"]*?${image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"([^>]*?)>/gi`);
        updatedHtml = updatedHtml.replace(regex, (match, before, after) => {
            if (match.includes('loading=')) {
                return match;
            }
            // Pas de lazy loading pour les images critiques
            return match;
        });
    });
    
    return updatedHtml;
}

// Fonction pour optimiser les images avec des tailles responsives
function addResponsiveImages(html) {
    // Ajouter des attributs width et height pour éviter le layout shift
    let updatedHtml = html.replace(
        /<img([^>]*?)src="([^"]*?)"([^>]*?)>/gi,
        (match, before, src, after) => {
            // Ajouter des dimensions par défaut si pas présentes
            if (!match.includes('width=') && !match.includes('height=')) {
                return `<img${before}src="${src}"${after} width="800" height="600">`;
            }
            return match;
        }
    );
    
    return updatedHtml;
}

// Fonction pour ajouter des attributs alt manquants
function addAltAttributes(html) {
    let updatedHtml = html.replace(
        /<img([^>]*?)src="([^"]*?)"([^>]*?)>/gi,
        (match, before, src, after) => {
            // Vérifier si alt est présent
            if (!match.includes('alt=')) {
                const filename = path.basename(src, path.extname(src));
                const altText = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return `<img${before}src="${src}"${after} alt="${altText}">`;
            }
            return match;
        }
    );
    
    return updatedHtml;
}

// Traiter tous les fichiers HTML
const htmlFiles = ['index.html', 'apropos.html', 'actions.html', 'merci.html'];

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`📄 Traitement de ${file}...`);
        
        try {
            let html = fs.readFileSync(file, 'utf8');
            const originalSize = html.length;
            
            // Appliquer les optimisations
            html = addAltAttributes(html);
            html = addResponsiveImages(html);
            html = addLazyLoading(html);
            
            const optimizedSize = html.length;
            const change = ((optimizedSize - originalSize) / originalSize * 100).toFixed(2);
            
            // Sauvegarder le fichier optimisé
            const optimizedFile = file.replace('.html', '.optimized.html');
            fs.writeFileSync(optimizedFile, html);
            
            console.log(`✅ ${file} optimisé → ${optimizedFile}`);
            console.log(`📊 Taille: ${originalSize} → ${optimizedSize} caractères (${change}%)`);
            
        } catch (error) {
            console.error(`❌ Erreur avec ${file}:`, error.message);
        }
    } else {
        console.log(`⚠️  Fichier non trouvé: ${file}`);
    }
});

console.log('\n🎉 Optimisation HTML terminée !');
console.log('\n💡 Prochaines étapes:');
console.log('1. Testez les fichiers .optimized.html');
console.log('2. Remplacez les fichiers originaux');
console.log('3. Vérifiez que le lazy loading fonctionne');
console.log('4. Testez la performance avec PageSpeed Insights'); 