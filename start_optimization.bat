@echo off
echo ========================================
echo   OPTIMISATION ONG RENAISSANCE ESPOIR
echo ========================================
echo.

echo 🚀 Démarrage de l'optimisation...
echo.

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé !
    echo 📥 Téléchargez-le depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js détecté
echo.

REM Vérifier si ImageMagick est installé
magick --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  ImageMagick n'est pas installé !
    echo 📥 Téléchargez-le depuis: https://imagemagick.org/script/download.php#windows
    echo.
    echo 🔄 Continuation sans optimisation d'images...
    echo.
    goto :css_optimization
)

echo ✅ ImageMagick détecté
echo.

:image_optimization
echo 📸 Optimisation des images...
npm run optimize-images
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'optimisation des images
    pause
    exit /b 1
)
echo.

:css_optimization
echo 🎨 Optimisation du CSS...
npm run optimize-css
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'optimisation du CSS
    pause
    exit /b 1
)
echo.

:html_optimization
echo 🖼️  Optimisation HTML (lazy loading)...
npm run optimize-html
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'optimisation HTML
    pause
    exit /b 1
)
echo.

echo ========================================
echo 🎉 OPTIMISATION TERMINÉE !
echo ========================================
echo.
echo 📁 Fichiers optimisés créés :
echo    - images/optimized/ (images optimisées)
echo    - style.optimized.css (CSS minifié)
echo    - *.optimized.html (HTML avec lazy loading)
echo.
echo 🔄 Prochaines étapes :
echo    1. Testez les fichiers optimisés
echo    2. Remplacez les fichiers originaux
echo    3. Testez la performance sur PageSpeed Insights
echo.
echo 🌐 Test de performance : https://pagespeed.web.dev/
echo.
pause 