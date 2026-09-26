const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchHealthStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend API offline, using fallback health status');
    return {
      status: 'SYSTEM_READY',
      study_area: {
        location: 'Joshimath, Chamoli, Uttarakhand',
        latitude: 30.556,
        longitude: 79.566,
        buffer_km: 10.0
      }
    };
  }
}

export async function executeLivePrediction() {
  const res = await fetch(`${API_BASE_URL}/api/live-prediction`);
  if (!res.ok) {
    throw new Error(`Failed to retrieve live prediction: HTTP ${res.status}`);
  }
  return await res.json();
}

export async function fetchRainfallForecast() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/forecast/rainfall`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Rainfall forecast endpoint error:', err);
    throw err;
  }
}

export async function fetchSoilMoistureForecast() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/forecast/soil-moisture`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Soil moisture forecast endpoint error:', err);
    throw err;
  }
}

export async function fetchRiskForecast() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/forecast/risk`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Risk forecast endpoint error:', err);
    throw err;
  }
}

export async function fetchMapLayers() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/map/layers`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Map layers endpoint error:', err);
    return {
      study_area: {
        center: { lat: 30.556, lng: 79.566 },
        radius_meters: 10000
      },
      spatial_risk_points: [],
      available_layers: []
    };
  }
}

export async function fetchModelsMetadata() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/models/metadata`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Models metadata endpoint error:', err);
    return { models: [], satellites: [] };
  }
}
