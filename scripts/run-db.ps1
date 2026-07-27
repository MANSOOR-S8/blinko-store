# Create data directory if it doesn't exist
$dbPath = Join-Path $PSScriptRoot "..\mongodb-data"
if (!(Test-Path -Path $dbPath)) {
    New-Item -ItemType Directory -Force -Path $dbPath
}

# Start mongod
Write-Host "Starting local user-space MongoDB on port 27017..." -ForegroundColor Green
& "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath $dbPath --port 27017
