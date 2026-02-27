"""
FastAPI Backend for Ahmedabad Digital Twin
Pure API - No frontend serving
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from twin_engine import compute_resilience_score
from ndvi_engine import calculate_ndvi
from dem_engine import calculate_flood_sensitivity
from climate_engine import get_live_climate

app = FastAPI(
    title="Ahmedabad Digital Twin API",
    description="Real-time urban resilience simulation for SDG 11",
    version="2.0.0"
)

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    """API root - status check"""
    return {
        "message": "Ahmedabad Digital Twin API Running",
        "version": "2.0.0",
        "status": "operational",
        "endpoints": {
            "baseline": "/baseline",
            "heavy_rain": "/heavy-rain",
            "green_boost": "/green-boost",
            "custom_scenario": "/scenario?rain=X&green=Y",
            "ndvi": "/ndvi",
            "flood_risk": "/flood-risk",
            "climate": "/climate",
            "compare": "/compare",
            "docs": "/docs"
        }
    }

@app.get("/baseline")
def baseline():
    """Get current resilience score with real-time data"""
    result = compute_resilience_score(simulated_rain=0)
    return {
        "scenario": "baseline",
        "description": "Current conditions with live climate data",
        "data": result
    }

@app.get("/heavy-rain")
def heavy_rain():
    """Simulate flash flood scenario (150mm rainfall)"""
    result = compute_resilience_score(simulated_rain=150)
    return {
        "scenario": "heavy_rain",
        "description": "Flash flood simulation with 150mm rainfall",
        "data": result
    }

@app.get("/green-boost")
def green_boost():
    """Simulate 10% increase in green cover"""
    result = compute_resilience_score(simulated_rain=0, green_boost=0.1)
    return {
        "scenario": "green_boost",
        "description": "Urban greening with 10% vegetation increase",
        "data": result
    }

@app.get("/scenario")
def custom_scenario(
    rain: float = 0,
    green: float = 0,
    temp: float = 0,
    population: float = 1.0,
):
    """
    Custom scenario simulation

    Parameters:
    - rain: Simulated rainfall in mm (0-300)
    - green: NDVI boost (0-0.3 recommended)
    - temp: Temperature variation in °C (-5 to +5)
    - population: Population density modifier (0.5-2.0)
    """
    result = compute_resilience_score(
        simulated_rain=rain,
        green_boost=green,
        temp_variation=temp,
        population_modifier=population,
    )
    return {
        "scenario": "custom",
        "description": f"Custom scenario: {rain}mm rain, +{green*100:.0f}% vegetation, {temp:+.1f}°C",
        "parameters": {
            "rainfall_mm": rain,
            "green_boost": green,
            "temp_variation": temp,
            "population_modifier": population,
        },
        "data": result,
    }

@app.get("/ndvi")
def get_ndvi():
    """Get current vegetation health (NDVI)"""
    ndvi = calculate_ndvi()
    return {
        "metric": "NDVI",
        "value": round(ndvi, 4),
        "interpretation": "Good vegetation" if ndvi > 0.3 else "Low vegetation",
        "description": "Normalized Difference Vegetation Index from Sentinel-2"
    }

@app.get("/flood-risk")
def get_flood_risk():
    """Get terrain-based flood sensitivity"""
    flood = calculate_flood_sensitivity()
    return {
        "metric": "Flood Sensitivity",
        "value": round(flood, 4),
        "interpretation": "High risk" if flood > 0.5 else "Moderate risk",
        "description": "Fraction of low-lying areas from SRTM DEM"
    }

@app.get("/climate")
def get_climate():
    """Get live weather data for Ahmedabad"""
    climate = get_live_climate()
    return {
        "metric": "Live Climate",
        "data": climate,
        "source": "OpenWeatherMap API",
        "city": "Ahmedabad, India"
    }

@app.get("/compare")
def compare_scenarios():
    """Compare all three main scenarios"""
    baseline_result = compute_resilience_score(simulated_rain=0)
    heavy_rain_result = compute_resilience_score(simulated_rain=150)
    green_boost_result = compute_resilience_score(simulated_rain=0, green_boost=0.1)
    
    return {
        "comparison": "Three scenario analysis",
        "scenarios": {
            "baseline": {
                "score": baseline_result["resilience_score"],
                "description": "Current conditions"
            },
            "heavy_rain": {
                "score": heavy_rain_result["resilience_score"],
                "description": "Flash flood (150mm)",
                "impact": round(baseline_result["resilience_score"] - heavy_rain_result["resilience_score"], 2)
            },
            "green_boost": {
                "score": green_boost_result["resilience_score"],
                "description": "10% more vegetation",
                "impact": round(green_boost_result["resilience_score"] - baseline_result["resilience_score"], 2)
            }
        },
        "insights": {
            "flood_impact": f"Heavy rain reduces score by {round(baseline_result['resilience_score'] - heavy_rain_result['resilience_score'], 2)} points",
            "green_benefit": f"Green infrastructure improves score by {round(green_boost_result['resilience_score'] - baseline_result['resilience_score'], 2)} points"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
