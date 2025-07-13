const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Début de l\'optimisation des images...');

const imagesDir = './images';
const optimizedDir = './images/optimized';

// Créer le dossier optimized s'il n'existe pas
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
}

// Liste des images à optimiser en priorité (les plus lourdes)
const criticalImages = [
    'temoin femme4.jpg',
    'temoin femme5.jpg', 
    'medium-shot-smiley-kids-playing-together.jpg',
    'person-sharing-feelings-emotions-therapy-session.jpg',
    'cinematic-rendering-showing-great-migration.jpg',
    'construction.jpg.jpg',
    'temoin homme1.jpg',
    'temoin femme3.jpg',
    'temoin homme3.jpg',
    'attrape les wave et orange.jpg'
];

// Fonction pour optimiser une image avec ImageMagick
function optimizeImage(inputPath, outputPath, quality = 80) {
    try {
        const command = `magick "${inputPath}" -quality ${quality} -resize 1920x1080> "${outputPath}"`;
        execSync(command);
        console.log(`✅ Optimisé: ${path.basename(inputPath)}`);
        return true;
    } catch (error) {
        console.log(`❌ Erreur avec ${path.basename(inputPath)}: ${error.message}`);
        return false;
    }
}

// Fonction pour obtenir la taille d'un fichier en MB
function getFileSizeMB(filePath) {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
}

// Optimiser les images critiques
console.log('\n📸 Optimisation des images critiques...');
criticalImages.forEach(imageName => {
    const inputPath = path.join(imagesDir, imageName);
    const outputPath = path.join(optimizedDir, imageName);
    
    if (fs.existsSync(inputPath)) {
        const originalSize = getFileSizeMB(inputPath);
        console.log(`\n🔄 Optimisation de ${imageName} (${originalSize}MB)...`);
        
        if (optimizeImage(inputPath, outputPath)) {
            const optimizedSize = getFileSizeMB(outputPath);
            const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
            console.log(`📊 Réduction: ${originalSize}MB → ${optimizedSize}MB (${reduction}%)`);
        }
    } else {
        console.log(`⚠️  Image non trouvée: ${imageName}`);
    }
});

// Optimiser toutes les autres images JPG/PNG
console.log('\n📸 Optimisation des autres images...');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

fs.readdirSync(imagesDir).forEach(file => {
    const ext = path.extname(file);
    if (imageExtensions.includes(ext) && !criticalImages.includes(file)) {
        const inputPath = path.join(imagesDir, file);
        const outputPath = path.join(optimizedDir, file);
        
        const originalSize = getFileSizeMB(inputPath);
        console.log(`\n🔄 Optimisation de ${file} (${originalSize}MB)...`);
        
        if (optimizeImage(inputPath, outputPath, 85)) {
            const optimizedSize = getFileSizeMB(outputPath);
            const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
            console.log(`📊 Réduction: ${originalSize}MB → ${optimizedSize}MB (${reduction}%)`);
        }
    }
});

console.log('\n🎉 Optimisation terminée !');
console.log('📁 Les images optimisées sont dans le dossier: images/optimized/');
console.log('\n💡 Prochaines étapes:');
console.log('1. Remplacez les images originales par les optimisées');
console.log('2. Testez la vitesse de chargement');
console.log('3. Si nécessaire, réduisez encore la qualité (70-75)'); 