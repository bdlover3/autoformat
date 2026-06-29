$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

# 1. 读取版本号
$version = (Get-Content package.json -Raw | ConvertFrom-Json).version
Write-Host "==> 部署 v$version" -ForegroundColor Cyan

# 2. Vite 构建
Write-Host "==> 1/6: Vite 构建" -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { throw "Vite 构建失败" }

# 3. 生成离线插件 .7z（无交互）
Write-Host "==> 2/6: 生成离线插件 .7z" -ForegroundColor Yellow
node scripts/build-offline.js
if ($LASTEXITCODE -ne 0) { throw "离线插件构建失败" }

# 4. 准备纯净部署目录
Write-Host "==> 3/6: 准备部署目录" -ForegroundColor Yellow
Remove-Item -Recurse -Force vercel-publish -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force vercel-publish | Out-Null
Copy-Item docs/index.html vercel-publish/
Copy-Item docs/version.txt vercel-publish/
Copy-Item docs/_headers vercel-publish/
Copy-Item wps-addon-build/autoformat.7z vercel-publish/

# 给 GitHub Release 留一份 .7z 副本（wpsjs build --exe 会删掉原始的 .7z）
New-Item -ItemType Directory -Force release | Out-Null
Copy-Item wps-addon-build/autoformat.7z release/

# 5. 生成 exe
Write-Host "==> 4/6: 生成 exe 安装包" -ForegroundColor Yellow
wpsjs build --exe
if ($LASTEXITCODE -ne 0) { throw "exe 构建失败" }

# 6. GitHub Release
Write-Host "==> 5/6: 创建 GitHub Release" -ForegroundColor Yellow
$tag = "v$version"
$releaseTitle = "v$version"
$notes = "详见 CHANGELOG.md"
$existing = gh release view $tag --json tagName 2>$null
if ($existing) {
  Write-Host "  标签 $tag 已存在，跳过 Release 创建" -ForegroundColor DarkYellow
} else {
  git tag -f $tag
  git push origin $tag --force
  gh release create $tag --title $releaseTitle --notes $notes `
    release/autoformat.7z wps-addon-build/autoformat.exe
  if ($LASTEXITCODE -ne 0) { throw "GitHub Release 创建失败" }
}

# 7. 部署 Vercel
Write-Host "==> 6/6: 部署到 Vercel" -ForegroundColor Yellow
vercel --prod
if ($LASTEXITCODE -ne 0) { throw "Vercel 部署失败" }

Write-Host "==> 部署完成！v$version 已发布到 Vercel 和 GitHub Release" -ForegroundColor Green
