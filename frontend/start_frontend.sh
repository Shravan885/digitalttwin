#!/bin/bash
echo "Starting Ahmedabad Digital Twin Frontend..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo ""
echo "Starting Vite dev server on http://localhost:5173"
echo ""
npm run dev
