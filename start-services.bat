@echo off
echo 🎵 Starting Punjabi Music Platform Services...
echo.

echo 📦 Installing API dependencies...
cd api
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install API dependencies
    pause
    exit /b 1
)

echo.
echo 🚀 Starting API server...
start "Punjabi Music API" cmd /k "cd api && npm start"

echo.
echo ⏳ Waiting for API to start...
timeout /t 3 /nobreak > nul

echo.
echo 🌐 Opening frontend...
start safari-mobile.html

echo.
echo ✅ Services started!
echo 📡 API: http://localhost:3001
echo 🌐 Frontend: safari-mobile.html
echo.
echo Press any key to stop services...
pause > nul

echo.
echo 🛑 Stopping services...
taskkill /f /im node.exe > nul 2>&1
echo ✅ Services stopped.
