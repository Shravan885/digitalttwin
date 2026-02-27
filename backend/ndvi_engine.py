import os
import rasterio
import numpy as np
import geopandas as gpd
from rasterio.mask import mask

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def calculate_ndvi():

    red_path = os.path.join(BASE_DIR, "rasters", "B04.jp2")
    nir_path = os.path.join(BASE_DIR, "rasters", "B08.jp2")
    boundary_path = os.path.join(BASE_DIR, "data", "ahmedabad_boundary.geojson")

    with rasterio.open(red_path) as red_src:
        raster_crs = red_src.crs

    boundary = gpd.read_file(boundary_path)
    boundary = boundary.to_crs(raster_crs)

    with rasterio.open(red_path) as red_src:
        red, _ = mask(red_src, boundary.geometry, crop=True)
        red = red[0].astype("float32")

    with rasterio.open(nir_path) as nir_src:
        nir, _ = mask(nir_src, boundary.geometry, crop=True)
        nir = nir[0].astype("float32")

    ndvi = (nir - red) / (nir + red + 1e-6)
    ndvi = np.where((ndvi < -1) | (ndvi > 1), np.nan, ndvi)

    return float(np.nanmean(ndvi))
