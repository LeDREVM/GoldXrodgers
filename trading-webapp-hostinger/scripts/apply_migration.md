# Application des Migrations Supabase

## Option 1 : Via Supabase Dashboard (Recommandé si CLI non installé)

1. Connectez-vous à votre projet Supabase : https://supabase.com/dashboard
2. Allez dans **SQL Editor**
3. Copiez le contenu du fichier `supabase/migrations/001_init.sql`
4. Collez-le dans l'éditeur SQL
5. Cliquez sur **Run** pour exécuter

## Option 2 : Via Supabase CLI

### Installation du CLI

```bash
# Windows (avec Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Ou avec npm
npm install -g supabase
```

### Configuration

```bash
# Se connecter à Supabase
supabase login

# Lier le projet local au projet distant
cd trading-webapp-hostinger
supabase link --project-ref votre-project-ref
```

### Application des migrations

```bash
# Pousser toutes les migrations
supabase db push

# Ou appliquer une migration spécifique
supabase migration up
```

## Option 3 : Via Script SQL Direct

Vous pouvez aussi exécuter le SQL directement via psql ou l'éditeur SQL de Supabase.
