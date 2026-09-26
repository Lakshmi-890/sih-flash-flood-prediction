Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "  DISASTER INTEL: REAL-TIME FLASH FLOOD & LANDSLIDE PREDICTION" -ForegroundColor Green
Write-Host "  Starting Backend (port 8000) & Frontend (port 5173)..." -ForegroundColor Yellow
Write-Host "=====================================================================" -ForegroundColor Cyan

$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $ProjectDir

$PythonExe = Join-Path $ProjectDir ".venv\Scripts\python.exe"
if (-not (Test-Path $PythonExe)) {
    Write-Host "[ERROR] Python virtual environment not found at $PythonExe" -ForegroundColor Red
    exit 1
}

Write-Host "[*] Launching FastAPI Backend on http://localhost:8000 ..." -ForegroundColor Cyan
Start-Process cmd.exe -ArgumentList "/k", ".venv\Scripts\python.exe -m uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload" -WorkingDirectory $ProjectDir

Write-Host "[*] Launching Vite React Frontend on http://localhost:5173 ..." -ForegroundColor Cyan
Start-Process cmd.exe -ArgumentList "/k", "npm run dev" -WorkingDirectory $ProjectDir

Write-Host "=====================================================================" -ForegroundColor Green
Write-Host "  Both servers launched successfully!" -ForegroundColor Green
Write-Host "  - Backend:   http://localhost:8000  (Health: /health, Docs: /docs)" -ForegroundColor White
Write-Host "  - Frontend:  http://localhost:5173" -ForegroundColor White
Write-Host "=====================================================================" -ForegroundColor Green
