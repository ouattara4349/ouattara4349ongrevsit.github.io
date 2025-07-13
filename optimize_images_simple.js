const fs = require('fs');
const path = require('path');

console.log('🖼️  Analyse des images pour optimisation...');

const imagesDir = './images';
const reportFile = './image_optimization_report.md';

// Fonction pour obtenir la taille d'un fichier en MB
function getFileSizeMB(filePath) {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
}

// Fonction pour analyser les images
function analyzeImages() {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
    const images = [];
    
    if (!fs.existsSync(imagesDir)) {
        console.log('❌ Dossier images non trouvé');
        return;
    }
    
    fs.readdirSync(imagesDir).forEach(file => {
        const ext = path.extname(file);
        if (imageExtensions.includes(ext)) {
            const filePath = path.join(imagesDir, file);
            const size = getFileSizeMB(filePath);
            images.push({ name: file, size: parseFloat(size), path: filePath });
        }
    });
    
    return images.sort((a, b) => b.size - a.size);
}

// Fonction pour générer le rapport
function generateReport(images) {
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);
    const oversizedImages = images.filter(img => img.size > 1); // > 1MB
    
    let report = `# 📊 Rapport d'Optimisation des Images

## 📈 Statistiques Générales

- **Nombre total d'images** : ${images.length}
- **Taille totale** : ${totalSize.toFixed(2)}MB
- **Images > 1MB** : ${oversizedImages.length}
- **Économie potentielle** : ${(totalSize * 0.8).toFixed(2)}MB (80% de réduction)

## 🚨 Images Critiques (> 1MB)

| Image | Taille Actuelle | Taille Cible | Réduction |
|-------|----------------|--------------|-----------|
`;

    oversizedImages.forEach(img => {
        const targetSize = (img.size * 0.1).toFixed(2); // 10% de la taille originale
        const reduction = (img.size * 0.9).toFixed(2);
        report += `| ${img.name} | ${img.size}MB | ${targetSize}MB | ${reduction}MB |\n`;
    });

    report += `
## 🎯 Plan d'Optimisation

### Étape 1 : Images Prioritaires
Ces images doivent être optimisées en premier :

`;

    oversizedImages.slice(0, 5).forEach((img, index) => {
        report += `${index + 1}. **${img.name}** (${img.size}MB) → Cible : ${(img.size * 0.1).toFixed(2)}MB\n`;
    });

    report += `
### Étape 2 : Outils Recommandés

#### Option A : Outils en Ligne (Gratuits)
- **TinyPNG** : https://tinypng.com/
- **Squoosh** : https://squoosh.app/
- **Compressor.io** : https://compressor.io/

#### Option B : Logiciels Desktop
- **GIMP** (Gratuit) : https://www.gimp.org/
- **Paint.NET** (Gratuit) : https://www.getpaint.net/
- **Photoshop** (Payant)

### Étape 3 : Paramètres d'Optimisation

#### Pour les Images Web :
- **Format** : JPEG pour photos, PNG pour logos
- **Qualité** : 70-80% pour JPEG
- **Résolution** : 1920x1080 maximum
- **Taille cible** : < 500KB par image

## 📋 Checklist d'Optimisation

`;

    images.forEach(img => {
        const status = img.size > 1 ? '❌' : img.size > 0.5 ? '⚠️' : '✅';
        report += `- [ ] ${status} ${img.name} (${img.size}MB)\n`;
    });

    report += `
## 🎉 Résultats Attendus

Après optimisation :
- **Temps de chargement** : 15-30s → 2-5s
- **Score PageSpeed** : 20-40 → 80-95/100
- **Expérience utilisateur** : Excellente
- **SEO** : Amélioré

## 🔧 Instructions Détaillées

### Pour chaque image > 1MB :

1. **Ouvrir l'image** dans un éditeur
2. **Redimensionner** à 1920x1080 maximum
3. **Réduire la qualité** à 70-80%
4. **Sauvegarder** avec un nouveau nom
5. **Tester** la qualité visuelle
6. **Remplacer** l'originale

### Exemple de commande GIMP :
\`\`\`
File → Export As → Quality: 75 → Export
\`\`\`

## 📞 Support

En cas de problème :
1. Testez avec une image plus petite
2. Vérifiez la qualité visuelle
3. Ajustez les paramètres si nécessaire
`;

    return report;
}

// Fonction principale
function main() {
    console.log('🔍 Analyse des images...');
    
    const images = analyzeImages();
    if (!images || images.length === 0) {
        console.log('❌ Aucune image trouvée');
        return;
    }
    
    console.log(`📊 ${images.length} images analysées`);
    
    const oversizedImages = images.filter(img => img.size > 1);
    console.log(`🚨 ${oversizedImages.length} images > 1MB détectées`);
    
    if (oversizedImages.length > 0) {
        console.log('\n📸 Images les plus lourdes :');
        oversizedImages.slice(0, 5).forEach((img, index) => {
            console.log(`${index + 1}. ${img.name} : ${img.size}MB`);
        });
    }
    
    // Générer le rapport
    const report = generateReport(images);
    fs.writeFileSync(reportFile, report);
    
    console.log(`\n📄 Rapport généré : ${reportFile}`);
    console.log('\n💡 Prochaines étapes :');
    console.log('1. Ouvrez le rapport d\'optimisation');
    console.log('2. Optimisez les images avec les outils recommandés');
    console.log('3. Remplacez les images originales');
    console.log('4. Testez la performance');
    
    // Afficher un résumé
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);
    console.log(`\n📈 Résumé :`);
    console.log(`- Taille totale : ${totalSize.toFixed(2)}MB`);
    console.log(`- Économie potentielle : ${(totalSize * 0.8).toFixed(2)}MB`);
    console.log(`- Amélioration attendue : 80-90%`);
}

// Lancer l'analyse
main(); 