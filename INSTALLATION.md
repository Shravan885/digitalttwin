# Installation & Setup Guide

## ✅ Project Structure Created

Your project is now organized with a clean separation:

```
Resilent-City-/
├── backend/              ← Python FastAPI backend
├── frontend/             ← React + Vite frontend
├── data/                 ← GeoJSON boundary data
├── rasters/              ← Satellite imagery
├── README.md             ← Project documentation
├── QUICK_START.md        ← Quick start guide
└── .gitignore            ← Git ignore rules
```

## 🚀 Getting Started

### Step 1: Backend Setup

```bash
cd Resilent-City-/backend

# Windows
start_backend.bat

# Linux/Mac
chmod +x start_backend.sh
./start_backend.sh
```

This will:
- Create a Python virtual environment
- Install all dependencies from requirements.txt
- Start the FastAPI server on http://localhost:8000

### Step 2: Frontend Setup (New Terminal)

```bash
cd Resilent-City-/frontend

# Windows
start_frontend.bat

# Linux/Mac
chmod +x start_frontend.sh
./start_frontend.sh
```

This will:
- Install Node.js dependencies
- Start the Vite dev server on http://localhost:5173

### Step 3: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📦 What's Included

### Backend (`backend/`)
- `app.py` - FastAPI server with all endpoints
- `twin_engine.py` - Core resilience computation
- `climate_engine.py` - OpenWeatherMap integration
- `ndvi_engine.py` - Vegetation analysis from Sentinel-2
- `dem_engine.py` - Flood sensitivity from SRTM DEM
- `boundary_processing.py` - GeoJSON boundary extraction
- `requirements.txt` - Python dependencies

### Frontend (`frontend/`)
- `src/App.jsx` - Main application component
- `src/components/Header.jsx` - Top navigation bar
- `src/components/MapSection.jsx` - 3D Mapbox visualization
- `src/components/ControlPanel.jsx` - Scenario controls
- `src/components/MetricsSection.jsx` - Metrics dashboard
- `package.json` - Node.js dependencies
- `vite.config.js` - Vite configuration with proxy

### Data Files
- `data/ahmedabad_boundary.geojson` - City boundary
- `data/gadm/` - Administrative boundaries
- `rasters/B04.jp2` - Sentinel-2 Red band
- `rasters/B08.jp2` - Sentinel-2 NIR band
- `rasters/N23E072.hgt` - SRTM elevation data

## 🔧 Dependencies

### Backend Requirements
- FastAPI 0.115.0
- Uvicorn (ASGI server)
- GeoPandas (geospatial)
- Rasterio (raster processing)
- NumPy, Pandas
- Requests (API calls)

### Frontend Requirements
- React 19.2.0
- Vite 5.4.0
- Mapbox GL JS 3.0.0
- Recharts 2.12.0
- Tailwind CSS 4.0.0

## 🎯 Features

1. **Real-time Climate Data** - Live weather from OpenWeatherMap
2. **3D Visualization** - Interactive Mapbox map with terrain
3. **Scenario Simulation**:
   - Rainfall: 0-300mm
   - Green Cover: 0-30% increase
   - Temperature: -5 to +5°C variation
   - Population: 0.5-2.0x density modifier
4. **Risk Analysis**:
   - Flood risk (DEM-based)
   - Heat risk (temperature + vegetation)
   - Urban stress index
   - Affected population estimate
5. **Projections** - 5-year resilience forecast

## 🐛 Troubleshooting

### Backend Won't Start
- Check Python version: `python --version` (need 3.8+)
- Verify port 8000 is free
- Try manual install: `pip install -r requirements.txt`

### Frontend Won't Start
- Check Node version: `node --version` (need 16+)
- Verify port 5173 is free
- Clear cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Map Not Loading
- Check Mapbox token in `frontend/src/components/MapSection.jsx`
- Verify internet connection
- Check browser console for errors

### API Errors
- Ensure backend is running on port 8000
- Check proxy configuration in `frontend/vite.config.js`
- Verify data files exist in `data/` and `rasters/`

## 📝 Next Steps

1. ✅ Backend and frontend are separated
2. ✅ All files copied to clean structure
3. ✅ Start scripts created for easy launch
4. ✅ Data files (rasters, boundaries) copied
5. ⏭️ You can now delete the old folders:
   - `ahmedabad_digital_twin/`
   - `resilient-city/`

## 🎉 You're Ready!

Run the start scripts and access http://localhost:5173 to see your application!
