# Quick Start Guide

## Prerequisites

- Python 3.8+ installed
- Node.js 16+ installed
- Git (optional)

## Running the Application

### Option 1: Using Start Scripts (Recommended)

#### Windows:

1. Start Backend:
```bash
cd backend
start_backend.bat
```

2. Start Frontend (in a new terminal):
```bash
cd frontend
start_frontend.bat
```

#### Linux/Mac:

1. Start Backend:
```bash
cd backend
chmod +x start_backend.sh
./start_backend.sh
```

2. Start Frontend (in a new terminal):
```bash
cd frontend
chmod +x start_frontend.sh
./start_frontend.sh
```

### Option 2: Manual Setup

#### Backend:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Project Structure

```
Resilent-City-/
├── backend/              # Python FastAPI backend
│   ├── app.py           # Main API server
│   ├── twin_engine.py   # Core resilience engine
│   ├── climate_engine.py # Weather data
│   ├── ndvi_engine.py   # Vegetation analysis
│   ├── dem_engine.py    # Flood analysis
│   └── requirements.txt
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── data/                # GeoJSON boundaries
└── rasters/             # Satellite data
```

## Features

1. Real-time climate data from OpenWeatherMap
2. Interactive 3D map with Mapbox
3. Scenario simulation:
   - Rainfall adjustment (0-300mm)
   - Green cover increase (0-30%)
   - Temperature variation (-5 to +5°C)
   - Population density modifier (0.5-2.0x)
4. Risk metrics:
   - Flood risk
   - Heat risk
   - Urban stress index
   - Affected population
5. 5-year resilience projection

## Troubleshooting

### Backend Issues:

- If Python packages fail to install, try: `pip install --upgrade pip`
- Ensure Python 3.8+ is installed: `python --version`
- Check if port 8000 is available

### Frontend Issues:

- If npm install fails, try: `npm cache clean --force`
- Ensure Node.js 16+ is installed: `node --version`
- Check if port 5173 is available

### Data Issues:

- Ensure `data/` and `rasters/` folders exist
- Check that `ahmedabad_boundary.geojson` is in `data/`
- Verify raster files (B04.jp2, B08.jp2, N23E072.hgt) are in `rasters/`

## Next Steps

1. Explore the interactive map
2. Adjust scenario parameters
3. View real-time metrics
4. Check API documentation at http://localhost:8000/docs
5. Customize the application for your needs

## Support

For issues or questions, check the README.md file or review the code documentation.
