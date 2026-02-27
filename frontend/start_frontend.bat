@echo off
echo Starting Ahmedabad Digital Twin Frontend...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install
)

REM Start the development server
echo.
echo Starting Vite dev server on http://localhost:5173
echo.
npm run dev
