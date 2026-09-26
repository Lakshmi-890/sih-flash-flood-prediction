import React from 'react';
import { CloudRain, Droplets, Radar, Mountain, Compass, Radio, Satellite } from 'lucide-react';
import { formatDecimal } from '../utils/formatting';

export default function EnvironmentalCard({ environmental = {} }) {
  const items = [
    { label: 'GPM Rainfall', value: formatDecimal(environmental.rainfall, 4), unit: 'mm/hr', icon: CloudRain, sub: 'NASA/GPM_L3/IMERG_V07', color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { label: 'SMAP Soil Moisture', value: formatDecimal(environmental.soil_moisture, 4), unit: 'm³/m³', icon: Droplets, sub: 'NASA/SMAP L4 Surface', color: 'text-emerald-400', border: 'border-emerald-500/30' },
    { label: 'Sentinel-1 VV', value: formatDecimal(environmental.sentinel1_vv, 4), unit: 'dB', icon: Radar, sub: 'COPERNICUS/S1_GRD', color: 'text-blue-400', border: 'border-blue-500/30' },
    { label: 'Sentinel-1 VH', value: formatDecimal(environmental.sentinel1_vh, 4), unit: 'dB', icon: Radio, sub: 'COPERNICUS/S1_GRD', color: 'text-violet-400', border: 'border-violet-500/30' },
    { label: 'Terrain Slope', value: formatDecimal(environmental.slope, 4), unit: 'deg (°)', icon: Compass, sub: 'SRTM Gradient Derivation', color: 'text-amber-400', border: 'border-amber-500/30' },
    { label: 'Digital Elevation', value: formatDecimal(environmental.elevation, 2), unit: 'meters', icon: Mountain, sub: 'USGS/SRTMGL1_003 30m', color: 'text-rose-400', border: 'border-rose-500/30' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/10 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-6 gap-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Satellite className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>LIVE SATELLITE ENVIRONMENTAL OBSERVATIONS</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-sans">
              Real-time multi-spectral sensor feeds queried from Google Earth Engine (Joshimath 10 km Buffer)
            </p>
          </div>
        </div>

        <span className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono font-semibold px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30 self-start sm:self-auto">
          GEE FEED VERIFIED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-white/30 transition-all duration-300 hover:-translate-y-1 shadow-sm group ${item.border}`}
            >
              <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-slate-700 dark:text-slate-300 truncate">{item.label}</span>
              </div>
              
              <div className="flex items-baseline space-x-1.5 mt-1">
                <span className="font-mono font-black text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight">
                  {item.value}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {item.unit}
                </span>
              </div>

              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-2 truncate group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                {item.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

