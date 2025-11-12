#!/bin/bash

# GameStack Deployment Setup Script
# This script helps you set up environment variables for deployment

echo "🚀 GameStack Deployment Setup"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Generated JWT Secret
JWT_SECRET="dn7YSEYE2BXu7X2BcVCkGzIgOR6rlOqeYwg47O0nGhQVeXDhLd3qy25yGLohwnT9dkSVCcxsQhH4hLd4sSqYmA=="

# MongoDB Connection String
MONGODB_URI="mongodb+srv://saijeevan8259_db_user:ohl3omR9HFV3GKIB@cluster0.rb8gtt9.mongodb.net/gamestack"

echo "📋 Environment Variables for Railway (Backend):"
echo "-----------------------------------------------"
echo ""
echo "MONGODB_URI=${MONGODB_URI}"
echo "JWT_SECRET=${JWT_SECRET}"
echo "CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app"
echo "PORT=3001"
echo ""
echo -e "${YELLOW}Note: Update CORS_ALLOWED_ORIGINS after frontend is deployed${NC}"
echo ""
echo "📋 Environment Variables for Vercel (Frontend):"
echo "-----------------------------------------------"
echo ""
echo "VITE_API_URL=https://your-backend-url.railway.app/api"
echo ""
echo -e "${YELLOW}Note: Update VITE_API_URL after backend is deployed${NC}"
echo ""
echo "✅ Ready to deploy!"
echo ""
echo "Next steps:"
echo "1. Push code to GitHub"
echo "2. Deploy backend to Railway with the variables above"
echo "3. Deploy frontend to Vercel with VITE_API_URL"
echo "4. Update CORS_ALLOWED_ORIGINS in Railway with frontend URL"
echo ""

