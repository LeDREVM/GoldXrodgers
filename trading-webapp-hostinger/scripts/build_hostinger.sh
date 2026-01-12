#!/bin/bash
# Build script for Hostinger deployment (Mode Réel/Production)

set -e

echo "🚀 Building for production (Mode Réel)..."

# Verify environment variables
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your production credentials."
    exit 1
fi

# Load environment variables
export NODE_ENV=production

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run TypeScript type checking
echo "🔍 Type checking..."
npm run build -- --mode production || {
    echo "❌ Type checking failed!"
    exit 1
}

# Build for production
echo "🏗️  Building production bundle..."
npm run build

# Verify build output
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found!"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Output directory: dist/"
echo ""
echo "📋 Next steps:"
echo "1. Upload the contents of the 'dist' folder to your Hostinger hosting"
echo "2. Configure your .htaccess file for SPA routing"
echo "3. Verify environment variables are set correctly on the server"
