import React from 'react';
import { getRiskColor } from '../utils/risk';
import { formatDecimal } from '../utils/formatting';
import { CloudRain, Droplets, Mountain, Radar, History, SlidersHorizontal } from 'lucide-react';

const FACTOR_CONFIGS = [
  { key: 'rainfall_risk', label: 'Rainfall Risk Index', formula: 'clip(Rain / 50mm, 0, 1)', weight: '45% Flood / 20% Landslide', icon: CloudRain },
  { key: 'soil_moisture_risk', label: 'Soil Moisture Saturation', formula: 'clip(SMAP / 0.50, 0, 1)', weight: '25% Flood / 30% Landslide', icon: Droplets },
  { key: 'slope_risk', label: 'Terrain Slope Steepness', formula: 'clip(Slope / 60°, 0, 1)', weight: '15% Flood / 20% Landslide', icon: Mountain },
  { key: 'sentinel1_vv_risk', label: 'Sentinel-1 SAR (VV Pol)', formula: 'clip((VV + 30) / 30, 0, 1)', weight: '10% Landslide Index', icon: Radar },
  { key: 'sentinel1_vh_risk', label: 'Sentinel-1 SAR (VH Pol)', formula: 'clip((VH + 30) / 30, 0, 1)', weight: '10% Landslide Index', icon: Radar },
  { key: 'historical_landslide_risk', label: 'Historical Landslide Probability', formula: 'GRU Seq Classifier [12m]', weight: '15% Flood / 10% Landslide', icon: History }
];

export default function RiskFactorBars({ factors = {} }) {
  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/10 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-6 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>NORMALIZED RISK FACTOR DECOMPOSITION</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-sans">
              Mathematical normalization (0.0000 – 1.0000) synthesized across multi-sensor satellite features
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-200 dark:border-cyan-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
          <span>SIH VERIFIED WEIGHTS</span>
        </div>
      </div>

      {/* Factor Matrix */}
      <div className="space-y-6">
        {FACTOR_CONFIGS.map((factor) => {
          const val = factors[factor.key] ?? 0;
          const Icon = factor.icon;
          const percentage = Math.min(100, Math.max(0, val * 100));

          // Determine factor level for color
          let factorLevel = 'LOW';
          if (val >= 0.8) factorLevel = 'EXTREME';
          else if (val >= 0.6) factorLevel = 'VERY HIGH';
          else if (val >= 0.4) factorLevel = 'HIGH';
          else if (val >= 0.2) factorLevel = 'MODERATE';

          const colors = getRiskColor(factorLevel);

          return (
            <div key={factor.key} className="space-y-2 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                
                {/* Left: Icon, Name & Formula */}
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-sm">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm tracking-tight">{factor.label}</span>
                    <span className="hidden sm:inline-block ml-2 text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-900/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {factor.formula}
                    </span>
                  </div>
                </div>

                {/* Right: Weight, Level Badge, & Numeric Score */}
                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden md:inline-block">
                    {factor.weight}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${colors.badgeBg} ${colors.badgeText} ${colors.border}`}>
                    {factorLevel}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm w-16 text-right">
                    {formatDecimal(val, 4)}
                  </span>
                </div>
              </div>

              {/* Progress Bar Container with neon glow */}
              <div className="relative h-2.5 w-full bg-slate-100 dark:bg-slate-900/90 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 p-0.5 shadow-inner">
                {/* Threshold Markers */}
                <div className="absolute top-0 bottom-0 left-[20%] w-px bg-slate-300 dark:bg-white/10 z-10"></div>
                <div className="absolute top-0 bottom-0 left-[40%] w-px bg-slate-300 dark:bg-white/10 z-10"></div>
                <div className="absolute top-0 bottom-0 left-[60%] w-px bg-slate-300 dark:bg-white/10 z-10"></div>
                <div className="absolute top-0 bottom-0 left-[80%] w-px bg-slate-300 dark:bg-white/10 z-10"></div>

                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${colors.barBg}`}
                  style={{
                    width: `${Math.max(2, percentage)}%`,
                    boxShadow: `0 0 12px ${colors.stroke}`
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Threshold Guide Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <span className="text-slate-500 font-semibold">THRESHOLDS:</span>
          <span>0.00–0.20: <strong className="text-emerald-600 dark:text-emerald-400">LOW</strong></span>
          <span>0.20–0.40: <strong className="text-amber-600 dark:text-amber-400">MODERATE</strong></span>
          <span>0.40–0.60: <strong className="text-orange-600 dark:text-orange-400">HIGH</strong></span>
          <span>0.60–0.80: <strong className="text-rose-600 dark:text-rose-400">VERY HIGH</strong></span>
          <span>0.80+: <strong className="text-red-600 dark:text-red-400">EXTREME</strong></span>
        </div>
      </div>

    </div>
  );
}

