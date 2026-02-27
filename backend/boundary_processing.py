import geopandas as gpd

# Load district-level data
gdf = gpd.read_file("data/gadm/gadm41_IND_2.shp")

print("Available districts preview:")
print(gdf["NAME_2"].head())

# Filter Ahmedabad
ahmedabad = gdf[gdf["NAME_2"] == "Ahmadabad"]

if ahmedabad.empty:
    print("Ahmedabad not found! Printing all district names:")
    print(gdf["NAME_2"].unique())
else:
    ahmedabad.to_file("data/ahmedabad_boundary.geojson", driver="GeoJSON")
    print("Ahmedabad boundary extracted successfully.")
