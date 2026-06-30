$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

$package = Get-Content package.json -Raw -Encoding utf8 | ConvertFrom-Json
$version = $package.version
$packageName = $package.name
$PublishDir = "netlify-publish"
$ReleaseDir = "release"
$tag = "v$version"
$sevenZipPath = "wps-addon-build\$packageName.7z"
$exePath = "wps-addon-build\$packageName.exe"
$releaseSevenZipPath = "$ReleaseDir\$packageName.7z"

Write-Host ">>> Deploy v$version" -ForegroundColor Cyan

Write-Host "[1/6] Vite build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { throw "Vite build failed" }

Write-Host "[2/6] Generate .7z (select 'offline plugin')..." -ForegroundColor Yellow
wpsjs build
if ($LASTEXITCODE -ne 0) { throw "wpsjs build failed" }
if (!(Test-Path $sevenZipPath)) { throw "Missing $sevenZipPath" }

Write-Host "[3/6] Prepare publish and release files..." -ForegroundColor Yellow
Remove-Item -Recurse -Force $PublishDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $PublishDir | Out-Null
Copy-Item docs/index.html $PublishDir/
Copy-Item docs/version.txt $PublishDir/
Copy-Item docs/_headers $PublishDir/
Copy-Item $sevenZipPath $PublishDir/
New-Item -ItemType Directory -Force $ReleaseDir | Out-Null
Copy-Item $sevenZipPath $releaseSevenZipPath -Force

Write-Host "[4/6] Generate exe..." -ForegroundColor Yellow
wpsjs build --exe
if ($LASTEXITCODE -ne 0) { throw "wpsjs build --exe failed" }
if (!(Test-Path $exePath)) { throw "Missing $exePath" }

Write-Host "[5/6] Create GitHub Release..." -ForegroundColor Yellow
$existingTags = gh release list --json tagName --jq '.[].tagName'
if ($existingTags -match [regex]::Escape($tag)) {
  Write-Host "Release $tag already exists, skip." -ForegroundColor DarkYellow
} else {
  git tag -f $tag
  if ($LASTEXITCODE -ne 0) { throw "Git tag failed" }
  git push origin $tag --force
  if ($LASTEXITCODE -ne 0) { throw "Git tag push failed" }
  gh release create $tag --title $tag --notes "详见 CHANGELOG.md" $releaseSevenZipPath $exePath
  if ($LASTEXITCODE -ne 0) { throw "GitHub Release failed" }
}

Write-Host "[6/6] Deploy static files to Netlify..." -ForegroundColor Yellow
npx netlify deploy --prod --dir $PublishDir
if ($LASTEXITCODE -ne 0) { throw "Netlify deploy failed" }

Write-Host ">>> Done! v$version released and deployed to Netlify" -ForegroundColor Green
