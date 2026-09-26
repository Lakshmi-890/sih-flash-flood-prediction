import numpy as np

def normalize_rainfall(val):
    """
    Normalizes rainfall (mm).
    0 mm -> 0.0 risk
    50+ mm -> 1.0 risk
    """
    return float(np.clip(val / 50.0, 0.0, 1.0))


def normalize_soil_moisture(val):
    """
    Normalizes SMAP surface soil moisture.
    0.0 -> 0.0 risk
    0.5+ -> 1.0 risk
    """
    return float(np.clip(val / 0.5, 0.0, 1.0))


def normalize_slope(val):
    """
    Normalizes terrain slope (degrees).
    0 deg -> 0.0 risk
    60+ deg -> 1.0 risk
    """
    return float(np.clip(val / 60.0, 0.0, 1.0))


def normalize_sentinel_vv(val):
    """
    Normalizes Sentinel-1 VV backscatter (dB).
    -30 dB -> 0.0
    0 dB -> 1.0
    """
    return float(np.clip((val + 30.0) / 30.0, 0.0, 1.0))


def normalize_sentinel_vh(val):
    """
    Normalizes Sentinel-1 VH backscatter (dB).
    -30 dB -> 0.0
    0 dB -> 1.0
    """
    return float(np.clip((val + 30.0) / 30.0, 0.0, 1.0))


def get_risk_level(score):
    """
    Maps normalized risk score (0-1) to risk category.
    """
    if score < 0.20:
        return "LOW"
    elif score < 0.40:
        return "MODERATE"
    elif score < 0.60:
        return "HIGH"
    elif score < 0.80:
        return "VERY HIGH"
    else:
        return "EXTREME"


def compute_comprehensive_risk(
    predicted_rainfall,
    predicted_soil_moisture,
    landslide_probability,
    sentinel1_vv,
    sentinel1_vh,
    slope
):
    """
    Calculates individual risk factor normalized scores, flood risk, landslide risk, and overall risk.
    """
    rf_risk = normalize_rainfall(predicted_rainfall)
    sm_risk = normalize_soil_moisture(predicted_soil_moisture)
    slp_risk = normalize_slope(slope)
    vv_risk = normalize_sentinel_vv(sentinel1_vv)
    vh_risk = normalize_sentinel_vh(sentinel1_vh)
    ls_risk = float(np.clip(landslide_probability, 0.0, 1.0))

    # Flood Risk = 45% Rainfall + 25% Soil Moisture + 15% Slope + 15% Historical Landslide
    flood_risk = float(np.clip(
        0.45 * rf_risk +
        0.25 * sm_risk +
        0.15 * slp_risk +
        0.15 * ls_risk,
        0.0, 1.0
    ))

    # Landslide Risk = 30% Soil Moisture + 20% Rainfall + 20% Slope + 10% Sentinel VV + 10% Sentinel VH + 10% Historical Landslide
    landslide_risk = float(np.clip(
        0.30 * sm_risk +
        0.20 * rf_risk +
        0.20 * slp_risk +
        0.10 * vv_risk +
        0.10 * vh_risk +
        0.10 * ls_risk,
        0.0, 1.0
    ))

    # Overall Risk = 60% Flood Risk + 40% Landslide Risk
    overall_risk = float(np.clip(
        0.60 * flood_risk +
        0.40 * landslide_risk,
        0.0, 1.0
    ))

    return {
        "risk_factors": {
            "rainfall_risk": round(rf_risk, 4),
            "soil_moisture_risk": round(sm_risk, 4),
            "slope_risk": round(slp_risk, 4),
            "sentinel1_vv_risk": round(vv_risk, 4),
            "sentinel1_vh_risk": round(vh_risk, 4),
            "historical_landslide_risk": round(ls_risk, 4)
        },
        "risk": {
            "flood_risk": round(flood_risk, 4),
            "flood_risk_level": get_risk_level(flood_risk),
            "landslide_risk": round(landslide_risk, 4),
            "landslide_risk_level": get_risk_level(landslide_risk),
            "overall_risk": round(overall_risk, 4),
            "overall_risk_level": get_risk_level(overall_risk)
        }
    }
