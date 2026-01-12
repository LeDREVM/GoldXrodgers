# 🔗 Corrélations et Interactions Entre les Applications GoldyX

## 📊 Vue d'Ensemble des Interactions

L'écosystème GoldyX est composé de plusieurs applications qui interagissent et partagent des données pour créer un système de trading complet. Ce document détaille toutes les corrélations entre ces applications.

---

## 🎯 Architecture Globale des Corrélations

```
┌─────────────────────────────────────────────────────────────┐
│                    ÉCOSYSTÈME GOLDYX                        │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ trading-webapp│    │ nextcloud-web │    │ Flask Dashboard│
│  -hostinger   │    │     -app      │    │  (Alertes)     │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  MarketDrevm/    │
                    │  (Données CSV)   │
                    └─────────────────┘
```

---

## 1. 🔄 Corrélations entre trading-webapp-hostinger et nextcloud-webapp

### 1.1 **Données Partagées : Watchlist**

**trading-webapp-hostinger** :
- Watchlist codée en dur dans `src/config/constants.ts`
- Instruments : `["US30", "NAS100", "XAUUSD", "USDJPY", "XBRUSD"]`
- Affichage dans le Dashboard
- **État actuel** : Statique, non synchronisée

**nextcloud-webapp** :
- Watchlist stockée dans Nextcloud : `/Trading/watchlist.json`
- Gestion dynamique (ajout/suppression)
- Stockage persistant via WebDAV

**🔗 Corrélation** :
- **Potentiel de synchronisation** : Les deux apps utilisent les mêmes instruments
- **Opportunité** : La watchlist Nextcloud pourrait être importée dans l'app principale
- **Fichiers CSV communs** : `Watchlist_TradingView.csv` à la racine

```typescript
// trading-webapp-hostinger/src/config/constants.ts
export const DEFAULT_WATCHLIST = ["US30", "NAS100", "XAUUSD", "USDJPY", "XBRUSD"];

// nextcloud-webapp stocke dans /Trading/watchlist.json
// Structure similaire mais avec métadonnées supplémentaires
```

---

### 1.2 **Données Partagées : Événements Économiques**

**trading-webapp-hostinger** :
- Stockage dans Supabase : table `economic_events`
- Service : `src/services/events.service.ts`
- Affichage dans le composant `NewsGate`
- Filtrage par date et impact

**nextcloud-webapp** :
- Stockage dans Nextcloud : `/Trading/economic_data/events.json`
- Service : `nextcloudService.getEconomicData()`
- Structure JSON similaire

**🔗 Corrélation** :
- **Données similaires** : Les deux apps gèrent des événements économiques
- **Source potentielle commune** : `MarketDrevm/Trading/economic_data/`
- **Synchronisation possible** : Script d'import/export entre Supabase et Nextcloud

```typescript
// trading-webapp-hostinger : Supabase
economic_events {
  id, event_time_utc, currency, impact, name, actual, forecast, previous
}

// nextcloud-webapp : JSON
/Trading/economic_data/events.json
```

---

### 1.3 **Données Partagées : Analyses Techniques**

**trading-webapp-hostinger** :
- Pas d'analyses stockées actuellement
- Focus sur le journal de trading (trades)

**nextcloud-webapp** :
- Stockage dans Nextcloud : `/Trading/analyses/*.json`
- Service : `nextcloudService.getAnalyses()`
- Structure modulaire (un fichier par analyse)

**🔗 Corrélation** :
- **Complémentarité** : Nextcloud stocke les analyses, l'app principale les trades
- **Source locale** : `MarketDrevm/Trading/analyses/`
- **Intégration future** : Les analyses pourraient être liées aux trades

---

### 1.4 **Données Partagées : Corrélations**

**trading-webapp-hostinger** :
- Pas de gestion de corrélations actuellement

**nextcloud-webapp** :
- Stockage dans Nextcloud : `/Trading/correlations/correlations.json`
- Service : `nextcloudService.getCorrelations()`

**🔗 Corrélation** :
- **Source locale** : `MarketDrevm/Trading/correlation/`
- **Utilisation future** : Pourraient enrichir le dashboard principal

---

## 2. 🔄 Corrélations avec goldyrogers_dashboard_full.py (Flask)

### 2.1 **Système d'Alertes**

**Flask Dashboard** :
- Endpoint `POST /post` : Réception d'alertes JSON
- Stockage local : `alertes.json`
- Affichage : Dashboard web avec historique

**Source des Alertes** (probable) :
- Scripts Python utilisant MetaTrader5 (dans `requirements.txt`)
- Analyse technique : Wyckoff + RSI + Ichimoku
- Envoi HTTP POST vers le dashboard Flask

**🔗 Corrélation avec trading-webapp-hostinger** :
- **Potentiel d'intégration** : Les alertes Flask pourraient être affichées dans l'app principale
- **API commune** : L'app React pourrait consommer l'API Flask
- **Données partagées** : Mêmes instruments (US30, NAS100, XAUUSD, USDJPY, XBRUSD)

```python
# goldyrogers_dashboard_full.py
# Reçoit des alertes avec structure :
{
  "type": "Wyckoff|RSI|Ichimoku",
  "pair": "XBRUSD|US30|...",
  "time": "2024-01-01 12:00 UTC"
}
```

---

### 2.2 **Déploiement et Infrastructure**

**Flask Dashboard** :
- Déployé sur Render.com
- Configuration via `render.yaml`
- Port configurable via variable d'environnement

**trading-webapp-hostinger** :
- Déployé sur Hostinger (statique)
- Build Vite → dossier `dist/`

**🔗 Corrélation** :
- **Architecture distribuée** : Deux services séparés
- **Communication** : Via API HTTP (potentiel)
- **Domaine** : `deuzy.xyz` mentionné dans la doc

---

## 3. 🔄 Corrélations avec MarketDrevm/ (Données Locales)

### 3.1 **Structure de Données**

**MarketDrevm/Trading/** :
```
MarketDrevm/Trading/
├── analyses/           → nextcloud-webapp : /Trading/analyses/
├── backups/            → Sauvegardes
├── charts/             → Graphiques (futur)
├── correlation/        → nextcloud-webapp : /Trading/correlations/
└── economic_data/      → nextcloud-webapp : /Trading/economic_data/
```

**🔗 Corrélations** :
- **Source de données** : MarketDrevm est la source locale
- **Synchronisation** : Nextcloud reflète cette structure
- **Import/Export** : Scripts Python pourraient synchroniser

---

### 3.2 **Fichiers CSV Partagés**

**Fichiers à la racine** :
- `Watchlist_TradingView.csv` : Watchlist pour TradingView
- `Portefeuille_Watchlist_01092026.csv` : Portefeuille de trading
- `Tableau_de_bord_quotidien___Session_NY.csv` : Données session NY

**🔗 Corrélations** :
- **Utilisation** : Ces CSV peuvent être importés dans les deux apps web
- **Format commun** : Structure standardisée pour échange de données
- **TradingView** : Intégration avec plateforme externe

---

## 4. 🔄 Flux de Données et Synchronisation

### 4.1 **Flux Actuel**

```
┌─────────────────┐
│  MarketDrevm/   │ (Source locale)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Nextcloud Kaflow│ (Stockage cloud)
│  /Trading/      │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────────────┐
│nextcloud│ │trading-webapp-   │
│-webapp  │ │hostinger         │
└────────┘ │(Supabase)         │
           └──────────────────┘
```

### 4.2 **Flux d'Alertes**

```
┌──────────────────┐
│ Scripts Python   │
│ (MetaTrader5)    │
│ Wyckoff+RSI+     │
│ Ichimoku         │
└────────┬─────────┘
         │ POST /post
         ▼
┌──────────────────┐
│ Flask Dashboard  │
│ (Render.com)      │
│ alertes.json      │
└──────────────────┘
```

---

## 5. 📊 Tableau Récapitulatif des Corrélations

| Donnée | trading-webapp-hostinger | nextcloud-webapp | Flask Dashboard | MarketDrevm |
|--------|-------------------------|------------------|-----------------|-------------|
| **Watchlist** | ✅ Statique (constants) | ✅ Dynamique (Nextcloud) | ❌ | ✅ CSV |
| **Événements Économiques** | ✅ Supabase | ✅ Nextcloud JSON | ❌ | ✅ Dossier |
| **Analyses Techniques** | ❌ | ✅ Nextcloud | ❌ | ✅ Dossier |
| **Corrélations** | ❌ | ✅ Nextcloud | ❌ | ✅ Dossier |
| **Trades/Journal** | ✅ Supabase | ❌ | ❌ | ❌ |
| **Alertes Trading** | ❌ | ❌ | ✅ Flask API | ❌ |
| **Screenshots** | ✅ Supabase Storage | ❌ | ❌ | ❌ |

---

## 6. 🔗 Points d'Intégration Potentiels

### 6.1 **Synchronisation Watchlist**

**Opportunité** :
- Importer la watchlist Nextcloud dans l'app principale
- Rendre la watchlist modifiable dans l'app principale
- Sauvegarder dans Supabase au lieu de constants

**Implémentation suggérée** :
```typescript
// trading-webapp-hostinger pourrait avoir :
- Table Supabase : user_watchlists
- Import depuis Nextcloud (optionnel)
- Export vers CSV
```

---

### 6.2 **Intégration des Alertes Flask**

**Opportunité** :
- Afficher les alertes Flask dans le dashboard principal
- Notifications en temps réel
- Historique des alertes dans Supabase

**Implémentation suggérée** :
```typescript
// Service dans trading-webapp-hostinger
const fetchAlerts = async () => {
  const response = await fetch('https://flask-dashboard.render.com/');
  // Afficher dans le dashboard
};
```

---

### 6.3 **Synchronisation Événements Économiques**

**Opportunité** :
- Script de synchronisation Supabase ↔ Nextcloud
- Source unique de vérité
- Backup automatique

**Implémentation suggérée** :
```python
# Script Python
def sync_events():
    # Lire depuis Supabase
    # Écrire dans Nextcloud
    # Ou vice versa
```

---

### 6.4 **Liaison Analyses ↔ Trades**

**Opportunité** :
- Lier les analyses Nextcloud aux trades Supabase
- Référence croisée
- Historique complet

**Implémentation suggérée** :
```typescript
// Trade avec référence à analyse
interface Trade {
  // ... champs existants
  analysis_id?: string; // Référence à /Trading/analyses/{id}.json
}
```

---

## 7. 🎯 Recommandations pour Améliorer les Corrélations

### 7.1 **Court Terme**
1. ✅ **Synchronisation Watchlist** : Importer Nextcloud → Supabase
2. ✅ **API Flask** : Consommer les alertes dans l'app principale
3. ✅ **Export CSV** : Depuis Supabase vers MarketDrevm

### 7.2 **Moyen Terme**
1. ✅ **Script de Sync** : Automatiser Supabase ↔ Nextcloud
2. ✅ **Unification Analyses** : Intégrer dans l'app principale
3. ✅ **Notifications** : Alertes en temps réel dans l'app

### 7.3 **Long Terme**
1. ✅ **Source Unique** : Centraliser toutes les données
2. ✅ **API Unifiée** : Backend unique pour toutes les apps
3. ✅ **Dashboard Unifié** : Vue d'ensemble complète

---

## 8. 📝 Schéma de Données Partagées

### 8.1 **Instruments de Trading (Communs)**

```typescript
type Instrument = "US30" | "NAS100" | "XAUUSD" | "USDJPY" | "XBRUSD";

// Utilisé dans :
// - trading-webapp-hostinger/src/config/instruments.ts
// - nextcloud-webapp (watchlist)
// - Flask Dashboard (alertes)
// - CSV files
```

### 8.2 **Structure Événement Économique**

```typescript
interface EconomicEvent {
  event_time_utc: string;
  currency: string;
  impact: "low" | "medium" | "high";
  name: string;
  actual?: number;
  forecast?: number;
  previous?: number;
}

// Stocké dans :
// - Supabase (trading-webapp-hostinger)
// - Nextcloud JSON (nextcloud-webapp)
// - MarketDrevm/Trading/economic_data/
```

### 8.3 **Structure Alerte**

```typescript
interface Alert {
  type: "Wyckoff" | "RSI" | "Ichimoku";
  pair: Instrument;
  time: string; // UTC
}

// Stocké dans :
// - alertes.json (Flask Dashboard)
// - Potentiellement Supabase (futur)
```

---

## 9. 🔐 Sécurité et Accès

### 9.1 **Authentification**

- **trading-webapp-hostinger** : Supabase Auth (email/password)
- **nextcloud-webapp** : Nextcloud Auth (WebDAV credentials)
- **Flask Dashboard** : Aucune auth actuellement (public)

**🔗 Corrélation** :
- **Séparation** : Deux systèmes d'auth indépendants
- **Opportunité** : Unifier avec Supabase Auth

---

### 9.2 **Stockage**

- **trading-webapp-hostinger** : Supabase (PostgreSQL + Storage)
- **nextcloud-webapp** : Nextcloud Kaflow (WebDAV)
- **Flask Dashboard** : Fichier JSON local

**🔗 Corrélation** :
- **Multi-backend** : Stratégie de stockage distribuée
- **Backup** : Nextcloud peut servir de backup pour Supabase

---

## 10. 📈 Métriques et Monitoring

### 10.1 **Données Traçables**

- **Trades** : Dans Supabase (trading-webapp-hostinger)
- **Alertes** : Dans Flask Dashboard (alertes.json)
- **Watchlist** : Dans Nextcloud (nextcloud-webapp)
- **Analyses** : Dans Nextcloud (nextcloud-webapp)

**🔗 Corrélation** :
- **Pas de monitoring unifié** actuellement
- **Opportunité** : Dashboard de monitoring centralisé

---

## 🎓 Conclusion

Les applications GoldyX forment un écosystème complémentaire où :

1. **trading-webapp-hostinger** : Application principale pour le trading quotidien
2. **nextcloud-webapp** : Gestion et stockage de données d'analyse
3. **Flask Dashboard** : Visualisation d'alertes en temps réel
4. **MarketDrevm/** : Source locale de données et analyses

**Points Clés** :
- ✅ Données partagées : Watchlist, Événements, Analyses
- ✅ Complémentarité : Chaque app a son rôle spécifique
- ✅ Potentiel d'intégration : Synchronisation possible
- ✅ Architecture distribuée : Flexibilité et résilience

**Prochaines Étapes** :
- Implémenter les points d'intégration identifiés
- Créer des scripts de synchronisation
- Unifier l'expérience utilisateur

---

**Dernière mise à jour** : Analyse complète des corrélations entre applications GoldyX
