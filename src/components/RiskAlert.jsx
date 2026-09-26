import React from 'react';
import { getRiskColor } from '../utils/risk';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, Siren, BellRing } from 'lucide-react';

export default function RiskAlert({ riskLevel = 'LOW' }) {
  const normLevel = (riskLevel || 'LOW').toUpperCase();
  const colors = getRiskColor(normLevel);

  let message = 'Baseline conditions observed across Joshimath study buffer. Nominal hydrological risk.';
  let protocol = 'Standard environmental observation active. GEE satellite passes monitored on nominal schedule.';
  
  if (normLevel === 'MODERATE') {
    message = 'Elevated soil saturation and slope shear detected. Pre-monsoon drainage tracking advised.';
    protocol = 'Advisory: Issue internal alert to Chamoli district disaster management teams. Monitor GPM rainfall rate.';
  } else if (normLevel === 'HIGH') {
    message = 'Critical flash flood and landslide susceptibility threshold reached. Terrain stability compromised.';
    protocol = 'Action Required: Activate Tier-2 emergency protocols. Restrict vulnerable slope routes near Marwari & Helang.';
  } else if (normLevel === 'VERY HIGH') {
    message = 'Severe hazard parameters across multiple sensors (GPM + SMAP + SAR). Immediate landslide danger.';
    protocol = 'Emergency Action: Notify SDRF / NDRF battalions. Initiate pre-emptive evacuation in identified hazard red zones.';
  } else if (normLevel === 'EXTREME') {
    message = 'Catastrophic event imminent. Extreme saturation combined with heavy precipitation surge.';
    protocol = 'Life-Safety Alarm: Immediate emergency response. Evacuate downstream river confluences.';
  }

  const Icon = normLevel === 'LOW' ? CheckCircle2 : normLevel === 'MODERATE' ? Info : Siren;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 mb-8 border transition-all duration-500 shadow-2xl backdrop-blur-xl ${colors.alertBg}`}>
      {/* Animated warning stripe top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`}></div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        
        {/* Glowing Icon Badge */}
        <div className="p-3 rounded-xl bg-white/80 dark:bg-black/40 border border-slate-200 dark:border-white/10 shadow-sm flex-shrink-0 flex items-center justify-center">
          <Icon className="w-6 h-6 animate-pulse" style={{ color: colors.iconColor }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <span className="font-mono text-xs font-black tracking-widest uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                TACTICAL SITUATION BRIEFING
              </span>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${colors.badgeBg} ${colors.badgeText} ${colors.border}`}>
                ● {normLevel} THREAT
              </span>
            </div>

            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
              DISASTER PROTOCOL CODE: <strong className="text-slate-900 dark:text-white">SIH-CHAMOLI-01</strong>
            </span>
          </div>

          <p className="text-sm font-semibold text-slate-900 dark:text-white mt-2 leading-relaxed">
            {message}
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-300 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 dark:text-slate-300 gap-2">
            <div className="flex items-center space-x-2 font-mono text-[11px]">
              <span className="text-cyan-700 dark:text-cyan-400 font-bold">PROTOCOL:</span>
              <span className="text-slate-700 dark:text-slate-200">{protocol}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

