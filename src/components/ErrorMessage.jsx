import React from 'react';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="glass-panel border-rose-300 dark:border-rose-500/30 bg-rose-50/90 dark:bg-rose-950/20 rounded-2xl p-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-[0_0_25px_rgba(244,63,94,0.15)] animate-fadeIn">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-rose-100 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-xl flex-shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-rose-800 dark:text-rose-300 text-base tracking-wide">
              TELEMETRY ACQUISITION FAULT
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30">
              SYS-ERR 503
            </span>
          </div>
          <p className="text-xs text-rose-900/90 dark:text-rose-200/80 mt-1 max-w-xl font-mono leading-relaxed">
            {message || 'Unable to establish connection with local telemetry service or Google Earth Engine API.'}
          </p>
          <div className="flex items-center space-x-2 mt-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Ensure backend daemon on port 8000 is active. Fallback model pipelines stand ready.</span>
          </div>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center space-x-2 self-center sm:self-auto border border-rose-400/30 hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>RETRY INFERENCE</span>
        </button>
      )}
    </div>
  );
}
