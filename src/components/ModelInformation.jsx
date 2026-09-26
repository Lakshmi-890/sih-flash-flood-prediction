import React from 'react';
import { Cpu, Database, Server, Satellite, Network, ArrowUpRight } from 'lucide-react';

export default function ModelInformation() {
  const models = [
    { target: 'Precipitation Forecasting', model: 'LSTM Network', artifact: 'Rainfall_Best_Model.pt', params: '2 Layers, 64 Hidden, Dropout 0.2', seq: '24-Hour Horizon' },
    { target: 'Soil Moisture Dynamics', model: 'GRU Recurrent Net', artifact: 'soil_moisture_gru.keras / .pt', params: '2 Layers, 64 Hidden Units', seq: '30-Day Seq Length' },
    { target: 'Historical Landslide Risk', model: 'GRU Classifier', artifact: 'landslide_best_model.pt', params: '2 Layers, 32 Hidden, Sigmoid', seq: '12-Month Sequence' },
    { target: 'Inundation Severity', model: 'Random Forest', artifact: 'historical_flood_best_model.pkl', params: 'Ensemble 100 Trees, Depth 8', seq: 'Multivariate Vector' },
    { target: 'Slope Terrain Gradient', model: 'ARIMA Model', artifact: 'Slope_best_model.pkl', params: 'Seasonal ARIMA(1,1,1)', seq: 'Topographic Spatial' },
    { target: 'Elevation Profile', model: 'ARIMA Model', artifact: 'DEM_best_model.pkl', params: 'Spatial Autoregressive DEM', seq: '30m SRTM Grid' }
  ];

  const sources = [
    { name: 'Google Earth Engine API', desc: 'Enterprise geospatial processing node', agency: 'Google Cloud Platform', resolution: 'Multi-scale cloud reduction' },
    { name: 'NASA GPM (IMERG V07)', desc: 'Multi-satellite precipitation calibration', agency: 'NASA / JAXA', resolution: '0.1° (~10km), Half-hourly' },
    { name: 'NASA SMAP L4 (SPL4SMGP)', desc: 'Global surface and root-zone soil moisture', agency: 'NASA JPL', resolution: '9km EASE-Grid 2.0, 3-hourly' },
    { name: 'ESA Copernicus Sentinel-1', desc: 'C-Band Synthetic Aperture Radar (VV+VH)', agency: 'European Space Agency', resolution: '10m Interferometric Wide' },
    { name: 'USGS SRTMGL1 30m', desc: 'Shuttle Radar Topography Mission DEM', agency: 'USGS / NASA', resolution: '1 arc-second (~30m) global' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/10 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-6 gap-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>SYSTEM ARCHITECTURE & SATELLITE SENSORS</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-sans">
              SIH Multimodal Intelligence Specifications • Trained Artifact Registry
            </p>
          </div>
        </div>

        <span className="text-xs bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-mono font-semibold px-3 py-1.5 rounded-lg border border-cyan-200 dark:border-cyan-500/30 self-start sm:self-auto">
          6 TRAINED ARTIFACTS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ML Models */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3">
            <Cpu className="w-4 h-4" />
            <span>TRAINED NEURAL NETWORK CHECKPOINTS</span>
          </div>

          <div className="space-y-3">
            {models.map((m, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono hover:border-cyan-400 transition-colors shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white font-sans text-sm">{m.target}</span>
                  <span className="font-mono text-[11px] font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-500/30">
                    {m.model}
                  </span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
                  Artifact: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{m.artifact}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
                  <span>{m.params}</span>
                  <span className="text-slate-600 dark:text-slate-400">{m.seq}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
            <Satellite className="w-4 h-4" />
            <span>EARTH OBSERVATION CONSTELLATION</span>
          </div>

          <div className="space-y-3">
            {sources.map((s, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono hover:border-emerald-400 transition-colors shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
                    <span className="font-bold text-slate-900 dark:text-white font-sans text-sm">{s.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
                    {s.agency}
                  </span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 font-sans">
                  {s.desc}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
                  Spatial Resolution: <strong className="text-slate-700 dark:text-slate-300">{s.resolution}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

