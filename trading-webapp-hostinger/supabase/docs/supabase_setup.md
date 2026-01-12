# Supabase Setup

> 📖 **Guide Complet** : Pour un guide détaillé étape par étape, consultez [SETUP_DATABASE.md](../SETUP_DATABASE.md)

## Configuration Rapide

1. **Créer un projet Supabase** : https://supabase.com/dashboard
2. **Récupérer les clés API** : Settings → API
3. **Configurer `.env`** :
   ```env
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_key
   ```
4. **Appliquer les migrations** : Voir [SETUP_DATABASE.md](../SETUP_DATABASE.md#étape-3--appliquer-les-migrations-sql)
5. **Créer le bucket storage** : Storage → New bucket → `trade-screens` (Private)

## Structure de la Base de Données

- **profiles** : Profils utilisateurs
- **trades** : Journal de trading
- **economic_events** : Événements économiques

## Vérification

Exécutez le script de vérification :
```sql
-- Dans SQL Editor de Supabase
-- Copiez le contenu de supabase/scripts/verify_database.sql
```