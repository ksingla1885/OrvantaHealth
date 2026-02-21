#!/bin/bash
# Production Build & Test Script
# Run this locally before deployment to catch issues early

set -e

echo "🏥 OrvantaHealth - Production Build Verification"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"
echo ""

# Frontend Build
echo "🎨 Building Frontend..."
cd frontend
npm install --prefer-offline --no-audit
npm run build
echo -e "${GREEN}✓ Frontend built successfully${NC}"
if [ -d "build" ]; then
    SIZE=$(du -sh build | cut -f1)
    echo -e "${GREEN}✓ Build size: $SIZE${NC}"
fi
cd ..
echo ""

# Backend Preparation
echo "🔧 Checking Backend..."
cd backend
npm install --prefer-offline --no-audit
npm audit --audit-level=moderate || echo -e "${YELLOW}⚠ Some audit issues found - review before deploying${NC}"
cd ..
echo -e "${GREEN}✓ Backend dependencies checked${NC}"
echo ""

# Environment Variables Check
echo "🔐 Checking environment variables..."
if [ ! -f ".env.example" ]; then
    echo -e "${RED}✗ .env.example not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ .env.example exists${NC}"

if [ ! -f "frontend/.env.example" ]; then
    echo -e "${RED}✗ frontend/.env.example not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ frontend/.env.example exists${NC}"
echo ""

# Git Status
echo "📦 Git Status..."
if [ -d ".git" ]; then
    UNCOMMITTED=$(git status --porcelain | wc -l)
    if [ $UNCOMMITTED -gt 0 ]; then
        echo -e "${YELLOW}⚠ You have $UNCOMMITTED uncommitted changes${NC}"
        git status --short
    else
        echo -e "${GREEN}✓ All changes committed${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Not a git repository${NC}"
fi
echo ""

# Summary
echo "=================================================="
echo -e "${GREEN}✓ Production build verification complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. Copy .env.example to .env and fill in values"
echo "2. Commit and push to GitHub"
echo "3. Deploy Frontend to Vercel"
echo "4. Deploy Backend to Render/Railway"
echo "5. Update REACT_APP_API_URL with backend URL"
echo "6. Redeploy frontend"
echo ""
echo "📚 Documentation:"
echo "- Quick Start: DEPLOYMENT_QUICK_START.md"
echo "- Full Guide: DEPLOYMENT.md"
echo "- Checklist: PRODUCTION_CHECKLIST.md"
echo ""
