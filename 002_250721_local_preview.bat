@echo off
chcp 65001 >nul
echo ================================
echo    Hexo Local Preview Script
echo ================================
echo.

echo [0/4] Checking port 4000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4000 ^| findstr LISTENING') do (
    echo Found process using port 4000: %%a
    tasklist /fi "pid eq %%a" | findstr /i "node.exe" >nul
    if !errorlevel! equ 0 (
        echo Stopping Node.js process on port 4000...
        taskkill /pid %%a /f >nul 2>&1
        echo Port 4000 cleared.
        timeout /t 2 /nobreak >nul
    ) else (
        echo Port 4000 is used by non-Node.js process, switching to port 4001...
        set USE_PORT=4001
        goto :start_server
    )
)
set USE_PORT=4000

:start_server
echo.
echo [1/4] Cleaning cache...
call hexo clean

echo.
echo [2/4] Generating static files...
call hexo generate

echo.
echo [3/4] Starting local server...
if "%USE_PORT%"=="4001" (
    echo Preview URL: http://localhost:4001
    echo Press Ctrl+C to stop server
    echo.
    echo Opening browser in 3 seconds...
    timeout /t 3 /nobreak >nul
    start http://localhost:4001
    call hexo server -p 4001
) else (
    echo Preview URL: http://localhost:4000
    echo Press Ctrl+C to stop server
    echo.
    echo Opening browser in 3 seconds...
    timeout /t 3 /nobreak >nul
    start http://localhost:4000
    call hexo server -p 4000
)

pause
