# Trading Web App (Hostinger sans VPS) — Front statique + Supabase

Web app de trading orientée **Session New York**, déployable sur **Hostinger mutualisé** (sans VPS) via upload statique, avec backend **Supabase** (Auth + Postgres + Storage + RLS).

## Fonctionnalités (MVP)
- Auth email/password (Supabase Auth)
- Dashboard : Watchlist (US30, NAS100, XAUUSD, USDJPY, XBRUSD)
- Session clock : repères NY + timezone **America/Martinique**
- News Risk Gate (table `economic_events`)
- Journal de trading : CRUD trades + tags + R-multiple + upload screenshot
- Stats simples : winrate, R moyen

---

## 1) Prérequis
- Node.js 18+ (recommandé 20)
- Un compte Supabase (projet créé)
- Un domaine sur Hostinger : deuzy.xyz

---

## 2) Installation locale
### 2.1 Cloner et installer
https://github.com/LeDREVM/GoldXrodgers.git
```bash
npm install
```

### 2.2 Configuration de la Base de Données Supabase

**📖 Guide Complet** : Consultez [supabase/SETUP_DATABASE.md](./supabase/SETUP_DATABASE.md) pour un guide détaillé.

**Démarrage Rapide** :
1. Créez un projet sur https://supabase.com/dashboard
2. Récupérez les clés API (Settings → API)
3. Appliquez les migrations SQL :
   - Ouvrez **SQL Editor** dans Supabase
   - Copiez et exécutez `scripts/apply_all_migrations.sql`
4. Créez le bucket storage :
   - Storage → New bucket
   - Nom : `trade-screens` (Private, 10 MB)
5. Vérifiez avec `supabase/scripts/verify_database.sql`

### 2.3 Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_key
```

### 2.4 Lancer en mode développement

```bash
npm run dev
```

---

## 3) Mode Réel (Production)

### 3.1 Vérifier les variables d'environnement

Avant de builder pour la production, vérifiez vos variables :

```bash
npm run verify:env
```

### 3.2 Build pour la production

```bash
npm run build:prod
```

Ou utilisez le script complet pour Hostinger :

```bash
npm run build:hostinger
```

### 3.3 Déploiement

1. Le dossier `dist/` contient tous les fichiers à uploader
2. Uploadez le contenu de `dist/` sur votre serveur Hostinger
3. Configurez le fichier `.htaccess` (voir `hostinger/htaccess.example`)

📖 **Guide complet** : Voir [docs/mode_reel.md](./docs/mode_reel.md)

---