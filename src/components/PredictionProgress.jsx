import React from 'react';
import { Loader2, CheckCircle2, Circle, Radio, Cpu, Database, Network, ShieldAlert, Sparkles } from 'lucide-react';

const STAGES = [
  { name: 'GEE INGESTION', desc: 'Fetching GPM, SMAP L4, Sentinel-1 & SRTM DEM observations', icon: Database },
  { name: 'RAINFALL LSTM', desc: 'Running 24-step recursive precipitation forecasting model', icon: Cpu },
  { name: 'SOIL GRU', desc: 'Predicting SMAP volumetric moisture saturation with GRU', icon: Network },
  { name: 'LANDSLIDE GRU', desc: 'Evaluating 12-month sequential landslide hazard probability', icon: Radio },
  { name: 'FLOOD CLASSIFIER', desc: 'Scoring historical inundation classifier & slope derivatives', icon: ShieldAlert },
  { name: 'RISK FUSION', desc: 'Calculating normalized weights & compound hazard index', icon: Sparkles },
  { name: 'LIVE SYNTHESIS', desc: 'Assembling spatial risk matrix & geospatial forecast layer', icon: CheckCircle2 }
];

export default function PredictionProgress({ currentStageIndex, isCompleted }) {
  const progressPercent = isCompleted ? 100 : Math.round(((currentStageIndex + 1) / (STAGES.length + 1)) * 100);

  return (
    <div className="glass-panel-glow rounded-2xl p-6 mb-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
      {/* Scanning beam effect */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-wider text-slate-900 dark:text-white uppercase font-mono flex items-center gap-2">
              <span>ACTIVE MODEL INFERENCE PIPELINE</span>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
              Executing multimodal neural networks and spatial risk normalization
            </p>
          </div>
        </div>

        {/* Live Progress Percentage */}
        <div className="flex items-center space-x-3 font-mono">
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400">PROGRESS:</span>
            <span className="ml-2 text-base font-bold text-emerald-600 dark:text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Interactive Stage Flow Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {STAGES.map((stg, idx) => {
          const Icon = stg.icon;
          const isDone = idx < currentStageIndex || isCompleted;
          const isCurrent = idx === currentStageIndex && !isCompleted;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start space-x-3 shadow-sm ${
                isCurrent
                  ? 'bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400/80 dark:border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : isDone
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/30'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 opacity-50'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isDone ? (
                  <div className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : isCurrent ? (
                  <div className="p-1 rounded-md bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-400 animate-spin">
                    <Loader2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="p-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-slate-700">
                    <Circle className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold tracking-wider ${
                    isCurrent 
                      ? 'text-cyan-800 dark:text-cyan-300' 
                      : isDone 
                      ? 'text-emerald-800 dark:text-emerald-300' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {stg.name}
                  </span>
                  <span className={`text-[10px] font-mono font-semibold ${
                    isDone ? 'text-emerald-700/80 dark:text-emerald-400/70' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
                <p className={`text-[11px] mt-1 leading-snug truncate ${
                  isDone 
                    ? 'text-slate-600 dark:text-slate-300' 
                    : isCurrent 
                    ? 'text-cyan-900 dark:text-cyan-200' 
                    : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {stg.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

