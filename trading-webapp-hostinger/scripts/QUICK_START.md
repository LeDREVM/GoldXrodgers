# 🚀 Guide Rapide - Lier Supabase en 3 étapes

## Étape 1 : Se connecter à Supabase

Ouvrez PowerShell dans ce dossier et exécutez :

```powershell
supabase login
```

Cela ouvrira votre navigateur. Connectez-vous à votre compte Supabase.

## Étape 2 : Lier le projet

Une fois connecté, exécutez :

```powershell
supabase link --project-ref uquhasxgnxwhdsfvvksb
```

## Étape 3 : Appliquer les migrations

```powershell
supabase db push
```

C'est tout ! ✅

---

## 📋 Checklist après les migrations

- [ ] Vérifier que les tables existent dans Supabase Dashboard > Table Editor
- [ ] Créer le bucket `trade-screens` dans Storage > Buckets (type: Private)
- [ ] Vérifier les variables d'environnement dans `.env`

## 🆘 Besoin d'aide ?

Consultez `scripts/link_supabase_project.md` pour un guide détaillé.
