#!/bin/bash

# GameStack Deployment Helper Script
# This script helps prepare the project for deployment

set -e

echo "🚀 GameStack Deployment Helper"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}⚠️  Git repository not found. Initializing...${NC}"
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
fi

# Check if remote exists
if ! git remote get-url origin &>/dev/null; then
    echo -e "${YELLOW}⚠️  No remote repository found.${NC}"
    echo "Please add your GitHub repository:"
    echo "  git remote add origin https://github.com/yourusername/gamestack.git"
    echo ""
    read -p "Do you want to add a remote repository now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your GitHub repository URL: " repo_url
        git remote add origin "$repo_url"
        echo -e "${GREEN}✅ Remote repository added${NC}"
    fi
fi

# Check build status
echo ""
echo "🔨 Checking builds..."
echo ""

# Test backend build
echo "Building backend..."
cd backend-spring
if mvn clean package -DskipTests &>/dev/null; then
    echo -e "${GREEN}✅ Backend builds successfully${NC}"
else
    echo -e "${RED}❌ Backend build failed${NC}"
    exit 1
fi
cd ..

# Test frontend build
echo "Building frontend..."
cd frontend
if npm run build &>/dev/null; then
    echo -e "${GREEN}✅ Frontend builds successfully${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi
cd ..

# Check deployment files
echo ""
echo "📋 Checking deployment files..."
echo ""

files=(
    "frontend/vercel.json"
    "frontend/netlify.toml"
    "backend-spring/railway.json"
    "backend-spring/Procfile"
    "backend-spring/render.yaml"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file exists${NC}"
    else
        echo -e "${YELLOW}⚠️  $file not found${NC}"
    fi
done

# Check environment variables
echo ""
echo "🔐 Environment Variables Checklist:"
echo ""
echo "Backend (Railway):"
echo "  - MONGODB_URI (required)"
echo "  - JWT_SECRET (required)"
echo "  - CORS_ALLOWED_ORIGINS (required after frontend deploy)"
echo "  - PORT (optional, defaults to 3001)"
echo ""
echo "Frontend (Vercel):"
echo "  - VITE_API_URL (required)"
echo ""

# Generate JWT secret suggestion
echo "💡 Generate JWT Secret:"
echo "  openssl rand -base64 64"
echo ""

# Deployment steps
echo "📚 Deployment Steps:"
echo ""
echo "1. Setup MongoDB Atlas:"
echo "   - Create account at https://www.mongodb.com/cloud/atlas/register"
echo "   - Create free cluster (M0)"
echo "   - Create database user"
echo "   - Whitelist IP: 0.0.0.0/0"
echo "   - Get connection string"
echo ""
echo "2. Deploy Backend to Railway:"
echo "   - Sign up at https://railway.app"
echo "   - Deploy from GitHub"
echo "   - Set root directory: backend-spring"
echo "   - Add environment variables"
echo "   - Get backend URL"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Sign up at https://vercel.com"
echo "   - Deploy from GitHub"
echo "   - Set root directory: frontend"
echo "   - Add VITE_API_URL environment variable"
echo "   - Get frontend URL"
echo ""
echo "4. Update Backend CORS:"
echo "   - Update CORS_ALLOWED_ORIGINS in Railway"
echo "   - Redeploy backend"
echo ""
echo "5. Test Deployment:"
echo "   - Open frontend URL"
echo "   - Test registration/login"
echo "   - Verify API calls work"
echo ""

# Git status
echo "📦 Git Status:"
git status --short
echo ""

# Ask if user wants to commit and push
read -p "Do you want to commit and push changes to GitHub? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Committing changes..."
    git add .
    git commit -m "Prepare for deployment: Add deployment configs and environment variable support" || echo "No changes to commit"
    
    echo "Pushing to GitHub..."
    if git push origin main 2>/dev/null || git push -u origin main 2>/dev/null; then
        echo -e "${GREEN}✅ Changes pushed to GitHub${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not push to GitHub. Please push manually.${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Follow the deployment guide: DEPLOY-SCRIPT.md"
echo "2. Or use the quick start guide: DEPLOYMENT-QUICKSTART.md"
echo ""
echo "Happy Deploying! 🚀"

