@echo off
chcp 65001 >nul
echo ================================
echo    Hexo 快速发布脚本
echo ================================
echo.

echo [1/4] 清理缓存...
call hexo clean

echo.
echo [2/4] 生成静态文件...
call hexo generate

echo.
echo [3/4] 部署到 GitHub Pages...
call hexo deploy

echo.
echo [4/4] 发布完成！
echo 网站地址: https://gameloft333.github.io/hexo_blog_250721/
echo.

pause
