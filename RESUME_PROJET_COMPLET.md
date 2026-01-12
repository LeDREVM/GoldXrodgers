# 📊 Résumé Complet du Projet GoldyX

## 🎯 Vue d'Ensemble

**GoldyX** est un écosystème de trading complet comprenant plusieurs applications web, des outils d'analyse, et des systèmes de gestion de données pour le trading sur les marchés financiers, avec un focus particulier sur la **Session New York**.

---

## 📁 Structure du Projet

### 1. **trading-webapp-hostinger/** - Application Web de Trading Principale

**Type** : Application React + TypeScript + Vite  
**Backend** : Supabase (Auth + PostgreSQL + Storage + RLS)  
**Déploiement** : Hostinger (hébergement mutualisé, front statique)

#### Fonctionnalités Principales :
- ✅ **Authentification** : Email/password via Supabase Auth
- ✅ **Dashboard** : 
  - Watchlist (US30, NAS100, XAUUSD, USDJPY, XBRUSD)
  - Horloge de session NY avec timezone America/Martinique
  - Panneau de biais de marché
  - Statut du marché
- ✅ **News Risk Gate** : Système d'alertes basé sur les événements économiques (`economic_events`)
- ✅ **Journal de Trading** : 
  - CRUD complet des trades
  - Tags personnalisés
  - Calcul automatique du R-multiple
  - Upload de screenshots
  - Filtres avancés
- ✅ **Statistiques** : 
  - Winrate
  - R-multiple moyen
  - Résumé des performances

#### Structure Technique :
```
trading-webapp-hostinger/
├── src/
│   ├── components/
│   │   ├── dashboard/      # Composants du tableau de bord
│   │   ├── journal/        # Composants du journal de trading
│   │   ├── news/           # Composants des actualités économiques
│   │   ├── stats/          # Composants de statistiques
│   │   ├── layout/         # Layout et navigation
│   │   └── ui/             # Composants UI réutilisables
│   ├── routes/             # Routes de l'application
│   ├── services/           # Services (auth, trades, events, storage)
│   ├── store/              # State management (Zustand)
│   ├── hooks/              # Hooks React personnalisés
│   ├── lib/                # Utilitaires (date, format, risk, validators)
│   ├── config/             # Configuration (instruments, sessions, constants)
│   └── types/              # Types TypeScript
├── supabase/
│   ├── migrations/         # Migrations SQL
│   ├── policies/           # Politiques RLS
│   └── docs/               # Documentation Supabase
├── scripts/                # Scripts de build et déploiement
├── docs/                   # Documentation du projet
└── hostinger/              # Configuration Hostinger
```

#### Technologies :
- **Frontend** : React 18, TypeScript, Vite
- **Backend** : Supabase (PostgreSQL, Auth, Storage)
- **Routing** : React Router v6
- **State** : Zustand (stores)
- **Build** : Vite avec optimisations production

---

### 2. **nextcloud-webapp/** - Application Web Nextcloud

**Type** : Application React + TypeScript + Vite  
**Backend** : Nextcloud Kaflow (WebDAV)  
**Objectif** : Gestion de watchlist et données de trading via Nextcloud

#### Fonctionnalités :
- ✅ Connexion à Nextcloud Kaflow via WebDAV
- ✅ Gestion de la watchlist
- ✅ Stockage et récupération de données depuis Nextcloud
- ✅ Interface moderne et responsive
- ✅ Gestion des analyses, données économiques et corrélations

#### Structure :
```
nextcloud-webapp/
├── src/
│   ├── components/
│   │   ├── ConnectionStatus.tsx
│   │   └── Watchlist.tsx
│   ├── hooks/
│   │   ├── useNextcloud.ts
│   │   └── useWatchlist.ts
│   ├── services/
│   │   └── nextcloudService.ts
│   ├── config/
│   │   └── nextcloud.ts
│   └── types/
└── public/
```

#### Structure Nextcloud Utilisée :
```
/Trading/
├── watchlist.json
├── analyses/*.json
├── economic_data/events.json
├── correlations/correlations.json
├── charts/
└── backups/
```

---

### 3. **goldyrogers_dashboard_full.py** - Dashboard Flask

**Type** : Application Python Flask  
**Déploiement** : Render.com (via `render.yaml`)  
**Objectif** : Dashboard d'alertes de trading en temps réel

#### Fonctionnalités :
- ✅ Affichage des alertes de trading (Wyckoff + RSI + Ichimoku)
- ✅ API REST pour recevoir des alertes
- ✅ Interface web simple avec historique des alertes
- ✅ Stockage JSON des alertes

#### Endpoints :
- `GET /` : Dashboard des alertes
- `POST /post` : Réception d'alertes (JSON)

#### Technologies :
- Flask
- JSON pour stockage
- HTML/CSS inline

---

### 4. **MarketDrevm/** - Données et Analyses de Marché

**Type** : Dossier de données et analyses  
**Objectif** : Stockage local de données de trading et analyses

#### Structure :
```
MarketDrevm/
├── Trading/
│   ├── analyses/           # Analyses techniques
│   ├── backups/            # Sauvegardes
│   ├── charts/             # Graphiques
│   ├── correlation/        # Analyses de corrélation
│   └── economic_data/      # Données économiques
├── breakzen                # Fichier/dossier BreakZen
├── projet GoldyX.txt       # Documentation du projet
└── Watchlist_TradingView.csv
```

#### Fichiers CSV :
- `Watchlist_TradingView.csv` : Watchlist pour TradingView
- `Portefeuille_Watchlist_01092026.csv` : Portefeuille de watchlist
- `Tableau_de_bord_quotidien___Session_NY.csv` : Tableau de bord quotidien

---

### 5. **goldyrogers_render_full/** - Configuration Render

**Type** : Configuration de déploiement  
**Objectif** : Déploiement du dashboard Flask sur Render.com

#### Contenu :
- Configuration pour déploiement Python
- Requirements pour l'environnement Python

---

### 6. **Fichiers Racine**

#### Configuration :
- `package.json` : Configuration principale (référence à trading-webapp-hostinger)
- `requirements.txt` : Dépendances Python (pandas, numpy, requests, MetaTrader5, FastAPI, etc.)
- `render.yaml` : Configuration de déploiement Render.com
- `alertes.json` : Fichier de stockage des alertes (utilisé par Flask)

#### Données :
- `alertes.json` : Historique des alertes de trading
- `Watchlist_TradingView.csv` : Watchlist principale
- `Portefeuille_Watchlist_01092026.csv` : Portefeuille de trading
- `Tableau_de_bord_quotidien___Session_NY.csv` : Données de session NY

---

## 🔧 Technologies Utilisées

### Frontend :
- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Build tool et dev server
- **React Router** : Routing
- **Zustand** : State management (trading-webapp-hostinger)

### Backend :
- **Supabase** : 
  - PostgreSQL (base de données)
  - Auth (authentification)
  - Storage (fichiers/screenshots)
  - RLS (Row Level Security)
- **Nextcloud Kaflow** : Stockage WebDAV
- **Flask** : API Python pour alertes
- **FastAPI** : API Python (dépendances)

### Outils Python :
- **pandas** : Manipulation de données
- **numpy** : Calculs numériques
- **MetaTrader5** : Intégration MT5
- **requests** : Requêtes HTTP
- **beautifulsoup4** : Scraping web
- **plotly** : Visualisation
- **python-telegram-bot** : Bot Telegram

### Infrastructure :
- **Hostinger** : Hébergement web (mutualisé)
- **Render.com** : Déploiement Python/Flask
- **Supabase Cloud** : Backend as a Service

---

## 📊 Instruments de Trading Suivis

Les applications suivent principalement :
- **US30** : Dow Jones Industrial Average
- **NAS100** : Nasdaq 100
- **XAUUSD** : Or vs Dollar US
- **USDJPY** : Dollar US vs Yen Japonais
- **XBRUSD** : Pétrole Brent vs Dollar US

---

## 🎯 Objectifs et Cas d'Usage

### 1. Trading Session NY
- Focus sur la session de trading de New York
- Timezone configurée : America/Martinique
- Gestion des événements économiques impactants

### 2. Journal de Trading
- Enregistrement systématique des trades
- Analyse de performance (R-multiple, winrate)
- Upload de screenshots pour documentation

### 3. Gestion de Watchlist
- Suivi multi-instruments
- Synchronisation via Nextcloud
- Export/Import CSV

### 4. Alertes en Temps Réel
- Système d'alertes techniques (Wyckoff, RSI, Ichimoku)
- Dashboard Flask pour visualisation
- API pour réception d'alertes

---

## 🚀 Déploiement

### trading-webapp-hostinger
1. Build : `npm run build:hostinger`
2. Upload du dossier `dist/` sur Hostinger
3. Configuration `.htaccess` pour routing SPA

### goldyrogers_dashboard_full.py
1. Déploiement automatique via Render.com
2. Configuration via `render.yaml`
3. Variables d'environnement : `PORT`, `FLASK_ENV`

### nextcloud-webapp
1. Build : `npm run build`
2. Déploiement statique sur serveur web
3. Configuration variables d'environnement Nextcloud

---

## 📝 Documentation Disponible

### trading-webapp-hostinger/docs/
- `mode_reel.md` : Guide de déploiement en production
- `ny_session_rules.md` : Règles de la session NY
- `product_spec.md` : Spécifications produit
- `roadmap_v2.md` : Roadmap du projet
- `ux_wireflow.md` : Wireframes et flux UX

### trading-webapp-hostinger/supabase/docs/
- `rls_explained.md` : Explication des politiques RLS
- `storage_paths.md` : Chemins de stockage
- `supabase_setup.md` : Guide de configuration Supabase

### Scripts et Guides
- `trading-webapp-hostinger/scripts/` : Scripts de build, migration, vérification
- `trading-webapp-hostinger/hostinger/DEPLOY_HOSTINGER.md` : Guide de déploiement Hostinger

---

## 🔐 Sécurité

- **RLS (Row Level Security)** : Politiques de sécurité au niveau des lignes dans Supabase
- **Auth Supabase** : Authentification sécurisée
- **Variables d'environnement** : Secrets stockés dans `.env` (non commitées)
- **HTTPS** : Communication sécurisée

---

## 📈 État du Projet

### ✅ Fonctionnel
- Application de trading principale (trading-webapp-hostinger)
- Dashboard d'alertes Flask
- Application Nextcloud
- Base de données Supabase configurée
- Système d'authentification

### 🔄 En Développement / Amélioration
- Documentation en cours
- Optimisations de performance
- Nouvelles fonctionnalités selon roadmap

---

## 🎓 Points Clés

1. **Architecture Modulaire** : Séparation claire entre applications
2. **Multi-Backend** : Supabase pour l'app principale, Nextcloud pour données alternatives
3. **Focus Session NY** : Optimisé pour le trading pendant la session de New York
4. **TypeScript** : Code typé pour meilleure maintenabilité
5. **Déploiement Flexible** : Support Hostinger (statique) et Render.com (Python)

---

## 📞 Support et Maintenance

- Documentation dans chaque sous-projet
- Scripts automatisés pour build et déploiement
- Migrations SQL versionnées
- Configuration via variables d'environnement

---

## 🔗 Corrélations Entre Applications

Pour une analyse détaillée des interactions et corrélations entre toutes les applications du projet, consultez le document **[CORRELATIONS_ENTRE_APPLICATIONS.md](./CORRELATIONS_ENTRE_APPLICATIONS.md)**.

Ce document couvre :
- Les données partagées entre applications
- Les flux de synchronisation
- Les points d'intégration potentiels
- Les recommandations d'amélioration

---

**Dernière mise à jour** : Analyse complète de la structure du projet GoldyX
