import React from 'react';
import { getRiskColor } from '../utils/risk';
import { FileText, Printer, CheckCircle, Download, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PredictionSummary({ risk = {} }) {
  const floodLevel = risk.flood_risk_level || 'MODERATE';
  const landslideLevel = risk.landslide_risk_level || 'MODERATE';
  const overallLevel = risk.overall_risk_level || 'MODERATE';

  const overallColors = getRiskColor(overallLevel);
  const floodColors = getRiskColor(floodLevel);
  const landslideColors = getRiskColor(landslideLevel);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-white/10 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>EXECUTIVE DISASTER INTELLIGENCE BRIEFING</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Summary risk synthesis generated for Chamoli District Emergency Administration
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-400 text-xs font-mono transition-all self-start sm:self-auto shadow-sm"
        >
          <Printer className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>PRINT / EXPORT SITREP</span>
        </button>
      </div>

      {/* Synthesis Callout */}
      <div className="p-4 rounded-xl bg-cyan-50/70 dark:bg-slate-900/80 border border-cyan-200 dark:border-cyan-500/20 mb-6 text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed flex items-start space-x-3 shadow-sm">
        <div className="mt-0.5 p-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex-shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          Real-time computational assessment synthesizes an overall{' '}
          <strong className={`font-mono font-bold px-2 py-0.5 rounded border uppercase ${overallColors.badgeBg} ${overallColors.badgeText} ${overallColors.border}`}>
            {overallLevel} RISK
          </strong>{' '}
          status for the Joshimath 10 km study area. Saturated terrain gradients and forecast precipitation require heightened radar monitoring along river catchment tributaries.
        </div>
      </div>

      {/* Hazard Trio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Flood Hazard Index</div>
            <div className="text-lg font-mono font-black text-slate-900 dark:text-white mt-1">{floodLevel}</div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-full border ${floodColors.badgeBg} ${floodColors.badgeText} ${floodColors.border}`}>
            {floodLevel}
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Landslide Hazard Index</div>
            <div className="text-lg font-mono font-black text-slate-900 dark:text-white mt-1">{landslideLevel}</div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-full border ${landslideColors.badgeBg} ${landslideColors.badgeText} ${landslideColors.border}`}>
            {landslideLevel}
          </span>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Composite Overall Threat</div>
            <div className="text-lg font-mono font-black text-slate-900 dark:text-white mt-1">{overallLevel}</div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-full border ${overallColors.badgeBg} ${overallColors.badgeText} ${overallColors.border}`}>
            {overallLevel}
          </span>
        </div>

      </div>

    </div>
  );
}

