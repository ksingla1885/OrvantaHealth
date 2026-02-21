@echo off
REM Production Build & Test Script for Windows
REM Run this locally before deployment to catch issues early

echo.
echo 🏥 OrvantaHealth - Production Build Verification
echo ==================================================
echo.

REM Check Node.js
echo 📋 Checking prerequisites...
where node >nul 2>nul
if errorlevel 1 (
    echo ✗ Node.js not found
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do echo ✓ Node.js %%i

where npm >nul 2>nul
if errorlevel 1 (
    echo ✗ npm not found
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do echo ✓ npm %%i
echo.

REM Frontend Build
echo 🎨 Building Frontend...
cd frontend
call npm install --prefer-offline --no-audit
if errorlevel 1 (
    echo ✗ Frontend npm install failed
    exit /b 1
)
call npm run build
if errorlevel 1 (
    echo ✗ Frontend build failed
    exit /b 1
)
echo ✓ Frontend built successfully
if exist build (
    for /f "tokens=*" %%i in ('dir /s /b build ^| find /c /v ""') do echo ✓ Build files created
)
cd ..
echo.

REM Backend Preparation
echo 🔧 Checking Backend...
cd backend
call npm install --prefer-offline --no-audit
if errorlevel 1 (
    echo ✗ Backend npm install failed
    exit /b 1
)
cd ..
echo ✓ Backend dependencies checked
echo.

REM Environment Variables Check
echo 🔐 Checking environment variables...
if not exist ".env.example" (
    echo ✗ .env.example not found
    exit /b 1
)
echo ✓ .env.example exists

if not exist "frontend\.env.example" (
    echo ✗ frontend\.env.example not found
    exit /b 1
)
echo ✓ frontend\.env.example exists
echo.

REM Summary
echo ==================================================
echo ✓ Production build verification complete!
echo.
echo 📝 Next Steps:
echo 1. Copy .env.example to .env and fill in values
echo 2. Commit and push to GitHub
echo 3. Deploy Frontend to Vercel
echo 4. Deploy Backend to Render/Railway
echo 5. Update REACT_APP_API_URL with backend URL
echo 6. Redeploy frontend
echo.
echo 📚 Documentation:
echo - Quick Start: DEPLOYMENT_QUICK_START.md
echo - Full Guide: DEPLOYMENT.md
echo - Checklist: PRODUCTION_CHECKLIST.md
echo.
