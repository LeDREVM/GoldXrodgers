# 🔧 Guide de Troubleshooting - Base de Données

Ce guide vous aide à résoudre les problèmes courants liés à la base de données Supabase.

---

## ❌ Erreurs d'Authentification

### Erreur : "Missing Supabase environment variables"

**Symptôme** :
```
Error: Missing Supabase environment variables. Please check your .env file.
```

**Solutions** :
1. Vérifiez que le fichier `.env` existe à la racine de `trading-webapp-hostinger/`
2. Vérifiez que les variables sont correctement nommées :
   ```env
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_key
   ```
3. ⚠️ Les variables doivent commencer par `VITE_` pour être accessibles dans le code
4. Redémarrez le serveur de développement après modification du `.env`

---

### Erreur : "Invalid API key" ou "JWT expired"

**Symptôme** :
```
Error: Invalid API key
```

**Solutions** :
1. Vérifiez que vous avez copié la **bonne clé** :
   - `anon public` key (pas la `service_role` key)
   - Clé complète sans espaces
2. Régénérez la clé dans Supabase si nécessaire : Settings → API → Reset anon key
3. Mettez à jour votre `.env` avec la nouvelle clé

---

## ❌ Erreurs de Base de Données

### Erreur : "relation does not exist"

**Symptôme** :
```
Error: relation "public.trades" does not exist
```

**Solutions** :
1. **Vérifiez que les migrations ont été appliquées** :
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   Vous devriez voir : `profiles`, `trades`, `economic_events`

2. **Si les tables n'existent pas** :
   - Exécutez `scripts/apply_all_migrations.sql` dans SQL Editor
   - Ou appliquez les migrations une par une dans l'ordre

3. **Vérifiez que vous êtes dans le bon projet Supabase**

---

### Erreur : "permission denied for table"

**Symptôme** :
```
Error: permission denied for table trades
```

**Solutions** :
1. **Vérifiez que RLS est activé et les politiques existent** :
   ```sql
   SELECT tablename, policyname 
   FROM pg_policies 
   WHERE schemaname = 'public' AND tablename = 'trades';
   ```
   Vous devriez voir au moins 4 politiques (select, insert, update, delete)

2. **Vérifiez que vous êtes authentifié** :
   - Connectez-vous dans l'application
   - Vérifiez que le token est valide

3. **Vérifiez que `user_id` correspond à `auth.uid()`** :
   - Les politiques RLS vérifient que `user_id = auth.uid()`
   - Si vous créez un trade manuellement, utilisez votre `user_id`

---

### Erreur : "violates check constraint"

**Symptôme** :
```
Error: new row for relation "trades" violates check constraint
```

**Solutions** :
1. **Vérifiez les valeurs** :
   - `timeframe` doit être : `M5`, `M15`, `H1`, `H4`, ou `D1`
   - `direction` doit être : `BUY` ou `SELL`
   - `impact` (pour events) doit être : `LOW`, `MEDIUM`, ou `HIGH`

2. **Exemple de trade valide** :
   ```typescript
   {
     symbol: "US30",
     timeframe: "H1",  // ✅ Valide
     direction: "BUY",  // ✅ Valide
     // ...
   }
   ```

---

## ❌ Erreurs de Storage

### Erreur : "bucket does not exist"

**Symptôme** :
```
Error: The resource was not found
```

**Solutions** :
1. **Créez le bucket manuellement** :
   - Allez dans Storage → Buckets
   - Cliquez sur "New bucket"
   - Nom : `trade-screens` (exactement)
   - Type : **Private** (pas Public)
   - File size limit : 10 MB
   - Allowed MIME types : `image/png, image/jpeg, image/jpg, image/webp`

2. **Ou utilisez le script SQL** :
   - Exécutez `supabase/scripts/create_storage_bucket.sql`
   - ⚠️ Nécessite les permissions service_role

---

### Erreur : "new row violates policy"

**Symptôme** :
```
Error: new row violates row-level security policy
```

**Solutions** :
1. **Vérifiez le chemin du fichier** :
   - Le chemin doit commencer par `{userId}/`
   - Exemple : `550e8400-e29b-41d4-a716-446655440000/fichier.png`

2. **Vérifiez que vous êtes authentifié** :
   - `auth.uid()` doit retourner votre `user_id`
   - Le dossier doit correspondre à votre `user_id`

3. **Vérifiez les politiques de storage** :
   ```sql
   SELECT policyname, cmd 
   FROM pg_policies 
   WHERE schemaname = 'storage' 
   AND tablename = 'objects' 
   AND policyname LIKE '%trade_screens%';
   ```

---

### Les Screenshots ne s'affichent pas

**Symptôme** : L'image ne charge pas, erreur 404 ou image cassée

**Solutions** :
1. **Utilisez `getSignedUrl()`** :
   ```typescript
   const url = await getSignedUrl(screenshot_url);
   // Utilisez cette URL signée dans <img src={url} />
   ```

2. **Vérifiez que le fichier existe** :
   - Allez dans Storage → `trade-screens`
   - Vérifiez que le fichier est présent

3. **Vérifiez les permissions** :
   - Le bucket doit être Private
   - Les politiques RLS doivent permettre la lecture

4. **Vérifiez le format du chemin** :
   - Le chemin stocké dans `trades.screenshot_url` doit être : `userId/filename.ext`
   - Pas d'URL complète, juste le chemin relatif

---

## ❌ Erreurs de Trigger

### Le profil n'est pas créé automatiquement

**Symptôme** : Après inscription, pas de ligne dans `profiles`

**Solutions** :
1. **Vérifiez que le trigger existe** :
   ```sql
   SELECT trigger_name 
   FROM information_schema.triggers 
   WHERE trigger_name = 'on_auth_user_created';
   ```

2. **Vérifiez que la fonction existe** :
   ```sql
   SELECT proname 
   FROM pg_proc 
   WHERE proname = 'handle_new_user';
   ```

3. **Si manquant, réexécutez la migration 001** :
   - La partie trigger de `001_init.sql`

4. **Créez manuellement le profil si nécessaire** :
   ```sql
   INSERT INTO public.profiles (id, email)
   VALUES ('votre-user-id', 'votre-email@example.com')
   ON CONFLICT (id) DO NOTHING;
   ```

---

## ❌ Problèmes de Performance

### Les requêtes sont lentes

**Solutions** :
1. **Vérifiez que les index existent** :
   ```sql
   SELECT indexname 
   FROM pg_indexes 
   WHERE tablename = 'trades';
   ```
   Vous devriez voir : `trades_user_id_idx`, `trades_created_at_idx`, `trades_symbol_idx`

2. **Ajoutez des index si manquants** :
   ```sql
   CREATE INDEX IF NOT EXISTS trades_user_id_idx ON public.trades (user_id);
   CREATE INDEX IF NOT EXISTS trades_created_at_idx ON public.trades (created_at DESC);
   CREATE INDEX IF NOT EXISTS trades_symbol_idx ON public.trades (symbol);
   ```

3. **Limitez les résultats** :
   ```typescript
   const trades = await listTrades(50); // Limite à 50
   ```

---

## 🔍 Commandes de Diagnostic

### Vérifier l'état de la base de données

```sql
-- Voir toutes les tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Voir toutes les politiques RLS
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public';

-- Voir les index
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public';

-- Voir les triggers
SELECT trigger_name, event_object_table 
FROM information_schema.triggers;
```

### Vérifier les données

```sql
-- Compter les trades
SELECT COUNT(*) FROM public.trades;

-- Voir les derniers trades
SELECT * FROM public.trades 
ORDER BY created_at DESC 
LIMIT 10;

-- Voir les événements à venir
SELECT * FROM public.economic_events 
WHERE event_time_utc > NOW() 
ORDER BY event_time_utc ASC;
```

### Vérifier l'authentification

```sql
-- Voir les utilisateurs (si vous avez les permissions)
SELECT id, email, created_at 
FROM auth.users 
LIMIT 10;

-- Voir les profils
SELECT * FROM public.profiles;
```

---

## 🆘 Aide Supplémentaire

### Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Troubleshooting](https://supabase.com/docs/guides/storage/troubleshooting)

### Script de Vérification Complet

Exécutez le script `supabase/scripts/verify_database.sql` pour un diagnostic complet.

### Logs Supabase

1. Allez dans votre projet Supabase
2. **Logs** → **Postgres Logs** pour voir les erreurs SQL
3. **Logs** → **API Logs** pour voir les erreurs d'API

---

## ✅ Checklist de Vérification

Avant de demander de l'aide, vérifiez :

- [ ] Le fichier `.env` existe et contient les bonnes valeurs
- [ ] Les migrations ont été appliquées (tables existent)
- [ ] Le bucket `trade-screens` existe et est Private
- [ ] Les politiques RLS sont créées
- [ ] Le trigger `on_auth_user_created` existe
- [ ] Vous êtes authentifié dans l'application
- [ ] Les index existent sur la table `trades`

---

**Si le problème persiste**, créez une issue avec :
- Le message d'erreur complet
- Les étapes pour reproduire
- Le résultat de `verify_database.sql`
