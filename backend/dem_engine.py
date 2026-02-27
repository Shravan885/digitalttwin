import os
import rasterio
import numpy as np
import geopandas as gpd
from rasterio.mask import mask

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def calculate_flood_sensitivity():

    dem_path = os.path.join(BASE_DIR, "rasters", "N23E072.hgt")
    boundary_path = os.path.join(BASE_DIR, "data", "ahmedabad_boundary.geojson")

    with rasterio.open(dem_path) as src:
        raster_crs = src.crs

    boundary = gpd.read_file(boundary_path)
    boundary = boundary.to_crs(raster_crs)

    with rasterio.open(dem_path) as src:
        dem, _ = mask(src, boundary.geometry, crop=True)
        dem = dem[0].astype("float32")

    dem = np.where(dem <= 0, np.nan, dem)

    # Remove NaNs
    valid = dem[~np.isnan(dem)]

    # 30th percentile elevation
    threshold = np.percentile(valid, 30)

    # Fraction below this threshold
    low_fraction = np.sum(valid <= threshold) / len(valid)

    # Flood sensitivity scaling
    flood_index = float(low_fraction)

    return flood_index
