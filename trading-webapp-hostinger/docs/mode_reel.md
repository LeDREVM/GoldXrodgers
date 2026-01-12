# Configuration Mode Réel (Production)

Ce guide explique comment configurer et déployer l'application en mode réel (production).

## Prérequis

1. Compte Supabase avec projet de production
2. Variables d'environnement configurées
3. Accès au serveur Hostinger

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env` à la racine du projet avec vos credentials de production :

```env
# Supabase Production
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_production
```

⚠️ **Important** : Ne commitez jamais le fichier `.env` dans Git. Il est déjà dans `.gitignore`.

### 2. Vérification des variables

Avant de builder, vérifiez que toutes les variables sont correctement configurées :

```bash
npm run verify:env
```

### 3. Build pour la production

Pour créer un build optimisé pour la production :

```bash
npm run build:prod
```

Ou utilisez le script complet pour Hostinger :

```bash
npm run build:hostinger
```

Le script `build_hostinger.sh` :
- Vérifie les variables d'environnement
- Installe les dépendances si nécessaire
- Effectue la vérification TypeScript
- Crée le build de production
- Vérifie que le dossier `dist/` a été créé

## Déploiement

### 1. Préparer les fichiers

Après le build, le dossier `dist/` contient tous les fichiers nécessaires.

### 2. Upload sur Hostinger

1. Connectez-vous à votre compte Hostinger
2. Accédez au File Manager
3. Naviguez vers le dossier `public_html` (ou votre dossier racine)
4. Uploadez tous les fichiers du dossier `dist/`

### 3. Configuration .htaccess

Copiez le fichier `hostinger/htaccess.example` vers `.htaccess` à la racine de votre site pour activer le routing SPA.

### 4. Vérification

1. Visitez votre site
2. Vérifiez que l'application se charge correctement
3. Testez l'authentification
4. Vérifiez les fonctionnalités principales

## Différences Mode Dev vs Production

| Fonctionnalité | Mode Dev | Mode Production |
|----------------|----------|-----------------|
| Source maps | Activés | Désactivés |
| Minification | Non | Oui |
| Code splitting | Basique | Optimisé |
| Analytics | Désactivé | Activé |
| Debug mode | Activé | Désactivé |
| Logs | Debug | Error uniquement |

## Dépannage

### Erreur : Variables d'environnement manquantes

```bash
npm run verify:env
```

Vérifiez que votre fichier `.env` contient toutes les variables requises.

### Erreur : Build échoue

1. Vérifiez les erreurs TypeScript : `npm run build`
2. Vérifiez que toutes les dépendances sont installées : `npm install`
3. Consultez les logs d'erreur dans la console

### L'application ne se charge pas

1. Vérifiez que le fichier `.htaccess` est présent
2. Vérifiez les permissions des fichiers sur le serveur
3. Vérifiez les logs d'erreur du serveur

## Sécurité

- ✅ Ne jamais commiter le fichier `.env`
- ✅ Utiliser des clés de production différentes des clés de développement
- ✅ Activer RLS (Row Level Security) sur Supabase
- ✅ Configurer les politiques de stockage appropriées
- ✅ Utiliser HTTPS en production

## Support

Pour plus d'informations, consultez :
- [Documentation Supabase](https://supabase.com/docs)
- [Guide de déploiement Hostinger](./hostinger/DEPLOY_HOSTINGER.md)
- [Configuration RLS](./supabase/docs/rls_explained.md)
