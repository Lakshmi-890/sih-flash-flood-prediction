import React from 'react';

export default function RiskGauge({ value = 0, strokeColor = '#00f0ff', glowColor = 'rgba(0,240,255,0.4)' }) {
  // Clamp value 0 to 1
  const normValue = Math.max(0, Math.min(1, value));
  const percentage = Math.round(normValue * 100);

  // SVG Gauge Math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28">
      {/* Outer ambient glow */}
      <div
        className="absolute inset-2 rounded-full opacity-30 blur-md pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: strokeColor }}
      ></div>

      <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
        {/* Background Circle Track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#1e293b"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray="2, 4"
        />

        {/* Dynamic Glowing Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Percentage Center Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-lg sm:text-xl font-mono font-black text-white leading-none tracking-tight">
          {percentage}
          <span className="text-xs text-slate-400 font-sans font-semibold">%</span>
        </span>
        <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase mt-0.5">
          INDEX
        </span>
      </div>
    </div>
  );
}

