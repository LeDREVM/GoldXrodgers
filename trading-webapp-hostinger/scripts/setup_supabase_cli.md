# Configuration Supabase CLI

Supabase CLI est maintenant installé ! Voici comment l'utiliser pour appliquer vos migrations.

## 1. Connexion à Supabase

Ouvrez un terminal PowerShell et exécutez :

```powershell
cd trading-webapp-hostinger
supabase login
```

Cela ouvrira votre navigateur pour vous authentifier. Suivez les instructions.

## 2. Lier votre projet distant

Une fois connecté, liez votre projet local au projet Supabase distant :

```powershell
supabase link --project-ref votre-project-ref
```

**Comment trouver votre project-ref ?**
- Allez sur https://supabase.com/dashboard
- Sélectionnez votre projet
- Le project-ref se trouve dans l'URL : `https://supabase.com/dashboard/project/[PROJECT-REF]`
- Ou dans Settings > General > Reference ID

## 3. Appliquer les migrations

Une fois le projet lié, vous pouvez pousser toutes vos migrations :

```powershell
supabase db push
```

Cela appliquera toutes les migrations dans l'ordre :
- `001_init.sql` - Schéma initial
- `002_rls_policies.sql` - Politiques RLS
- `003_storage_policies.sql` - Politiques de stockage
- `004_seed_events.sql` - Données de base

## 4. Vérifier l'état

Pour voir l'état de vos migrations :

```powershell
supabase migration list
```

## Alternative : Application manuelle via Dashboard

Si vous préférez appliquer les migrations manuellement :

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**
4. Copiez le contenu de chaque fichier de migration dans l'ordre
5. Exécutez-les une par une

Les fichiers sont dans : `supabase/migrations/`
