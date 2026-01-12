# 🚀 Guide de Démarrage Rapide

## Installation

1. **Installer les dépendances** :
```bash
cd nextcloud-webapp
npm install
```

2. **Configurer les variables d'environnement** :
Créez un fichier `.env` à la racine du projet `nextcloud-webapp/` :

```env
VITE_NEXTCLOUD_URL=https://ledream.kflw.io
VITE_NEXTCLOUD_USERNAME=negus_dja
VITE_NEXTCLOUD_PASSWORD=votre_mot_de_passe_ici
VITE_NEXTCLOUD_BASE_PATH=/Trading
```

⚠️ **Important** : Remplacez `votre_mot_de_passe_ici` par votre vrai mot de passe Nextcloud.

3. **Lancer l'application** :
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## Structure Nextcloud

L'application utilise la structure suivante dans votre Nextcloud :

```
/Trading/
├── watchlist.json          # Votre watchlist
├── analyses/               # Dossier des analyses
│   └── *.json
├── economic_data/          # Données économiques
│   └── events.json
├── correlations/           # Corrélations
│   └── correlations.json
├── charts/                 # Graphiques (futur)
└── backups/                # Sauvegardes (futur)
```

## Fonctionnalités

- ✅ Connexion automatique à Nextcloud au démarrage
- ✅ Gestion de la watchlist (ajout/suppression)
- ✅ Interface moderne et responsive
- ✅ Stockage sécurisé dans Nextcloud

## Dépannage

### Erreur de connexion
- Vérifiez que l'URL Nextcloud est correcte (sans double `https://`)
- Vérifiez vos identifiants dans le fichier `.env`
- Vérifiez que l'utilisateur a les permissions d'écriture dans `/Trading`

### Erreur "Cannot find module"
- Exécutez `npm install` pour installer les dépendances
