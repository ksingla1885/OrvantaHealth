@echo off
echo Starting IntelliMed Backend Server...
cd /d "d:\IntelliMed\backend"
echo Current directory: %CD%
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting server...
node server.js
pause
