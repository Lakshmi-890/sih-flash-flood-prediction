import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Compass, Globe } from 'lucide-react';
import { getRiskColor } from '../utils/risk';
import { useTheme } from '../context/ThemeContext';

// Fix Leaflet default icon URL issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom glowing radar pin icon
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-radar-pin',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;">
        <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background-color: ${color}; opacity: 0.4; animation: radar-ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
        <div style="position: relative; width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const MAP_THEMES = [
  { id: 'light', label: 'Terrain Topo', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', attribution: '&copy; Esri Topo' },
  { id: 'satellite', label: 'Satellite Hybrid', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: '&copy; Esri World Imagery' },
  { id: 'osm', label: 'OpenStreetMap', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap' },
  { id: 'dark', label: 'Dark Matter', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; CARTO' }
];

export default function MapSection({ mapData = {}, overallRiskLevel = 'MODERATE', lastUpdated }) {
  const { isDark } = useTheme();
  const [mapTheme, setMapTheme] = useState(() => (isDark ? 'dark' : 'light'));

  // Sync map theme default when user switches global theme
  useEffect(() => {
    setMapTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  const center = [30.556, 79.566]; // Joshimath
  const bufferRadius = 10000; // 10 km

  const riskPoints = mapData.spatial_risk_points || [
    { name: 'Joshimath Town Center', lat: 30.556, lng: 79.566, risk_level: overallRiskLevel, elevation: 1875, desc: 'Central Urban Ridge' },
    { name: 'Marwari (Alaknanda Confluence)', lat: 30.565, lng: 79.560, risk_level: 'HIGH', elevation: 1420, desc: 'Active River Erosion Zone' },
    { name: 'Helang Slope Zone', lat: 30.530, lng: 79.520, risk_level: 'MODERATE', elevation: 1550, desc: 'High Shear Strain Grade' },
    { name: 'Auli Ridge Slope', lat: 30.535, lng: 79.575, risk_level: 'LOW', elevation: 2800, desc: 'Alpine Bedrock Formation' },
    { name: 'Tapovan River Bank', lat: 30.495, lng: 79.630, risk_level: 'HIGH', elevation: 1900, desc: 'Dhauliganga Surge Basin' }
  ];

  const activeMapTile = MAP_THEMES.find(t => t.id === mapTheme) || MAP_THEMES[0];

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/10 shadow-2xl transition-colors duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-4 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>GEOSPATIAL HAZARD MAP & SATELLITE OVERLAYS</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-sans">
              Joshimath, Chamoli, Uttarakhand • 30.556° N, 79.566° E • 10 km Buffer AOI
            </p>
          </div>
        </div>

        {/* Map Tile Mode Selector with Bright Active Outlines */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto text-xs font-mono shadow-sm">
          {MAP_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setMapTheme(theme.id)}
              className={`px-3 py-1.5 rounded-lg transition-all text-[11px] font-mono ${
                mapTheme === theme.id
                  ? 'active-tab-outline-cyan scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
              }`}
            >
              {theme.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map Box */}
      <div className="relative h-96 w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl z-10">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            key={activeMapTile.id}
            attribution={activeMapTile.attribution}
            url={activeMapTile.url}
          />

          {/* 10 km Study Area Buffer Circle */}
          <Circle
            center={center}
            radius={bufferRadius}
            pathOptions={{
              color: isDark ? '#00f0ff' : '#0284c7',
              fillColor: isDark ? '#00f0ff' : '#0284c7',
              fillOpacity: 0.12,
              dashArray: '6, 6',
              weight: 2
            }}
          />

          {/* Concentric Radar Ring */}
          <Circle
            center={center}
            radius={5000}
            pathOptions={{
              color: isDark ? '#0284c7' : '#0369a1',
              fillColor: 'transparent',
              dashArray: '3, 6',
              weight: 1.5
            }}
          />

          {/* Spatial Risk Points */}
          {riskPoints.map((pt, i) => {
            const ptColor = getRiskColor(pt.risk_level).stroke;
            return (
              <Marker
                key={i}
                position={[pt.lat, pt.lng]}
                icon={createCustomIcon(ptColor)}
              >
                <Popup>
                  <div className="p-1 font-mono text-xs">
                    <div className="font-bold text-sm text-cyan-600 dark:text-cyan-400 border-b border-slate-300 dark:border-slate-700 pb-1">{pt.name}</div>
                    <div className="text-slate-700 dark:text-slate-300 mt-1.5">
                      Terrain Context: <span className="font-semibold text-slate-900 dark:text-white">{pt.desc}</span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 mt-0.5">
                      Elevation: <strong className="text-amber-600 dark:text-amber-300">{pt.elevation} m</strong>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 mt-0.5">
                      Risk Classification: <strong style={{ color: ptColor }}>{pt.risk_level}</strong>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1.5 font-mono">
                      GPS: {pt.lat.toFixed(4)}°N, {pt.lng.toFixed(4)}°E
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating Cyber Legend Overlay */}
        <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 rounded-xl p-3 shadow-2xl z-[500] max-w-xs text-xs font-mono">
          <div className="font-bold text-slate-900 dark:text-white mb-2 border-b border-slate-200 dark:border-white/10 pb-1 flex items-center justify-between text-[11px]">
            <span>THREAT RADAR LEGEND</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping"></span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>
              <span>Moderate</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"></span>
              <span>High Risk</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
              <span>Very High</span>
            </div>
          </div>
        </div>

        {/* Floating Center Badge */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 z-[500] text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center space-x-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
          <span>AOI: 10 KM BUFFER • JOSHIMATH</span>
        </div>
      </div>

      {/* Timestamp & Status Footer */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 font-mono">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Coordinates: <strong>30.556° N, 79.566° E</strong> (Chamoli Dist., UK)</span>
        </div>
        {lastUpdated && (
          <div className="text-slate-500 dark:text-slate-400">
            Last Sensor Sync: <strong className="text-cyan-600 dark:text-cyan-300">{lastUpdated}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
