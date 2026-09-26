import os
from pathlib import Path

# Base project directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Target Study Area Configuration: Joshimath, Chamoli, Uttarakhand
JOSHIMATH_LAT = 30.556
JOSHIMATH_LON = 79.566
BUFFER_METERS = 10000  # 10 km buffer

# Model File Paths
RAINFALL_MODEL_PATH = BASE_DIR / "models" / "Rainfall" / "Rainfall_Best_Model.pt"
RAINFALL_SCALER_PATH = BASE_DIR / "models" / "Rainfall" / "Rainfall_scaler.pkl"

SOIL_MODEL_KERAS_PATH = BASE_DIR / "models" / "Soil_Moisture" / "soil_moisture_gru.keras"
SOIL_SCALER_PATH = BASE_DIR / "models" / "Soil_Moisture" / "soil_moisture_scaler.pkl"
SOIL_MODEL_PT_PATH = BASE_DIR / "models" / "Soil moisture" / "best_model_gru.pt"

LANDSLIDE_MODEL_PATH = BASE_DIR / "models" / "Historical_Landslide" / "landslide_best_model.pt"
FLOOD_MODEL_PATH = BASE_DIR / "models" / "Historical_Flood" / "historical_flood_best_model.pkl"

SLOPE_MODEL_PATH = BASE_DIR / "models" / "Slope" / "Slope_best_model.pkl"
DEM_MODEL_PATH = BASE_DIR / "models" / "DEM" / "DEM_best_model.pkl"

# Data File Paths
LIVE_CSV_PATH = BASE_DIR / "data" / "live_daily.csv"
SOIL_MONTHLY_DIR = BASE_DIR / "data" / "soil_moisture_monthly"
HISTORICAL_LANDSLIDE_ZIP = BASE_DIR / "data" / "historical_landslide_monthly.zip"
HISTORICAL_LANDSLIDE_DIR = BASE_DIR / "data" / "historical_landslide_monthly"

# Risk Normalization Factors & Boundaries
RAINFALL_MAX_NORMALIZATION_MM = 50.0
SOIL_MOISTURE_MAX_NORMALIZATION = 0.5
SLOPE_MAX_NORMALIZATION_DEG = 60.0
SENTINEL_VV_MIN_DB = -30.0
SENTINEL_VV_MAX_DB = 0.0
SENTINEL_VH_MIN_DB = -30.0
SENTINEL_VH_MAX_DB = 0.0

# Risk Thresholds
RISK_LEVEL_LOW_MAX = 0.20
RISK_LEVEL_MODERATE_MAX = 0.40
RISK_LEVEL_HIGH_MAX = 0.60
RISK_LEVEL_VERY_HIGH_MAX = 0.80

# Default Fallback Values (Verified recent GEE observation values from Joshimath pipeline)
FALLBACK_ENVIRONMENTAL = {
    "rainfall": 0.5637,
    "soil_moisture": 0.3243,
    "sentinel1_vv": -12.2663,
    "sentinel1_vh": -19.0775,
    "slope": 35.3142,
    "elevation": 2731.5672,
    "gpm_count": 284,
    "smap_count": 32,
    "sentinel1_count": 2
}
