# Script PowerShell pour lier le projet Supabase
# Project Reference ID: uquhasxgnxwhdsfvvksb

Write-Host "🔗 Liaison du projet Supabase..." -ForegroundColor Cyan
Write-Host ""

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "supabase\config.toml")) {
    Write-Host "❌ Erreur: Ce script doit être exécuté depuis le dossier trading-webapp-hostinger" -ForegroundColor Red
    exit 1
}

# Project Reference ID (trouvé dans .vscode/mcp.json)
$PROJECT_REF = "uquhasxgnxwhdsfvvksb"

Write-Host "📋 Project Reference ID: $PROJECT_REF" -ForegroundColor Yellow
Write-Host ""

# Étape 1: Vérifier la connexion
Write-Host "1️⃣ Vérification de la connexion Supabase..." -ForegroundColor Cyan
$loginCheck = supabase projects list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Vous n'êtes pas connecté à Supabase." -ForegroundColor Yellow
    Write-Host "   Exécutez d'abord: supabase login" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Cela ouvrira votre navigateur pour vous authentifier." -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Connecté à Supabase" -ForegroundColor Green
Write-Host ""

# Étape 2: Lier le projet
Write-Host "2️⃣ Liaison du projet local au projet distant..." -ForegroundColor Cyan
supabase link --project-ref $PROJECT_REF

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la liaison du projet" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Projet lié avec succès!" -ForegroundColor Green
Write-Host ""

# Étape 3: Proposer d'appliquer les migrations
Write-Host "3️⃣ Souhaitez-vous appliquer les migrations maintenant ?" -ForegroundColor Cyan
Write-Host "   Tapez 'O' pour Oui, ou 'N' pour Non" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "O" -or $response -eq "o" -or $response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "🚀 Application des migrations..." -ForegroundColor Cyan
    supabase db push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Migrations appliquées avec succès!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
        Write-Host "   1. Créez le bucket 'trade-screens' dans Supabase Dashboard (Storage > Buckets)" -ForegroundColor Yellow
        Write-Host "   2. Vérifiez vos variables d'environnement dans .env" -ForegroundColor Yellow
        Write-Host "   3. Testez votre application!" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Erreur lors de l'application des migrations" -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "ℹ️  Pour appliquer les migrations plus tard, exécutez:" -ForegroundColor Cyan
    Write-Host "   supabase db push" -ForegroundColor Yellow
}

Write-Host ""
