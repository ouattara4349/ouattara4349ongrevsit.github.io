# 🌟 Site Web - Renaissance Espoir de Vie

Site web professionnel pour l'ONG **Renaissance Espoir de Vie**, une organisation humanitaire ivoirienne œuvrant pour la réinsertion sociale et le soutien des populations vulnérables.

## 📋 Description du projet

Ce site web a été conçu pour présenter l'ONG, ses actions, ses témoignages et permettre aux visiteurs de faire des dons ou de devenir bénévoles. Le site est entièrement responsive et utilise des technologies modernes (HTML5, CSS3, JavaScript vanilla) sans dépendances externes lourdes.

## 🎯 Fonctionnalités principales

### ✅ Pages créées
- **Accueil** (`index.html`) - Page principale avec hero, statistiques, actions principales
- **À propos** (`apropos.html`) - Présentation de l'ONG, équipe, valeurs
- **Nos actions** (`actions.html`) - Projets en cours et réalisés
- **Témoignages** (`temoignages.html`) - Histoires inspirantes des bénéficiaires
- **Devenir bénévole** (`devenir-benevole.html`) - Formulaire de candidature bénévole
- **Faire un don** (`dons.html`) - Options de don et méthodes de paiement
- **Contact** (`contact.html`) - Formulaire de contact et informations

### ✅ Fonctionnalités techniques
- **Design responsive** - Compatible mobile, tablette et desktop
- **Animations fluides** - Effets CSS et JavaScript pour une expérience moderne
- **Formulaires fonctionnels** - Validation et envoi des données
- **Navigation intuitive** - Menu hamburger pour mobile
- **Optimisation SEO** - Meta tags, structure sémantique
- **Accessibilité** - Respect des standards WCAG

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique et accessible
- **CSS3** - Styles modernes avec Flexbox et Grid
- **JavaScript Vanilla** - Interactions et animations
- **Google Fonts** - Typographies Poppins et Open Sans
- **Font Awesome** - Icônes vectorielles

### Outils de développement
- **Responsive Design** - Mobile-first approach
- **CSS Variables** - Système de couleurs cohérent
- **Intersection Observer API** - Animations au scroll
- **Form Validation** - Validation côté client

## 📁 Structure du projet

```
ong-rrev/
├── index.html                 # Page d'accueil
├── apropos.html              # Page À propos
├── actions.html              # Page Nos actions
├── temoignages.html          # Page Témoignages
├── devenir-benevole.html     # Page Devenir bénévole
├── dons.html                 # Page Faire un don
├── contact.html              # Page Contact
├── README.md                 # Documentation
├── assets/
│   ├── css/
│   │   ├── style.css         # Styles principaux
│   │   └── animations.css    # Animations avancées
│   ├── js/
│   │   ├── main.js           # JavaScript principal
│   │   └── animations.js     # Animations JavaScript
│   └── images/
│       └── logo.png          # Logo de l'ONG
└── pages/                    # Pages supplémentaires (à créer)
    ├── evenements.html       # Événements
    ├── galerie.html          # Galerie photo/vidéo
    └── mentions-legales.html # Mentions légales
```

## 🎨 Charte graphique

### Couleurs principales (drapeau ivoirien)
- **Orange** (`#FF8C00`) - Espoir et chaleur humaine
- **Blanc** (`#FFFFFF`) - Pureté et transparence
- **Vert** (`#009639`) - Croissance et renouveau

### Couleurs secondaires
- **Orange secondaire** (`#FF6B35`)
- **Vert secondaire** (`#006400`)
- **Or accent** (`#FFD700`)

### Typographies
- **Poppins** - Titres et éléments importants
- **Open Sans** - Corps de texte et descriptions

## 🚀 Installation et utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel pour développement)

### Installation
1. Téléchargez ou clonez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Ou utilisez un serveur local pour un développement optimal

### Développement local
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve .

# Avec PHP
php -S localhost:8000
```

## 📱 Responsive Design

Le site est entièrement responsive avec les breakpoints suivants :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## ⚡ Performance

### Optimisations réalisées
- Images optimisées et responsives
- CSS et JS minifiés
- Chargement asynchrone des polices
- Animations optimisées avec `requestAnimationFrame`
- Lazy loading des images (à implémenter)

### Métriques cibles
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

## 🔧 Fonctionnalités avancées

### Animations
- **Scroll animations** - Éléments qui apparaissent au scroll
- **Hover effects** - Interactions sur les cartes et boutons
- **Loading animations** - Effets de chargement
- **Parallax effects** - Effets de profondeur

### Interactivité
- **Sliders** - Témoignages et galeries
- **Filtres** - Tri des projets par catégorie
- **Formulaires** - Validation en temps réel
- **Navigation** - Menu mobile avec animations

## 📊 Analytics et suivi

### Métriques à implémenter
- Google Analytics 4
- Suivi des conversions (dons, bénévolat)
- Heatmaps pour l'UX
- Tests A/B pour l'optimisation

## 🔒 Sécurité

### Mesures implémentées
- Validation côté client et serveur
- Protection contre les injections XSS
- HTTPS obligatoire en production
- Politique de confidentialité

## 🌐 Déploiement

### Options recommandées
- **Netlify** - Déploiement gratuit et automatique
- **Vercel** - Performance optimale
- **GitHub Pages** - Intégration Git
- **Hébergement traditionnel** - Contrôle total

### Configuration de production
1. Optimisation des images
2. Minification CSS/JS
3. Compression Gzip
4. Cache headers
5. SSL certificate

## 📈 SEO et Marketing

### Optimisations SEO
- Meta tags optimisés
- Structure de données JSON-LD
- Sitemap XML
- Robots.txt
- URLs propres et descriptives

### Réseaux sociaux
- Open Graph tags
- Twitter Cards
- Partage optimisé
- Intégration des réseaux sociaux

## 🤝 Contribution

### Comment contribuer
1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

### Standards de code
- HTML sémantique
- CSS BEM methodology
- JavaScript ES6+
- Commentaires en français

## 📞 Support

### Contact technique
- **Email** : contact@renaissance-espoir.org
- **Téléphone** : +225 27 22 49 89 12
- **WhatsApp** : +225 07 08 09 10 11

### Documentation
- [Guide utilisateur](docs/user-guide.md)
- [Guide développeur](docs/developer-guide.md)
- [Charte graphique](docs/design-system.md)

## 📄 Licence

Ce projet est développé pour l'ONG Renaissance Espoir de Vie. Tous droits réservés.

## 🙏 Remerciements

- **Unsplash** - Images libres de droits
- **Google Fonts** - Typographies
- **Font Awesome** - Icônes
- **Communauté open source** - Outils et ressources

---

**Renaissance Espoir de Vie** - Redonnons espoir ensemble 🌟 

---

## 🚀 Modifications et configuration EmailJS (2024)

### Suppression du formulaire de don
- Le formulaire de don a été supprimé du site car les numéros de paiement mobile (Wave, Orange Money, MTN MoMo) sont affichés directement et suffisent pour les dons.
- Les visiteurs peuvent faire un don en utilisant les numéros affichés dans la section "Faire un Don".

### Formulaires fonctionnels avec EmailJS
- Les formulaires de **contact** et de **candidature bénévole** sont entièrement fonctionnels grâce à l'intégration d'EmailJS.
- **Aucun backend n'est nécessaire** : l'envoi d'email se fait directement depuis le navigateur.

#### Configuration utilisée :
- **Service ID** : `service_bopookk`
- **Public Key** : `nZYZOsyl1MGMrUd1R`
- **Template ID Contact** : (exemple) `template_lvbio5g`
- **Template ID Bénévole** : (exemple) `template_j39ncbs`

#### Variables à utiliser dans les templates EmailJS :
- **Contact** : `{{nom}}`, `{{email}}`, `{{sujet}}`, `{{message}}`
- **Bénévole** : `{{nom}}`, `{{email}}`, `{{telephone}}`, `{{age}}`, `{{disponibilite}}`, `{{competences}}`, `{{motivation}}`

#### Exemple de contenu pour le template Contact :
```html
<h2>Nouveau message de contact</h2>
<p><strong>Nom :</strong> {{nom}}</p>
<p><strong>Email :</strong> {{email}}</p>
<p><strong>Sujet :</strong> {{sujet}}</p>
<p><strong>Message :</strong> {{message}}</p>
```

#### Exemple de contenu pour le template Bénévole :
```html
<h2>Nouvelle candidature bénévole</h2>
<p><strong>Nom :</strong> {{nom}}</p>
<p><strong>Email :</strong> {{email}}</p>
<p><strong>Téléphone :</strong> {{telephone}}</p>
<p><strong>Âge :</strong> {{age}}</p>
<p><strong>Disponibilités :</strong> {{disponibilite}}</p>
<p><strong>Compétences :</strong> {{competences}}</p>
<p><strong>Motivation :</strong> {{motivation}}</p>
```

#### Bonnes pratiques :
- Toujours utiliser les **Template ID** exacts affichés dans EmailJS.
- Les variables dans le code et dans le template doivent être **identiques** (respecter la casse et l'orthographe).
- Tester chaque formulaire après modification pour vérifier la bonne réception des emails.

--- # o u a t t a r a 4 3 4 9 o n g r e v s i t . g i t h u b . i o  
 # o u a t t a r a 4 3 4 9 o n g r e v s i t . g i t h u b . i o  
 # o u a t t a r a 4 3 4 9 o n g r e v s i t . g i t h u b . i o  
 # o u a t t a r a 4 3 4 9 o n g r e v s i t . g i t h u b . i o  
 