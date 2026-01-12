# 🗄️ Guide Complet de Setup de la Base de Données

Ce guide vous accompagne étape par étape pour configurer complètement la base de données Supabase de l'application de trading.

---

## 📋 Prérequis

- ✅ Un compte Supabase (gratuit) : https://supabase.com
- ✅ Un projet Supabase créé
- ✅ Les variables d'environnement configurées (voir `.env.example`)

---

## 🚀 Étapes de Configuration

### Étape 1 : Créer un Projet Supabase

1. Allez sur https://supabase.com/dashboard
2. Cliquez sur **"New Project"**
3. Remplissez les informations :
   - **Name** : `goldyx-trading` (ou votre nom)
   - **Database Password** : Choisissez un mot de passe fort (⚠️ sauvegardez-le)
   - **Region** : Choisissez la région la plus proche
4. Cliquez sur **"Create new project"**
5. Attendez 2-3 minutes que le projet soit créé

---

### Étape 2 : Récupérer les Clés API

1. Dans votre projet Supabase, allez dans **Settings** → **API**
2. Copiez les valeurs suivantes :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

3. Créez un fichier `.env` à la racine de `trading-webapp-hostinger/` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_key_ici
```

---

### Étape 3 : Appliquer les Migrations SQL

Vous avez **3 options** pour appliquer les migrations :

#### Option A : Via Supabase Dashboard (⭐ Recommandé pour débuter)

1. Allez dans **SQL Editor** dans votre projet Supabase
2. Cliquez sur **"New query"**
3. Ouvrez le fichier `scripts/apply_all_migrations.sql`
4. Copiez **tout le contenu** du fichier
5. Collez-le dans l'éditeur SQL
6. Cliquez sur **"Run"** (ou `Ctrl+Enter`)
7. ✅ Vérifiez qu'il n'y a pas d'erreurs

#### Option B : Via Migrations Individuelles

1. Dans **SQL Editor**, exécutez dans l'ordre :
   - `supabase/migrations/001_init.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_storage_policies.sql`
   - `supabase/migrations/004_seed_events.sql`

#### Option C : Via Supabase CLI

```bash
# Installer le CLI
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
cd trading-webapp-hostinger
supabase link --project-ref votre-project-ref

# Appliquer les migrations
supabase db push
```

---

### Étape 4 : Créer le Bucket de Storage

Le bucket `trade-screens` est nécessaire pour stocker les screenshots des trades.

1. Dans votre projet Supabase, allez dans **Storage**
2. Cliquez sur **"New bucket"**
3. Configurez :
   - **Name** : `trade-screens` (⚠️ exactement ce nom)
   - **Public bucket** : ❌ **DÉSACTIVÉ** (Private)
   - **File size limit** : `10 MB` (ou selon vos besoins)
   - **Allowed MIME types** : `image/png, image/jpeg, image/jpg, image/webp`
4. Cliquez sur **"Create bucket"**

✅ **Vérification** : Le bucket doit apparaître dans la liste avec le statut "Private"

---

### Étape 5 : Vérifier la Configuration

Exécutez le script de vérification pour vous assurer que tout est en place :

1. Dans **SQL Editor**, ouvrez le fichier `supabase/scripts/verify_database.sql`
2. Copiez et exécutez le contenu
3. Vérifiez que tous les éléments retournent `✅`

---

### Étape 6 : Tester la Connexion

1. Dans votre terminal, allez dans `trading-webapp-hostinger/`
2. Vérifiez les variables d'environnement :
   ```bash
   # Linux/Mac
   bash scripts/verify_env.sh
   
   # Windows PowerShell
   # Vérifiez manuellement que .env existe et contient les bonnes valeurs
   ```

3. Lancez l'application en développement :
   ```bash
   npm install
   npm run dev
   ```

4. Testez :
   - ✅ Créer un compte (Register)
   - ✅ Se connecter (Login)
   - ✅ Créer un trade
   - ✅ Uploader un screenshot

---

## 📊 Structure de la Base de Données

### Tables Créées

#### 1. `profiles`
- Stocke les profils utilisateurs
- Créé automatiquement lors de l'inscription (trigger)
- **RLS activé** : Chaque utilisateur voit uniquement son profil

#### 2. `trades`
- Journal de trading
- Champs principaux :
  - `symbol` : Instrument (US30, NAS100, etc.)
  - `timeframe` : M5, M15, H1, H4, D1
  - `direction` : BUY ou SELL
  - `entry`, `sl`, `tp` : Prix d'entrée, stop loss, take profit
  - `risk_r`, `result_r` : R-multiple prévu et réalisé
  - `tags` : Tableau de tags
  - `screenshot_url` : Chemin vers le screenshot dans Storage
- **RLS activé** : Chaque utilisateur voit uniquement ses trades

#### 3. `economic_events`
- Événements économiques (News Gate)
- Champs :
  - `title` : Nom de l'événement
  - `currency` : USD, JPY, etc.
  - `impact` : LOW, MEDIUM, HIGH
  - `event_time_utc` : Date/heure UTC
- **RLS activé** : Tous les utilisateurs authentifiés peuvent lire

### Index Créés

- `trades_user_id_idx` : Recherche rapide par utilisateur
- `trades_created_at_idx` : Tri chronologique
- `trades_symbol_idx` : Filtrage par instrument
- `economic_events_time_idx` : Recherche par date

### Triggers

- `on_auth_user_created` : Crée automatiquement un profil lors de l'inscription

---

## 🔐 Sécurité (RLS - Row Level Security)

Toutes les tables ont des politiques RLS activées :

### `profiles`
- ✅ Lecture : Uniquement son propre profil
- ✅ Modification : Uniquement son propre profil

### `trades`
- ✅ Lecture : Uniquement ses propres trades
- ✅ Insertion : Uniquement ses propres trades
- ✅ Modification : Uniquement ses propres trades
- ✅ Suppression : Uniquement ses propres trades

### `economic_events`
- ✅ Lecture : Tous les utilisateurs authentifiés
- ❌ Écriture : Réservée aux admins (via service role)

### Storage (`trade-screens`)
- ✅ Lecture : Uniquement ses propres fichiers (dans son dossier `userId/`)
- ✅ Upload : Uniquement dans son propre dossier
- ✅ Suppression : Uniquement ses propres fichiers

---

## 🧪 Données de Test

### Événements Économiques

La migration `004_seed_events.sql` crée 4 événements de test :
- CPI (Consumer Price Index) - USD - HIGH
- Initial Jobless Claims - USD - MEDIUM
- FOMC Member Speech - USD - HIGH
- BoJ Rate Decision - JPY - HIGH

Ces événements sont programmés dans les prochains jours pour tester le News Gate.

---

## 🔍 Vérification et Troubleshooting

### Vérifier que les Tables Existent

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'trades', 'economic_events');
```

**Résultat attendu** : 3 lignes

### Vérifier les Politiques RLS

```sql
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public';
```

**Résultat attendu** : Plusieurs politiques listées

### Vérifier le Bucket de Storage

1. Allez dans **Storage** → **Buckets**
2. Vérifiez que `trade-screens` existe et est **Private**

### Vérifier le Trigger

```sql
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
```

**Résultat attendu** : 1 ligne

---

## ❌ Problèmes Courants

### Erreur : "relation does not exist"
**Cause** : Les migrations n'ont pas été appliquées  
**Solution** : Réexécutez `scripts/apply_all_migrations.sql`

### Erreur : "permission denied"
**Cause** : Les politiques RLS bloquent l'accès  
**Solution** : Vérifiez que vous êtes authentifié et que les politiques sont correctes

### Erreur : "bucket does not exist"
**Cause** : Le bucket `trade-screens` n'a pas été créé  
**Solution** : Créez-le manuellement dans Storage (voir Étape 4)

### Erreur : "storage.foldername does not exist"
**Cause** : Fonction Supabase manquante (rare)  
**Solution** : Vérifiez que vous utilisez une version récente de Supabase

### Les Screenshots ne s'affichent pas
**Cause** : URL signée non générée ou bucket mal configuré  
**Solution** : 
1. Vérifiez que le bucket existe
2. Vérifiez les politiques de storage
3. Utilisez `getSignedUrl()` pour obtenir l'URL signée

---

## 📝 Commandes Utiles

### Voir tous les Trades d'un Utilisateur

```sql
SELECT * FROM public.trades 
WHERE user_id = 'votre-user-id-uuid'
ORDER BY created_at DESC;
```

### Compter les Trades par Instrument

```sql
SELECT symbol, COUNT(*) as count 
FROM public.trades 
GROUP BY symbol 
ORDER BY count DESC;
```

### Voir les Événements à Venir

```sql
SELECT title, currency, impact, event_time_utc 
FROM public.economic_events 
WHERE event_time_utc > NOW() 
ORDER BY event_time_utc ASC;
```

### Nettoyer les Données de Test

```sql
-- ⚠️ ATTENTION : Supprime tous les trades
DELETE FROM public.trades;

-- Supprime les événements de test
DELETE FROM public.economic_events WHERE source = 'seed';
```

---

## 🎯 Prochaines Étapes

Une fois la base de données configurée :

1. ✅ Testez l'authentification (Register/Login)
2. ✅ Créez quelques trades de test
3. ✅ Testez l'upload de screenshots
4. ✅ Vérifiez l'affichage des événements économiques
5. ✅ Testez les statistiques (winrate, R-multiple)

---

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Supabase CLI](https://supabase.com/docs/reference/cli)

---

**✅ Votre base de données est maintenant prête !**

Si vous rencontrez des problèmes, consultez la section Troubleshooting ou créez une issue sur le repository.
