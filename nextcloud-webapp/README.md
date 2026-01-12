# Nextcloud Web App - GoldyX Trading

Application web React utilisant Nextcloud Kaflow comme base de données pour le projet BreakZen Ultimate.

## 🚀 Fonctionnalités

- ✅ Connexion à Nextcloud Kaflow via WebDAV
- ✅ Gestion de la watchlist
- ✅ Stockage et récupération de données depuis Nextcloud
- ✅ Interface moderne et responsive
- ✅ Gestion des analyses, données économiques et corrélations

## 📋 Prérequis

- Node.js 18+ et npm
- Compte Nextcloud Kaflow avec accès WebDAV
- Variables d'environnement configurées

## 🔧 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` à la racine du projet :
```env
VITE_NEXTCLOUD_URL=https://ledream.kflw.io
VITE_NEXTCLOUD_USERNAME=negus_dja
VITE_NEXTCLOUD_PASSWORD=votre_mot_de_passe
VITE_NEXTCLOUD_BASE_PATH=/Trading
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Structure du projet

```
nextcloud-webapp/
├── src/
│   ├── components/      # Composants React
│   ├── config/          # Configuration
│   ├── hooks/           # Hooks personnalisés
│   ├── services/        # Services (Nextcloud)
│   ├── types/           # Types TypeScript
│   ├── App.tsx          # Composant principal
│   ├── App.css          # Styles
│   └── main.tsx         # Point d'entrée
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 📁 Structure Nextcloud

L'application utilise la structure suivante dans Nextcloud :

```
/Trading/
├── watchlist.json
├── analyses/
│   └── *.json
├── economic_data/
│   └── events.json
├── correlations/
│   └── correlations.json
├── charts/
└── backups/
```

## 🔐 Sécurité

⚠️ **Important** : Ne commitez jamais le fichier `.env` contenant vos identifiants Nextcloud. Il est déjà dans `.gitignore`.

## 🛠️ Développement

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production

## 📝 Notes

- L'application utilise l'API WebDAV de Nextcloud pour toutes les opérations de stockage
- Les données sont stockées au format JSON
- La connexion à Nextcloud est automatique au démarrage de l'application

## 🐛 Dépannage

Si vous rencontrez des erreurs de connexion :
1. Vérifiez que vos identifiants Nextcloud sont corrects dans `.env`
2. Vérifiez que l'URL Nextcloud est accessible
3. Vérifiez que l'utilisateur a les permissions d'écriture dans `/Trading`
