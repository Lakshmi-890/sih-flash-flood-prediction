import React from 'react';
import { Play, Loader2, CheckCircle2, Zap, Radio, Cpu, RefreshCw } from 'lucide-react';

export default function LivePredictionButton({ onExecute, isLoading, isCompleted }) {
  return (
    <div className="relative overflow-hidden glass-panel rounded-2xl p-6 sm:p-7 mb-8 border border-white/10 shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* Description & Intel Specs */}
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-wider uppercase font-semibold mb-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Radio className="w-3.5 h-3.5" />
            <span>REAL-TIME MULTIMODAL INFERENCE ENGINE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Trigger Multi-Source Environmental Risk Pipeline
          </h2>

          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Directly orchestrates live satellite query from <strong className="text-cyan-300 font-semibold">Google Earth Engine</strong> (NASA GPM, SMAP L4, Sentinel-1 SAR & SRTM DEM) and executes pre-trained <strong className="text-emerald-300 font-semibold">LSTM & GRU neural networks</strong> for the Joshimath 10 km study area.
          </p>

          {/* Quick telemetry tags */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 shadow-sm">
              <Cpu className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              PyTorch LSTM + Keras GRU
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 shadow-sm">
              <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />
              Zero Mock Data / Verified Pipeline
            </span>
          </div>
        </div>

        {/* Primary Mission Action Button */}
        <div className="flex-shrink-0 flex items-center justify-center sm:justify-start">
          <button
            id="btn-live-prediction"
            onClick={onExecute}
            disabled={isLoading}
            className={`relative group px-8 py-4 sm:py-4.5 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase font-mono transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl ${
              isLoading
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                : isCompleted
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white border border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] active:scale-95'
                : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:via-sky-400 hover:to-blue-500 text-slate-950 font-black border border-cyan-300/60 shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                <span className="text-white">EXECUTING PIPELINE...</span>
              </>
            ) : isCompleted ? (
              <>
                <RefreshCw className="w-5 h-5 text-emerald-100 group-hover:rotate-180 transition-transform duration-500" />
                <span>RE-RUN LIVE PREDICTION</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>EXECUTE LIVE PREDICTION</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

