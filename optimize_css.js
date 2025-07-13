const fs = require('fs');
const path = require('path');

console.log('🎨 Optimisation du CSS...');

// Fonction pour minifier le CSS
function minifyCSS(css) {
    return css
        // Supprimer les commentaires
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Supprimer les espaces inutiles
        .replace(/\s+/g, ' ')
        // Supprimer les espaces autour des caractères spéciaux
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Supprimer les espaces en début et fin
        .trim();
}

// Fonction pour nettoyer le CSS (supprimer les règles inutilisées)
function cleanCSS(css) {
    // Supprimer les règles CSS dupliquées
    const rules = css.split('}');
    const uniqueRules = [];
    const seenRules = new Set();
    
    rules.forEach(rule => {
        const cleanRule = rule.trim();
        if (cleanRule && !seenRules.has(cleanRule)) {
            seenRules.add(cleanRule);
            uniqueRules.push(cleanRule);
        }
    });
    
    return uniqueRules.join('}') + '}';
}

// Lire le fichier CSS principal
const cssPath = './style.css';
const unifiedCssPath = './unified.css';

try {
    console.log('📖 Lecture du fichier CSS...');
    const css = fs.readFileSync(cssPath, 'utf8');
    const unifiedCss = fs.existsSync(unifiedCssPath) ? fs.readFileSync(unifiedCssPath, 'utf8') : '';
    
    const originalSize = (css.length / 1024).toFixed(2);
    console.log(`📊 Taille originale: ${originalSize}KB`);
    
    // Nettoyer et minifier
    console.log('🧹 Nettoyage du CSS...');
    let cleanedCSS = cleanCSS(css);
    
    console.log('✂️  Minification...');
    let minifiedCSS = minifyCSS(cleanedCSS);
    
    // Combiner avec unified.css si il existe
    if (unifiedCss) {
        console.log('🔗 Combinaison avec unified.css...');
        minifiedCSS += minifyCSS(unifiedCss);
    }
    
    const optimizedSize = (minifiedCSS.length / 1024).toFixed(2);
    const reduction = ((css.length - minifiedCSS.length) / css.length * 100).toFixed(1);
    
    console.log(`📊 Taille optimisée: ${optimizedSize}KB`);
    console.log(`📈 Réduction: ${reduction}%`);
    
    // Sauvegarder le CSS optimisé
    const optimizedPath = './style.optimized.css';
    fs.writeFileSync(optimizedPath, minifiedCSS);
    console.log(`💾 CSS optimisé sauvegardé: ${optimizedPath}`);
    
    // Créer une version avec des commentaires pour le développement
    const devPath = './style.dev.css';
    const devCSS = `/* CSS Optimisé - Version Développement */
/* Taille originale: ${originalSize}KB */
/* Taille optimisée: ${optimizedSize}KB */
/* Réduction: ${reduction}% */

${minifiedCSS}`;
    
    fs.writeFileSync(devPath, devCSS);
    console.log(`💾 Version développement sauvegardée: ${devPath}`);
    
} catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error.message);
}

console.log('\n🎉 Optimisation CSS terminée !');
console.log('\n💡 Prochaines étapes:');
console.log('1. Testez le CSS optimisé');
console.log('2. Remplacez style.css par style.optimized.css');
console.log('3. Vérifiez que tout fonctionne correctement'); 