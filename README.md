# 🚀 GoldyX Trading - Écosystème Complet de Trading

Écosystème de trading complet comprenant plusieurs applications web, des outils d'analyse, et des systèmes de gestion de données pour le trading sur les marchés financiers, avec un focus particulier sur la **Session New York**.

---

## 📦 Applications Incluses

### 1. **trading-webapp-hostinger** - Application Principale
Application React + TypeScript + Supabase pour le trading quotidien
- ✅ Dashboard avec watchlist
- ✅ Journal de trading complet
- ✅ Statistiques et analyses
- ✅ News Risk Gate
- ✅ Session NY clock

📖 [Documentation complète](./trading-webapp-hostinger/README.md)

### 2. **nextcloud-webapp** - Gestion Nextcloud
Application React pour gérer les données via Nextcloud Kaflow
- ✅ Gestion de watchlist
- ✅ Analyses techniques
- ✅ Données économiques
- ✅ Corrélations

📖 [Documentation complète](./nextcloud-webapp/README.md)

### 3. **goldyrogers_dashboard_full.py** - Dashboard Flask
Dashboard d'alertes de trading en temps réel
- ✅ Alertes Wyckoff + RSI + Ichimoku
- ✅ API REST pour réception d'alertes
- ✅ Interface web simple

📖 [Guide de déploiement Render](./DEPLOY_RENDER.md)

---

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ (recommandé 20)
- Python 3.8+ (pour le dashboard Flask)
- Un compte Supabase (gratuit)
- Un compte GitHub

### Installation

1. **Cloner le repository** :
```bash
git clone https://github.com/LeDREVM/GoldXrodgers.git
cd GoldXrodgers
```

2. **Installer l'application principale** :
```bash
cd trading-webapp-hostinger
npm install
```

3. **Configurer Supabase** :
   - Créez un projet sur https://supabase.com/dashboard
   - Suivez le guide : [supabase/SETUP_DATABASE.md](./trading-webapp-hostinger/supabase/SETUP_DATABASE.md)

4. **Configurer les variables d'environnement** :
```bash
cp env.example.txt .env
# Éditez .env avec vos clés Supabase
```

5. **Lancer l'application** :
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

---

## 📚 Documentation

### Documentation Principale

- **[RESUME_PROJET_COMPLET.md](./RESUME_PROJET_COMPLET.md)** - Vue d'ensemble complète du projet
- **[CORRELATIONS_ENTRE_APPLICATIONS.md](./CORRELATIONS_ENTRE_APPLICATIONS.md)** - Interactions entre applications
- **[DEPLOY_RENDER.md](./DEPLOY_RENDER.md)** - Déploiement du dashboard Flask

### Documentation par Application

#### trading-webapp-hostinger
- [README.md](./trading-webapp-hostinger/README.md) - Guide principal
- [supabase/SETUP_DATABASE.md](./trading-webapp-hostinger/supabase/SETUP_DATABASE.md) - Configuration base de données
- [supabase/TROUBLESHOOTING.md](./trading-webapp-hostinger/supabase/TROUBLESHOOTING.md) - Dépannage
- [docs/mode_reel.md](./trading-webapp-hostinger/docs/mode_reel.md) - Déploiement production
- [docs/server_config.md](./trading-webapp-hostinger/docs/server_config.md) - Configuration serveur

#### nextcloud-webapp
- [README.md](./nextcloud-webapp/README.md) - Guide principal
- [QUICK_START.md](./nextcloud-webapp/QUICK_START.md) - Démarrage rapide

---

## 🏗️ Structure du Projet

```
GoldXrodgers/
├── trading-webapp-hostinger/    # Application principale React
├── nextcloud-webapp/             # Application Nextcloud
├── goldyrogers_dashboard_full.py # Dashboard Flask
├── MarketDrevm/                  # Données et analyses locales
├── supabase/                     # Migrations et config Supabase
├── docs/                         # Documentation globale
└── scripts/                      # Scripts utilitaires
```

---

## 🔧 Technologies Utilisées

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management

### Backend
- **Supabase** - Auth + PostgreSQL + Storage
- **Nextcloud Kaflow** - Stockage WebDAV
- **Flask** - API Python

### Infrastructure
- **Hostinger** - Hébergement web (statique)
- **Render.com** - Déploiement Python/Flask
- **Supabase Cloud** - Backend as a Service

---

## 📊 Instruments de Trading

Les applications suivent principalement :
- **US30** - Dow Jones Industrial Average
- **NAS100** - Nasdaq 100
- **XAUUSD** - Or vs Dollar US
- **USDJPY** - Dollar US vs Yen Japonais
- **XBRUSD** - Pétrole Brent vs Dollar US

---

## 🚀 Déploiement

### Application Principale (Hostinger)

```bash
cd trading-webapp-hostinger
npm run build:hostinger
# Uploader le contenu de dist/ sur Hostinger
```

📖 [Guide complet](./trading-webapp-hostinger/docs/mode_reel.md)

### Dashboard Flask (Render.com)

Le fichier `render.yaml` est configuré pour un déploiement automatique.

📖 [Guide complet](./DEPLOY_RENDER.md)

---

## 🔐 Sécurité

- **RLS (Row Level Security)** activé sur toutes les tables Supabase
- **Auth Supabase** pour l'authentification
- **Variables d'environnement** pour les secrets
- **HTTPS** en production

---

## 📝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 License

Ce projet est privé. Tous droits réservés.

---

## 🆘 Support

- **Documentation** : Consultez les fichiers README dans chaque dossier
- **Base de données** : [TROUBLESHOOTING.md](./trading-webapp-hostinger/supabase/TROUBLESHOOTING.md)
- **Issues** : Créez une issue sur GitHub

---

## 🎯 Roadmap

Voir [trading-webapp-hostinger/docs/roadmap_v2.md](./trading-webapp-hostinger/docs/roadmap_v2.md) pour les fonctionnalités à venir.

---

## 👥 Auteurs

- **LeDREVM** - Développement initial

---

## 🙏 Remerciements

- Supabase pour l'infrastructure backend
- React et la communauté open source
- Tous les contributeurs

---

**⭐ Si ce projet vous est utile, n'hésitez pas à le star sur GitHub !**
