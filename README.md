# Ahmedabad City Resilience Simulator

Real-time urban digital twin for SDG 11 - Sustainable Cities and Communities
# Ahmedabad City Resilience Simulator

Real-time urban digital twin for SDG 11 - Sustainable Cities and Communities

## 🌍 Live Digital Twin (Google Earth Engine)
https://code.earthengine.google.com/96e343ca9ba781496317f657492f5b14

## Project Structure

```
Ahmedabad-Resilience-Simulator/
│
├── backend/
│   ├── app.py
│   ├── twin_engine.py
│   ├── climate_engine.py
│   ├── ndvi_engine.py
│   ├── dem_engine.py
│   ├── requirements.txt
│   └── .env                (NOT pushed to GitHub)
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── data/
│   └── ahmedabad_boundary.geojson
│
├── assets/
│   ├── architecture.png
│   ├── dashboard_screenshot.png
│   └── gee_heatmap.png
│
├── rasters/                (ONLY if small files)
│   ├── ndvi_2023.tif
│   └── dem.tif
│
├── .gitignore
├── README.md
└── LICENSE

Ahmedabad-Resilience-Simulator/
├── backend/
├── frontend/
├── data/
├── assets/
├── README.md
├── .gitignore
└── LICENSE
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
