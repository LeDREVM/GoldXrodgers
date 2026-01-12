# Lier votre projet Supabase - Guide étape par étape

## Étape 1 : Ouvrir un terminal PowerShell

Ouvrez PowerShell dans le dossier du projet :
```powershell
cd "C:\Users\ardja\Documents\CODING\GoldyXrepo\trading-webapp-hostinger"
```

## Étape 2 : Se connecter à Supabase

Exécutez la commande suivante. Cela ouvrira votre navigateur pour vous authentifier :

```powershell
supabase login
```

Suivez les instructions dans le navigateur pour vous connecter à votre compte Supabase.

## Étape 3 : Trouver votre Project Reference ID

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Le **Project Reference ID** se trouve :
   - Dans l'URL : `https://supabase.com/dashboard/project/[PROJECT-REF]`
   - Ou dans **Settings** > **General** > **Reference ID**

Exemple : Si votre URL est `https://supabase.com/dashboard/project/uquhasxgnxwhdsfvvksb`, alors votre project-ref est `uquhasxgnxwhdsfvvksb`

## Étape 4 : Lier le projet local au projet distant

### Option A : Script automatique (Recommandé)

Exécutez le script PowerShell qui fait tout automatiquement :

```powershell
.\scripts\link_supabase.ps1
```

### Option B : Commande manuelle

Remplacez `VOTRE-PROJECT-REF` par votre Project Reference ID :

```powershell
supabase link --project-ref VOTRE-PROJECT-REF
```

Votre Project Reference ID est : `uquhasxgnxwhdsfvvksb`

```powershell
supabase link --project-ref uquhasxgnxwhdsfvvksb
```

## Étape 5 : Appliquer les migrations

Une fois le projet lié, poussez toutes les migrations vers la base de données distante :

```powershell
supabase db push
```

Cette commande appliquera toutes les migrations dans l'ordre :
- ✅ `001_init.sql` - Schéma initial (tables, index, trigger)
- ✅ `002_rls_policies.sql` - Politiques de sécurité RLS
- ✅ `003_storage_policies.sql` - Politiques de stockage
- ✅ `004_seed_events.sql` - Données de test

## Étape 6 : Créer le bucket de stockage (IMPORTANT)

Avant d'utiliser l'application, créez le bucket de stockage :

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Storage** > **Buckets**
4. Cliquez sur **New bucket**
5. Nom : `trade-screens`
6. Type : **Private**
7. Cliquez sur **Create bucket**

## Vérification

Pour vérifier que tout est bien configuré :

```powershell
# Voir la liste des migrations appliquées
supabase migration list

# Voir l'état de la connexion
supabase projects list
```

## Dépannage

### Erreur : "Project not found"
- Vérifiez que vous avez bien copié le Project Reference ID
- Assurez-vous d'être connecté au bon compte Supabase

### Erreur : "Migration already applied"
- C'est normal si vous avez déjà appliqué certaines migrations
- Vous pouvez continuer, les migrations suivantes seront appliquées

### Erreur lors de `db push`
- Vérifiez que toutes les migrations sont valides
- Vérifiez que vous avez les permissions nécessaires sur le projet

## Prochaines étapes

Une fois les migrations appliquées :
1. ✅ Vérifiez que les tables existent dans **Table Editor**
2. ✅ Vérifiez que le bucket `trade-screens` existe dans **Storage**
3. ✅ Testez l'authentification dans votre application
4. ✅ Configurez vos variables d'environnement dans `.env`
