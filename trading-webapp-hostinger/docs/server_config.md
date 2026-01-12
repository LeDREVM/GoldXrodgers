# 🔧 Configuration du Serveur - Protocole et Runtime

Ce document explique la configuration du serveur de développement et de production, notamment les protocoles HTTP/HTTPS.

---

## 📋 Configuration Vite

### Serveur de Développement

Le serveur Vite est configuré dans `vite.config.ts` :

```typescript
server: {
  port: 5173,
  host: true, // Écoute sur 0.0.0.0 (toutes les interfaces)
  strictPort: false, // Si le port est occupé, essayer le suivant
  cors: true, // CORS activé
}
```

### Protocole HTTP (Défaut)

Par défaut, Vite utilise **HTTP** en développement :
- URL : `http://localhost:5173`
- Protocole : `http://`
- Pas de certificat SSL requis

### Protocole HTTPS (Optionnel)

Pour activer HTTPS en développement local :

1. **Générer un certificat auto-signé** :
```bash
# Avec mkcert (recommandé)
npm install -g mkcert
mkcert -install
mkcert localhost 127.0.0.1 ::1
```

2. **Configurer Vite** :
```typescript
server: {
  https: {
    key: './localhost-key.pem',
    cert: './localhost.pem',
  },
}
```

3. **Accéder via HTTPS** :
- URL : `https://localhost:5173`
- ⚠️ Le navigateur affichera un avertissement (certificat auto-signé)

---

## 🌐 Configuration Production (Hostinger)

### Protocole HTTPS (Obligatoire)

En production sur Hostinger, utilisez **HTTPS** :

1. **Configuration du domaine** :
   - Domaine : `deuzy.xyz`
   - Protocole : `https://`
   - Certificat SSL : Géré par Hostinger (Let's Encrypt)

2. **Variables d'environnement** :
```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_key
```

3. **Build pour production** :
```bash
npm run build:hostinger
```

4. **Upload sur Hostinger** :
   - Uploader le contenu de `dist/` sur le serveur
   - Le serveur Hostinger gère automatiquement HTTPS

---

## 🔐 Configuration Supabase

### Protocole HTTPS (Toujours)

Supabase utilise **toujours HTTPS** :
- URL : `https://votre-projet.supabase.co`
- Protocole sécurisé obligatoire
- Certificat SSL géré par Supabase

### Configuration du Client

Le client Supabase est configuré dans `src/lib/supabaseClient.ts` :

```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Sécurité renforcée
  },
})
```

---

## 🚀 Scripts Disponibles

### Développement

```bash
# Serveur HTTP (défaut)
npm run dev
# → http://localhost:5173

# Serveur avec host public
npm run dev -- --host
# → http://0.0.0.0:5173 (accessible depuis le réseau local)
```

### Preview (Test du Build)

```bash
# Tester le build localement
npm run build
npm run preview
# → http://localhost:4173
```

### Production

```bash
# Build pour Hostinger
npm run build:hostinger
# → Génère dist/ avec fichiers optimisés
```

---

## 🔍 Vérification du Protocole

### En Développement

Vérifiez dans la console du navigateur :
```javascript
console.log('Protocol:', window.location.protocol);
// → "http:" ou "https:"
```

### En Production

Vérifiez que toutes les requêtes utilisent HTTPS :
- Ouvrez les DevTools (F12)
- Onglet Network
- Vérifiez que toutes les requêtes commencent par `https://`

---

## ⚠️ Problèmes Courants

### Mixed Content (HTTP/HTTPS)

**Symptôme** : Erreur "Mixed Content" dans la console

**Cause** : Page en HTTPS mais ressources en HTTP

**Solution** :
- Utiliser HTTPS partout en production
- Vérifier que `VITE_SUPABASE_URL` commence par `https://`

### CORS Errors

**Symptôme** : Erreurs CORS lors des requêtes

**Solution** :
- Vérifier que `cors: true` est activé dans `vite.config.ts`
- Vérifier les headers CORS dans Supabase

### Port Already in Use

**Symptôme** : Le port 5173 est déjà utilisé

**Solution** :
- `strictPort: false` permet d'utiliser un autre port automatiquement
- Ou tuer le processus : `Get-Process -Name node | Stop-Process`

---

## 📝 Headers de Sécurité

Les headers suivants sont configurés dans Vite :

```typescript
headers: {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
}
```

En production sur Hostinger, configurez également dans `.htaccess` :

```apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

---

## 🔄 Migration HTTP → HTTPS

Si vous migrez de HTTP vers HTTPS :

1. **Mettre à jour les URLs** :
   - Toutes les URLs doivent utiliser `https://`
   - Vérifier les variables d'environnement

2. **Mettre à jour Supabase** :
   - Dans Supabase Dashboard → Settings → API
   - Ajouter les URLs HTTPS dans "Redirect URLs"

3. **Vérifier les certificats** :
   - Hostinger gère automatiquement les certificats SSL
   - Vérifier que le certificat est valide

---

## 📚 Ressources

- [Documentation Vite - Server Options](https://vitejs.dev/config/server-options.html)
- [Documentation Supabase - Client Configuration](https://supabase.com/docs/reference/javascript/initializing)
- [Let's Encrypt](https://letsencrypt.org/) - Certificats SSL gratuits

---

**✅ Configuration optimale : HTTP en développement, HTTPS en production**
