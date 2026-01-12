# 🚀 Guide de Déploiement sur Render.com

Ce guide vous accompagne pour déployer le dashboard Flask GoldyRogers sur Render.com.

---

## 📋 Prérequis

- ✅ Un compte Render.com (gratuit) : https://render.com
- ✅ Un compte GitHub avec le repository poussé
- ✅ Le fichier `render.yaml` configuré

---

## 🚀 Déploiement Automatique via render.yaml

### Option 1 : Déploiement via GitHub (Recommandé)

1. **Connecter votre compte GitHub à Render** :
   - Allez sur https://render.com
   - Cliquez sur **"New +"** → **"Blueprint"**
   - Connectez votre compte GitHub si ce n'est pas déjà fait
   - Sélectionnez le repository : `LeDREVM/GoldXrodgers`

2. **Render détectera automatiquement `render.yaml`** :
   - Render va lire le fichier `render.yaml`
   - Il créera automatiquement le service web
   - Le déploiement commencera automatiquement

3. **Vérifier le déploiement** :
   - Attendez 2-5 minutes pour le build
   - L'URL sera générée automatiquement : `https://goldyrogers-dashboard.onrender.com`

---

## 🔧 Déploiement Manuel

Si vous préférez créer le service manuellement :

### Étape 1 : Créer un nouveau Web Service

1. Allez sur https://dashboard.render.com
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre repository GitHub : `LeDREVM/GoldXrodgers`

### Étape 2 : Configuration

Remplissez les champs suivants :

- **Name** : `goldyrogers-dashboard`
- **Environment** : `Python 3`
- **Build Command** : `pip install -r requirements_flask.txt`
- **Start Command** : `gunicorn goldyrogers_dashboard_full:app --bind 0.0.0.0:$PORT --workers 2 --threads 2 --timeout 120`
- **Plan** : `Free` (ou `Starter` pour plus de ressources)

### Étape 3 : Variables d'Environnement

Ajoutez les variables suivantes :

| Key | Value |
|-----|-------|
| `FLASK_ENV` | `production` |
| `PORT` | `10000` |

**Note** : Render définit automatiquement `$PORT`, mais vous pouvez le spécifier explicitement.

### Étape 4 : Déployer

1. Cliquez sur **"Create Web Service"**
2. Le build commencera automatiquement
3. Attendez 2-5 minutes
4. Votre service sera disponible sur : `https://goldyrogers-dashboard.onrender.com`

---

## 📁 Structure des Fichiers

Assurez-vous que ces fichiers sont à la racine du repository :

```
GoldXrodgers/
├── render.yaml                    # Configuration Render
├── requirements_flask.txt         # Dépendances Python minimales
├── goldyrogers_dashboard_full.py  # Application Flask
└── alertes.json                   # Fichier de stockage (créé automatiquement)
```

---

## 🔍 Vérification du Déploiement

### 1. Vérifier les Logs

Dans le dashboard Render :
- Allez dans votre service
- Cliquez sur **"Logs"**
- Vérifiez qu'il n'y a pas d'erreurs

### 2. Tester l'Application

- **Dashboard** : `https://votre-service.onrender.com/`
- **API POST** : `https://votre-service.onrender.com/post`

### 3. Tester l'API

```bash
# Test POST
curl -X POST https://votre-service.onrender.com/post \
  -H "Content-Type: application/json" \
  -d '{"type": "RSI", "pair": "XBRUSD"}'
```

---

## ⚙️ Configuration Avancée

### Variables d'Environnement Supplémentaires

Si vous avez besoin de variables supplémentaires :

```yaml
envVars:
  - key: FLASK_ENV
    value: production
  - key: PORT
    value: 10000
  - key: MAX_ALERTES
    value: 100
```

### Health Check

Le health check est configuré sur `/` dans `render.yaml`. Render vérifiera automatiquement que le service répond.

### Auto-Deploy

Par défaut, Render déploie automatiquement à chaque push sur la branche `main`. Vous pouvez désactiver cela dans les settings.

---

## 🔄 Mise à Jour

Pour mettre à jour l'application :

1. Faites vos modifications localement
2. Committez et pushez vers GitHub :
   ```bash
   git add .
   git commit -m "Update dashboard"
   git push origin main
   ```
3. Render détectera automatiquement le changement
4. Un nouveau déploiement commencera automatiquement

---

## ❌ Problèmes Courants

### Erreur : "Module not found"

**Cause** : Les dépendances ne sont pas installées

**Solution** :
- Vérifiez que `requirements_flask.txt` existe
- Vérifiez que le build command est correct : `pip install -r requirements_flask.txt`

### Erreur : "Port already in use"

**Cause** : Le port n'est pas correctement configuré

**Solution** :
- Utilisez `$PORT` dans la commande start
- Ou spécifiez explicitement : `--bind 0.0.0.0:$PORT`

### Erreur : "Application failed to respond"

**Cause** : Le service ne démarre pas correctement

**Solution** :
- Vérifiez les logs dans Render
- Vérifiez que `gunicorn` est dans `requirements_flask.txt`
- Vérifiez que la commande start est correcte

### Le fichier alertes.json n'est pas persistant

**Cause** : Sur le plan gratuit, le système de fichiers est éphémère

**Solution** :
- Utilisez une base de données (PostgreSQL gratuit sur Render)
- Ou utilisez un service de stockage externe (S3, etc.)

---

## 💾 Persistance des Données

Sur le plan **Free**, le système de fichiers est **éphémère**. Les données dans `alertes.json` seront perdues lors d'un redémarrage.

### Solution : Utiliser PostgreSQL (Gratuit sur Render)

1. Créez une base de données PostgreSQL sur Render
2. Modifiez `goldyrogers_dashboard_full.py` pour utiliser PostgreSQL
3. Ajoutez `psycopg2-binary` dans `requirements_flask.txt`

---

## 📊 Monitoring

### Logs en Temps Réel

- Allez dans votre service Render
- Cliquez sur **"Logs"**
- Vous verrez les logs en temps réel

### Métriques

Sur le plan **Starter** et supérieur, vous avez accès aux métriques :
- CPU usage
- Memory usage
- Request count
- Response time

---

## 🔐 Sécurité

### CORS (si nécessaire)

Si vous devez autoriser des requêtes depuis d'autres domaines :

```python
from flask_cors import CORS
CORS(app, resources={r"/*": {"origins": "*"}})
```

### Rate Limiting

Pour limiter les requêtes :

```python
from flask_limiter import Limiter
limiter = Limiter(app, key_func=get_remote_address)
```

---

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Deploying Python Apps](https://render.com/docs/deploy-python-apps)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Health Checks](https://render.com/docs/health-checks)

---

## ✅ Checklist de Déploiement

- [ ] Compte Render créé
- [ ] Repository GitHub connecté
- [ ] `render.yaml` configuré
- [ ] `requirements_flask.txt` créé
- [ ] Service créé sur Render
- [ ] Build réussi
- [ ] Application accessible
- [ ] API testée
- [ ] Logs vérifiés

---

**✅ Votre dashboard Flask est maintenant déployé sur Render !**

L'URL sera : `https://goldyrogers-dashboard.onrender.com` (ou le nom que vous avez choisi)
