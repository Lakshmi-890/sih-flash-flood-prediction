import React from 'react';
import { Layers, ShieldAlert, Mountain, CloudRain, Droplets, Compass } from 'lucide-react';

const LAYERS = [
  { id: 'study_area', name: '10km AOI Buffer', icon: Layers },
  { id: 'flood_risk', name: 'Flood Risk Map', icon: ShieldAlert },
  { id: 'landslide_risk', name: 'Landslide Susceptibility', icon: Mountain },
  { id: 'overall_risk', name: 'Compound Hazard', icon: ShieldAlert },
  { id: 'rainfall', name: 'GPM Precipitation Grid', icon: CloudRain },
  { id: 'soil_moisture', name: 'SMAP Moisture Layer', icon: Droplets },
  { id: 'slope', name: 'Slope Gradient (Deg)', icon: Compass },
  { id: 'elevation', name: 'SRTM Elevation Model', icon: Mountain }
];

export default function LayerSelector({ selectedLayer, onSelectLayer }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 mb-4">
      {LAYERS.map((layer) => {
        const isSelected = selectedLayer === layer.id;
        const Icon = layer.icon;
        return (
          <button
            key={layer.id}
            onClick={() => onSelectLayer(layer.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center space-x-1.5 ${
              isSelected
                ? 'active-tab-outline-cyan scale-105'
                : 'bg-white dark:bg-dark-900/60 hover:bg-slate-100 dark:hover:bg-dark-850 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 shadow-sm'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{layer.name}</span>
          </button>
        );
      })}
    </div>
  );
}
