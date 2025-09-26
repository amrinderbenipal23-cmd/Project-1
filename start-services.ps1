Write-Host "🎵 Starting Punjabi Music Platform Services..." -ForegroundColor Green
Write-Host ""

# Install API dependencies
Write-Host "📦 Installing API dependencies..." -ForegroundColor Yellow
Set-Location api
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install API dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "🚀 Starting API server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd api; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "⏳ Waiting for API to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "🌐 Opening frontend..." -ForegroundColor Cyan
Start-Process "safari-mobile.html"

Write-Host ""
Write-Host "✅ Services started!" -ForegroundColor Green
Write-Host "📡 API: http://localhost:3001" -ForegroundColor Blue
Write-Host "🌐 Frontend: safari-mobile.html" -ForegroundColor Blue
Write-Host ""
Write-Host "Press any key to stop services..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "🛑 Stopping services..." -ForegroundColor Red
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✅ Services stopped." -ForegroundColor Green
