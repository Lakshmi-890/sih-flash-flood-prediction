import React from 'react';
import { getRiskColor } from '../utils/risk';
import { formatPercentage } from '../utils/formatting';
import RiskGauge from './RiskGauge';

export default function RiskCard({ title, icon: Icon, riskValue = 0, riskLevel = 'LOW', subtitle }) {
  const colorStyle = getRiskColor(riskLevel);

  return (
    <div className={`glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl border ${colorStyle.border} ${colorStyle.hoverBorder} group`}>
      {/* Background Accent Top Glow Gradient */}
      <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-35`}
           style={{ backgroundColor: colorStyle.stroke }}
      ></div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          {/* Card Label */}
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 text-xs font-mono uppercase tracking-wider font-semibold mb-2">
            {Icon && <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
            <span>{title}</span>
          </div>

          {/* Main Percentage Display */}
          <div className="mt-1 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white tracking-tight">
              {formatPercentage(riskValue)}
            </span>
          </div>

          {/* Dynamic Risk Level Badge */}
          <div className="mt-3.5">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${colorStyle.badgeBg} ${colorStyle.badgeText} ${colorStyle.border} ${colorStyle.glow}`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${colorStyle.barBg} animate-pulse`}></span>
              {riskLevel} RISK
            </span>
          </div>
        </div>

        {/* Circular Radial Gauge */}
        <div className="flex-shrink-0 ml-3">
          <RiskGauge value={riskValue} strokeColor={colorStyle.stroke} />
        </div>
      </div>

      {subtitle && (
        <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 font-sans flex items-center justify-between">
          <span className="truncate">{subtitle}</span>
        </div>
      )}
    </div>
  );
}

