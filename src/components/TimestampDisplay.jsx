import React from 'react';
import { Clock, Satellite, Server, Database } from 'lucide-react';
import { formatDateTime } from '../utils/formatting';

export default function TimestampDisplay({ meta = {}, retrievedAt }) {
  return (
    <div className="glass-panel rounded-xl p-3.5 mb-8 border border-slate-200 dark:border-white/10 shadow-md text-xs font-mono text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center space-x-2">
        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
        <span>
          PIPELINE RETRIEVAL: <strong className="text-slate-900 dark:text-white font-bold">{formatDateTime(retrievedAt)}</strong>
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Satellite className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>
          GPM PASS: <strong className="text-slate-800 dark:text-slate-200 font-bold">{meta.gpm_observation_time || 'Synchronized'}</strong>
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Server className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        <span>
          SMAP PASS: <strong className="text-slate-800 dark:text-slate-200 font-bold">{meta.smap_observation_time || 'Synchronized'}</strong>
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Database className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>
          SOURCE: <strong className="text-cyan-700 dark:text-cyan-300 font-bold">{meta.gee_source || 'Google Earth Engine'}</strong>
        </span>
      </div>
    </div>
  );
}

