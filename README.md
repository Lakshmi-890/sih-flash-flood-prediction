# Flash Flood & Landslide Prediction System for Hilly Regions

**Study Area:** Joshimath, Chamoli, Uttarakhand, India  
**Coordinates:** Latitude `30.556`, Longitude `79.566`  
**Study Area Buffer:** 10 km  
**Target Event:** Smart India Hackathon (SIH) Prototype  

---

## Architecture Overview

```
React Frontend (Vite + Tailwind CSS + Recharts + Leaflet)
                         ↓ HTTP REST API
 Python FastAPI Backend Server (http://localhost:8000)
    ├── Google Earth Engine API (GPM, SMAP L4, Sentinel-1, SRTM DEM, Slope)
    ├── Machine Learning Models Engine:
    │   ├── Rainfall LSTM (models/Rainfall/Rainfall_Best_Model.pt)
    │   ├── Soil Moisture GRU (models/Soil_Moisture/soil_moisture_gru.keras)
    │   ├── Historical Landslide GRU (models/Historical_Landslide/landslide_best_model.pt)
    │   └── Historical Flood Classifier (models/Historical_Flood/historical_flood_best_model.pkl)
    └── Risk Calculation & Normalization Engine (Exact Python weights)
```

---

## Key Features

1. **Multi-Source Satellite Integration**: Directly interfaces with Google Earth Engine for NASA GPM precipitation, NASA SMAP L4 soil moisture, ESA Sentinel-1 SAR polarimetric imagery (VV & VH), and USGS SRTM DEM elevation/slope.
2. **Preserved ML Pipelines**: Preserves all existing PyTorch checkpoints, Keras models, and Scikit-learn Random Forest classifiers without retraining or fake predictions.
3. **Multi-Stage Real-Time Pipeline**: Visual progress tracker showing backend stages (`Retrieving GEE data` -> `Rainfall LSTM` -> `Soil Moisture GRU` -> `Landslide GRU` -> `Risk Calculation`).
4. **Risk Factor Analysis**: 6 normalized risk factor indicators (Rainfall, Soil Moisture, Slope, Sentinel VV, Sentinel VH, Historical Landslide Probability).
5. **Trend & Forecasting Dashboard**: Next 24-hour recursive rainfall forecasting line graph, multi-day soil moisture trend graph, and 24-hour computed risk trend graph.
6. **Geospatial Map View**: Leaflet interactive map centered on Joshimath (30.556, 79.566) with a 10 km study area buffer circle, spatial risk points, and layer selectors.
7. **SIH Model Transparency & Metrics**: Expandable sections detailing exact normalization formulas, risk weight percentages, and evaluation metrics (RMSE, MAE, R², Accuracy, AUC-ROC).

---

## API Endpoints

- `GET /api/health` — System status & study area metadata.
- `GET /api/live-prediction` — Full pipeline trigger: GEE query + ML model inference + normalized risk score calculation.
- `GET /api/forecast/rainfall` — Historical 24h rainfall + 24-step recursive forecast.
- `GET /api/forecast/soil-moisture` — Historical daily soil moisture + 7-day forecast.
- `GET /api/forecast/risk` — 24-hour future risk timeline.
- `GET /api/map/layers` — Spatial coordinates, study area buffer, and layer toggles.
- `GET /api/models/metadata` — Architecture details & evaluation metrics.

---

## Setup & Running Instructions

### 1. Prerequisites
- Python 3.9+ with PyTorch, TensorFlow/Keras, Scikit-learn, FastAPI, Uvicorn, Pandas, NumPy, Joblib, and EarthEngine-API.
- Node.js 18+ & npm.

### 2. Python Backend Setup

```bash
# Install backend dependencies
pip install fastapi uvicorn torch tensorflow scikit-learn joblib pandas numpy earthengine-api

# Start the Python FastAPI backend server
python -m uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload
```

The backend server will run at `http://localhost:8000` (API docs available at `http://localhost:8000/docs`).

### 3. Frontend Setup

```bash
# Install node packages
npm install

# Start Vite dev server
npm run dev
```

The frontend dashboard will run at `http://localhost:3000`.

---

## Risk Calculation Formulas

### Normalization Routines
- `Rainfall Risk = clip(predicted_rainfall / 50.0, 0, 1)`
- `Soil Moisture Risk = clip(predicted_soil_moisture / 0.5, 0, 1)`
- `Slope Risk = clip(slope / 60.0, 0, 1)`
- `Sentinel-1 VV Risk = clip((vv + 30.0) / 30.0, 0, 1)`
- `Sentinel-1 VH Risk = clip((vh + 30.0) / 30.0, 0, 1)`

### Risk Formulas
- **Flood Risk:** `0.45 * Rainfall + 0.25 * Soil Moisture + 0.15 * Slope + 0.15 * Historical Landslide`
- **Landslide Risk:** `0.30 * Soil Moisture + 0.20 * Rainfall + 0.20 * Slope + 0.10 * VV + 0.10 * VH + 0.10 * Historical Landslide`
- **Overall Risk:** `0.60 * Flood Risk + 0.40 * Landslide Risk`

### Risk Levels
- `0.00 – <0.20`: LOW
- `0.20 – <0.40`: MODERATE
- `0.40 – <0.60`: HIGH
- `0.60 – <0.80`: VERY HIGH
- `0.80 – 1.00`: EXTREME
