@echo off
chcp 65001 >nul
echo ==^> 推送到 GitCode...
git push gitcode master
if %errorlevel% neq 0 echo GitCode 推送失败

echo ==^> 推送到 GitHub...
git push origin master
if %errorlevel% neq 0 echo GitHub 推送失败

echo ==^> 推送到 Gitee...
git push gitee master
if %errorlevel% neq 0 echo Gitee 推送失败

echo ==^> 全部完成
