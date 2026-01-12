# 🗄️ Base de Données Supabase - GoldyX Trading

Ce dossier contient toutes les migrations, politiques et scripts nécessaires pour configurer la base de données Supabase de l'application de trading.

---

## 📁 Structure

```
supabase/
├── migrations/          # Migrations SQL (à appliquer dans l'ordre)
│   ├── 001_init.sql              # Schéma initial (tables, index, trigger)
│   ├── 002_rls_policies.sql      # Politiques Row Level Security
│   ├── 003_storage_policies.sql   # Politiques de Storage
│   └── 004_seed_events.sql        # Données de test (événements économiques)
├── policies/            # Politiques RLS (référence)
│   ├── profiles_rls.sql
│   ├── trades_rls.sql
│   └── storage_rls.sql
├── scripts/             # Scripts utilitaires
│   ├── verify_database.sql       # Vérification complète de la DB
│   └── create_storage_bucket.sql  # Création du bucket (alternative)
├── docs/                # Documentation
│   ├── supabase_setup.md         # Guide rapide
│   ├── rls_explained.md          # Explication RLS
│   └── storage_paths.md          # Chemins de storage
├── SETUP_DATABASE.md    # ⭐ Guide complet de setup
└── TROUBLESHOOTING.md   # 🔧 Guide de dépannage
```

---

## 🚀 Démarrage Rapide

### 1. Créer un Projet Supabase

Allez sur https://supabase.com/dashboard et créez un nouveau projet.

### 2. Récupérer les Clés API

Dans **Settings** → **API**, copiez :
- Project URL → `VITE_SUPABASE_URL`
- anon public key → `VITE_SUPABASE_ANON_KEY`

### 3. Configurer `.env`

Créez un fichier `.env` à la racine de `trading-webapp-hostinger/` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_key
```

### 4. Appliquer les Migrations

**Option A : Script complet (⭐ Recommandé)**
1. Ouvrez **SQL Editor** dans Supabase
2. Copiez le contenu de `scripts/apply_all_migrations.sql`
3. Exécutez-le

**Option B : Migrations individuelles**
Exécutez dans l'ordre dans SQL Editor :
- `migrations/001_init.sql`
- `migrations/002_rls_policies.sql`
- `migrations/003_storage_policies.sql`
- `migrations/004_seed_events.sql`

### 5. Créer le Bucket Storage

1. Allez dans **Storage** → **Buckets**
2. Cliquez sur **"New bucket"**
3. Configurez :
   - **Name** : `trade-screens`
   - **Public** : ❌ **Désactivé** (Private)
   - **File size limit** : `10 MB`
   - **Allowed MIME types** : `image/png, image/jpeg, image/jpg, image/webp`

### 6. Vérifier

Exécutez `scripts/verify_database.sql` dans SQL Editor pour vérifier que tout est en place.

---

## 📖 Documentation Complète

- **[SETUP_DATABASE.md](./SETUP_DATABASE.md)** : Guide détaillé étape par étape
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** : Résolution des problèmes courants
- **[docs/supabase_setup.md](./docs/supabase_setup.md)** : Guide rapide
- **[docs/rls_explained.md](./docs/rls_explained.md)** : Explication des politiques RLS

---

## 🗂️ Tables

### `profiles`
Profils utilisateurs créés automatiquement lors de l'inscription.

### `trades`
Journal de trading avec :
- Symbol, timeframe, direction
- Entry, SL, TP
- R-multiple (risk_r, result_r)
- Tags, notes, screenshot

### `economic_events`
Événements économiques pour le News Gate.

---

## 🔐 Sécurité (RLS)

Toutes les tables utilisent **Row Level Security** :
- Chaque utilisateur voit uniquement ses propres données
- Les événements économiques sont lisibles par tous les utilisateurs authentifiés
- Le storage est isolé par utilisateur (dossier `userId/`)

---

## 📝 Migrations

Les migrations sont **idempotentes** (peuvent être exécutées plusieurs fois sans erreur).

**Ordre d'application** :
1. `001_init.sql` : Schéma de base
2. `002_rls_policies.sql` : Sécurité
3. `003_storage_policies.sql` : Storage
4. `004_seed_events.sql` : Données de test

---

## 🧪 Données de Test

La migration `004_seed_events.sql` crée 4 événements économiques de test pour valider le News Gate.

---

## 🔍 Vérification

Utilisez `scripts/verify_database.sql` pour vérifier :
- ✅ Tables créées
- ✅ Index présents
- ✅ Politiques RLS actives
- ✅ Trigger fonctionnel
- ✅ Données de test

---

## 🆘 Aide

Si vous rencontrez des problèmes :
1. Consultez [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Exécutez `scripts/verify_database.sql`
3. Vérifiez les logs dans Supabase Dashboard

---

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

---

**✅ Une fois configuré, votre base de données est prête pour l'application !**
