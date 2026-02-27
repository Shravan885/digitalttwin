# Ahmedabad City Resilience Simulator

Real-time urban digital twin for SDG 11 - Sustainable Cities and Communities

## Project Structure

```
Resilent-City-/
├── backend/              # Python FastAPI backend
│   ├── app.py           # Main API server
│   ├── twin_engine.py   # Resilience computation engine
│   ├── climate_engine.py # Live weather data
│   ├── ndvi_engine.py   # Vegetation analysis
│   ├── dem_engine.py    # Flood sensitivity
│   └── requirements.txt # Python dependencies
├── frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app
│   │   └── main.jsx     # Entry point
│   ├── package.json     # Node dependencies
│   └── vite.config.js   # Vite configuration
├── data/                # GeoJSON boundary data
└── rasters/             # Satellite imagery (NDVI, DEM)
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create Python virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the backend server:
```bash
python app.py
```

Backend will run on http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Features

- Real-time climate data integration
- 3D Mapbox visualization
- Interactive scenario simulation
- Flood risk analysis
- Heat risk assessment
- Urban stress index calculation
- 5-year resilience projection

## API Endpoints

- `GET /` - API status
- `GET /baseline` - Current conditions
- `GET /heavy-rain` - Flash flood scenario
- `GET /green-boost` - Urban greening scenario
- `GET /scenario?rain=X&green=Y&temp=Z` - Custom scenario
- `GET /ndvi` - Vegetation index
- `GET /flood-risk` - Flood sensitivity
- `GET /climate` - Live weather data
- `GET /compare` - Compare scenarios

## Technologies

### Backend
- FastAPI
- Rasterio (geospatial)
- GeoPandas
- NumPy
- OpenWeatherMap API

### Frontend
- React 19
- Vite
- Mapbox GL JS
- Recharts
- Tailwind CSS 4

## License

MIT

Testing git functionality
