/**
 * Reusable risk color palette utility function across cards, badges, gauges, and alerts.
 * Supported levels: LOW, MODERATE, HIGH, VERY HIGH, EXTREME
 * Optimized for Dark Aerospace Command Center UI
 */
export function getRiskColor(level) {
  const normLevel = (level || 'LOW').toUpperCase();

  switch (normLevel) {
    case 'LOW':
      return {
        badgeBg: 'bg-emerald-100 dark:bg-emerald-500/15',
        badgeText: 'text-emerald-800 dark:text-emerald-400',
        border: 'border-emerald-300 dark:border-emerald-500/30',
        hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500/60',
        text: 'text-emerald-700 dark:text-emerald-400',
        barBg: 'bg-emerald-500',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
        stroke: '#10b981',
        cardBg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
        alertBg: 'bg-emerald-50/95 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-500/40 dark:text-emerald-200 shadow-sm',
        iconColor: '#059669',
        gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent'
      };

    case 'MODERATE':
      return {
        badgeBg: 'bg-amber-100 dark:bg-amber-500/15',
        badgeText: 'text-amber-800 dark:text-amber-400',
        border: 'border-amber-300 dark:border-amber-500/30',
        hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-500/60',
        text: 'text-amber-700 dark:text-amber-400',
        barBg: 'bg-amber-500',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
        stroke: '#f59e0b',
        cardBg: 'bg-amber-50/70 dark:bg-amber-950/20',
        alertBg: 'bg-amber-50/95 border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:border-amber-500/40 dark:text-amber-200 shadow-sm',
        iconColor: '#d97706',
        gradient: 'from-amber-500/20 via-amber-500/5 to-transparent'
      };

    case 'HIGH':
      return {
        badgeBg: 'bg-orange-100 dark:bg-orange-500/15',
        badgeText: 'text-orange-800 dark:text-orange-400',
        border: 'border-orange-300 dark:border-orange-500/30',
        hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500/60',
        text: 'text-orange-700 dark:text-orange-400',
        barBg: 'bg-orange-500',
        glow: 'shadow-[0_0_20px_rgba(249,115,22,0.25)]',
        stroke: '#f97316',
        cardBg: 'bg-orange-50/70 dark:bg-orange-950/20',
        alertBg: 'bg-orange-50/95 border-orange-300 text-orange-950 dark:bg-orange-950/40 dark:border-orange-500/40 dark:text-orange-200 shadow-sm',
        iconColor: '#ea580c',
        gradient: 'from-orange-500/20 via-orange-500/5 to-transparent'
      };

    case 'VERY HIGH':
      return {
        badgeBg: 'bg-rose-100 dark:bg-rose-500/15',
        badgeText: 'text-rose-800 dark:text-rose-400',
        border: 'border-rose-300 dark:border-rose-500/30',
        hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-500/60',
        text: 'text-rose-700 dark:text-rose-400',
        barBg: 'bg-rose-500',
        glow: 'shadow-[0_0_25px_rgba(244,63,94,0.35)]',
        stroke: '#f43f5e',
        cardBg: 'bg-rose-50/70 dark:bg-rose-950/20',
        alertBg: 'bg-rose-50/95 border-rose-300 text-rose-950 dark:bg-rose-950/40 dark:border-rose-500/40 dark:text-rose-200 shadow-sm',
        iconColor: '#e11d48',
        gradient: 'from-rose-500/20 via-rose-500/5 to-transparent'
      };

    case 'EXTREME':
      return {
        badgeBg: 'bg-red-100 dark:bg-red-600/25',
        badgeText: 'text-red-800 dark:text-red-300',
        border: 'border-red-400 dark:border-red-600/50',
        hoverBorder: 'hover:border-red-500 dark:hover:border-red-500/80',
        text: 'text-red-700 dark:text-red-400',
        barBg: 'bg-red-600',
        glow: 'shadow-[0_0_35px_rgba(220,38,38,0.5)]',
        stroke: '#dc2626',
        cardBg: 'bg-red-50/70 dark:bg-red-950/30',
        alertBg: 'bg-red-50/95 border-red-400 text-red-950 dark:bg-red-950/60 dark:border-red-500/60 dark:text-red-100 shadow-sm',
        iconColor: '#dc2626',
        gradient: 'from-red-600/30 via-red-600/10 to-transparent'
      };

    default:
      return {
        badgeBg: 'bg-slate-100 dark:bg-slate-500/15',
        badgeText: 'text-slate-700 dark:text-slate-400',
        border: 'border-slate-300 dark:border-slate-700/50',
        hoverBorder: 'hover:border-slate-400 dark:hover:border-slate-500/50',
        text: 'text-slate-700 dark:text-slate-400',
        barBg: 'bg-slate-500',
        glow: 'shadow-none',
        stroke: '#64748b',
        cardBg: 'bg-slate-50 dark:bg-slate-900/40',
        alertBg: 'bg-slate-50 border-slate-300 text-slate-900 dark:bg-slate-900/60 dark:border-slate-700 dark:text-slate-200 shadow-sm',
        iconColor: '#64748b',
        gradient: 'from-slate-700/20 to-transparent'
      };
  }
}

