#!/bin/bash
# Environment variables verification script for production

set -e

echo "🔍 Verifying environment variables for production mode..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file based on .env.example"
    exit 1
fi

# Required variables
REQUIRED_VARS=(
    "VITE_SUPABASE_URL"
    "VITE_SUPABASE_ANON_KEY"
)

MISSING_VARS=()

# Check each required variable
for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^${var}=" .env || grep -q "^${var}=$" .env || grep -q "^${var}=your_" .env; then
        MISSING_VARS+=("$var")
    fi
done

# Report results
if [ ${#MISSING_VARS[@]} -eq 0 ]; then
    echo "✅ All required environment variables are set!"
    echo ""
    echo "📋 Environment variables found:"
    for var in "${REQUIRED_VARS[@]}"; do
        value=$(grep "^${var}=" .env | cut -d '=' -f2)
        # Mask sensitive values
        if [[ "$var" == *"KEY"* ]] || [[ "$var" == *"SECRET"* ]] || [[ "$var" == *"PASSWORD"* ]]; then
            masked_value="${value:0:8}...${value: -4}"
            echo "  ✓ $var=$masked_value"
        else
            echo "  ✓ $var=$value"
        fi
    done
    exit 0
else
    echo "❌ Missing or incomplete environment variables:"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    echo ""
    echo "Please update your .env file with production values."
    exit 1
fi
