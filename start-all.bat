@echo off
title Disaster Intel - Flash Flood Prediction Launcher
echo =====================================================================
echo   DISASTER INTEL: REAL-TIME FLASH FLOOD ^& LANDSLIDE PREDICTION
echo   Starting Backend (port 8000) ^& Frontend (port 5173)...
echo =====================================================================

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: Check virtual environment
if not exist ".venv\Scripts\python.exe" (
    echo [ERROR] Python virtual environment not found in .venv!
    pause
    exit /b 1
)

echo [*] Starting FastAPI Backend Daemon on http://localhost:8000 ...
start "Disaster Intel - Backend (Port 8000)" cmd /k ".venv\Scripts\python.exe -m uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload"

echo [*] Starting Vite React Frontend on http://localhost:5173 ...
start "Disaster Intel - Frontend (Port 5173)" cmd /k "npm run dev"

echo =====================================================================
echo   All systems initializing!
echo   - Backend:   http://localhost:8000  (Health: /health, Docs: /docs)
echo   - Frontend:  http://localhost:5173
echo =====================================================================
