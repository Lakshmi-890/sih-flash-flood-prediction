import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator, ArrowRight, Code2, Check, Copy } from 'lucide-react';

export default function ModelTransparency() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyFormulas = () => {
    const text = `
FLOOD RISK = 0.45*Rainfall + 0.25*Soil + 0.15*Slope + 0.15*Landslide
LANDSLIDE RISK = 0.30*Soil + 0.20*Rainfall + 0.20*Slope + 0.10*VV + 0.10*VH + 0.10*Landslide
OVERALL RISK = 0.60*Flood_Risk + 0.40*Landslide_Risk
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl mb-8 border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between bg-slate-50/60 hover:bg-slate-100/80 dark:bg-transparent dark:hover:bg-slate-900/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>MATHEMATICAL NORMALIZATION & RISK FORMULAS (MODEL TRANSPARENCY)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
              Exact weighting equations and domain bounding logic implemented in Python backend
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-200 dark:border-cyan-500/30">
          <span>{isOpen ? 'COLLAPSE FORMULAS' : 'INSPECT FORMULAS'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 border-t border-slate-200 dark:border-white/10 space-y-6 text-xs text-slate-600 dark:text-slate-300">
          
          {/* Flow Pipeline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider text-xs">
                Inference & Fusion Pipeline
              </h4>
              <button
                onClick={copyFormulas}
                className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Formulas'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs text-center">
              <div className="p-3 bg-slate-100/90 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                1. GEE Satellite Query
              </div>
              <div className="p-3 bg-slate-100/90 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                2. Feature Normalization
              </div>
              <div className="p-3 bg-cyan-50 dark:bg-slate-900/90 rounded-xl border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold">
                3. Individual Risk Indices
              </div>
              <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-black shadow-sm">
                4. Composite Risk Index
              </div>
            </div>
          </div>

          {/* Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-4 bg-sky-50/50 dark:bg-slate-900/80 border border-sky-200 dark:border-sky-500/30 rounded-xl space-y-2.5 shadow-sm">
              <h5 className="font-mono font-bold text-sky-700 dark:text-sky-400 text-xs uppercase flex items-center justify-between">
                <span>Flood Risk Formula</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-mono">W_SUM</span>
              </h5>
              <div className="font-mono text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0c1322] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 leading-relaxed text-[11px] shadow-sm">
                <span className="text-cyan-600 dark:text-cyan-300 font-bold">Flood Risk</span> =<br />
                &nbsp;&nbsp;<span className="text-amber-600 dark:text-amber-300 font-semibold">0.45</span> * Rainfall Risk +<br />
                &nbsp;&nbsp;<span className="text-amber-600 dark:text-amber-300 font-semibold">0.25</span> * Soil Moisture +<br />
                &nbsp;&nbsp;<span className="text-amber-600 dark:text-amber-300 font-semibold">0.15</span> * Slope Gradient +<br />
                &nbsp;&nbsp;<span className="text-amber-600 dark:text-amber-300 font-semibold">0.15</span> * Landslide Prob
              </div>
            </div>

            <div className="p-4 bg-amber-50/50 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-500/30 rounded-xl space-y-2.5 shadow-sm">
              <h5 className="font-mono font-bold text-amber-700 dark:text-amber-400 text-xs uppercase flex items-center justify-between">
                <span>Landslide Risk Formula</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-mono">W_SUM</span>
              </h5>
              <div className="font-mono text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0c1322] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 leading-relaxed text-[11px] shadow-sm">
                <span className="text-amber-600 dark:text-amber-300 font-bold">Landslide Risk</span> =<br />
                &nbsp;&nbsp;<span className="text-cyan-600 dark:text-cyan-300 font-semibold">0.30</span> * Soil Moisture +<br />
                &nbsp;&nbsp;<span className="text-cyan-600 dark:text-cyan-300 font-semibold">0.20</span> * Rainfall Risk +<br />
                &nbsp;&nbsp;<span className="text-cyan-600 dark:text-cyan-300 font-semibold">0.20</span> * Slope Gradient +<br />
                &nbsp;&nbsp;<span className="text-cyan-600 dark:text-cyan-300 font-semibold">0.10</span> * Sentinel-1 VV +<br />
                &nbsp;&nbsp;<span className="text-cyan-600 dark:text-cyan-300 font-semibold">0.10</span> * Sentinel-1 VH +<br />
                &nbsp;&nbsp;<span className="text-cyan-600 dark:text-cyan-300 font-semibold">0.10</span> * Landslide Prob
              </div>
            </div>

            <div className="p-4 bg-rose-50/50 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-500/30 rounded-xl space-y-2.5 shadow-sm">
              <h5 className="font-mono font-bold text-rose-700 dark:text-rose-400 text-xs uppercase flex items-center justify-between">
                <span>Overall Risk Formula</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-mono">FUSION</span>
              </h5>
              <div className="font-mono text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0c1322] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 leading-relaxed text-[11px] shadow-sm">
                <span className="text-rose-600 dark:text-rose-400 font-bold">Overall Risk</span> =<br />
                &nbsp;&nbsp;<span className="text-emerald-600 dark:text-emerald-300 font-semibold">0.60</span> * Flood Risk +<br />
                &nbsp;&nbsp;<span className="text-emerald-600 dark:text-emerald-300 font-semibold">0.40</span> * Landslide Risk
              </div>
            </div>

          </div>

          {/* Normalization Scale */}
          <div className="p-4 bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm">
            <h5 className="font-mono font-bold text-slate-900 dark:text-white text-xs uppercase mb-2.5 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Python Backend Normalization Functions (backend/risk_engine.py)</span>
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-[11px]">
              <div className="bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                Rainfall: <code className="text-cyan-600 dark:text-cyan-300 font-semibold">clip(predicted_rainfall / 50.0, 0.0, 1.0)</code>
              </div>
              <div className="bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                Soil Moisture: <code className="text-emerald-600 dark:text-emerald-300 font-semibold">clip(predicted_soil_moisture / 0.5, 0.0, 1.0)</code>
              </div>
              <div className="bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                Terrain Slope: <code className="text-amber-600 dark:text-amber-300 font-semibold">clip(slope / 60.0, 0.0, 1.0)</code>
              </div>
              <div className="bg-white dark:bg-[#0c1322] text-slate-700 dark:text-slate-300 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                Sentinel SAR: <code className="text-purple-600 dark:text-purple-300 font-semibold">clip((backscatter + 30.0) / 30.0, 0.0, 1.0)</code>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

