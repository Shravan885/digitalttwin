from climate_engine import get_live_climate
from ndvi_engine import calculate_ndvi
from dem_engine import calculate_flood_sensitivity


def normalize(value, min_val, max_val):
    return max(0, min(1, (value - min_val) / (max_val - min_val)))


def compute_resilience_score(
    simulated_rain=None,
    green_boost=0,
    temp_variation=0,
    population_modifier=1.0,
):

    climate = get_live_climate()

    temperature = climate["temperature"] + temp_variation
    rainfall = simulated_rain if simulated_rain is not None else climate["rainfall"]

    ndvi = calculate_ndvi()
    ndvi = min(ndvi + green_boost, 1.0)

    try:
        flood_base = calculate_flood_sensitivity()
    except Exception:
        flood_base = 0.5

    # --- Normalized Indices ---
    temp_index = normalize(temperature, 25, 45)
    rain_index = normalize(rainfall, 0, 200)
    veg_index = normalize(ndvi, 0, 0.6)

    # --- Risk Models ---
    heat_risk = temp_index * (1 - veg_index)
    flood_risk = rain_index * flood_base * (1 - veg_index)

    urban_penalty = 0.2 * (1 - veg_index)
    urban_stress_index = round(urban_penalty + 0.3 * heat_risk + 0.2 * flood_risk, 3)

    total_risk = (0.5 * heat_risk) + (0.3 * flood_risk) + urban_penalty

    resilience_score = 100 * (1 - total_risk)
    resilience_score = round(max(0, min(100, resilience_score)), 2)

    # Affected population (proxy: flood_risk * heat_risk * base pop)
    base_pop = 8_500_000  # Ahmedabad metro
    affected_population = int(
        base_pop
        * population_modifier
        * (flood_risk * 0.4 + heat_risk * 0.2)
    )

    # 5-year projection (simple trend)
    projection_5y = [
        resilience_score,
        round(max(0, resilience_score - 0.5 - rain_index * 2), 2),
        round(max(0, resilience_score - 1 - rain_index * 3), 2),
        round(max(0, resilience_score - 1.5 - rain_index * 4), 2),
        round(max(0, resilience_score - 2 - rain_index * 5), 2),
    ]

    return {
{
    "city": "Ahmedabad",

    "climate": {
        "temperature": round(temperature, 1),
        "rainfall": round(rainfall, 1),
    },

    "vegetation": {
        "ndvi": round(ndvi, 3),
    },

    "risk_metrics": {
        "heat_risk": round(heat_risk, 3),
        "flood_risk": round(flood_risk, 3),
        "urban_stress_index": urban_stress_index,
    },

    "impact_analysis": {
        "affected_population": affected_population,
    },

    "resilience": {
        "score": resilience_score,
        "projection_5y": projection_5y,
    }
}