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

// Fonction pour traiter tous les fichiers HTML
function updateAllHtmlFiles() {
    const htmlFiles = ['index.html', 'apropos.html', 'actions.html', 'merci.html'];
    
    console.log('🔄 Mise à jour des liens dans tous les fichiers HTML...\n');
    
    htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
            updateFileLinks(file);
        } else {
            console.log(`⚠️  Fichier non trouvé: ${file}`);
        }
    });
    
    console.log('\n✅ Mise à jour terminée !');
}

// Exécuter la mise à jour
updateAllHtmlFiles(); 