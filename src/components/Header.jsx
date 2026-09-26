import React, { useState, useEffect } from 'react';
import { MapPin, Mountain, Satellite, Clock, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const [utcTime, setUtcTime] = useState('');
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-panel border-b border-white/10 sticky top-0 z-50 shadow-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Brand & Mission Title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 via-sky-600/30 to-blue-700/20 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)] flex-shrink-0">
              <Mountain className="w-6 h-6 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>DISASTER INTEL</span>
                  <span className="text-cyan-500 dark:text-cyan-400 font-mono text-xs font-semibold px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40">
                    SIH-2026
                  </span>
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wide font-medium mt-0.5">
                Multi-Source Geospatial AI Engine • Flash Flood & Landslide Susceptibility
              </p>
            </div>
          </div>

          {/* Telemetry HUD & Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            
            {/* Real-time Satellite Constellation Badges */}
            <div className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[11px] shadow-sm">
              <Satellite className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>SATELLITES:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">GPM</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SMAP L4</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SENTINEL-1</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SRTM</span>
            </div>

            {/* Target HUD (Joshimath) */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-slate-900/90 border border-cyan-300/80 dark:border-cyan-500/20 rounded-lg text-slate-800 dark:text-slate-300 font-mono text-[11px] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>JOSHIMATH (30.556°N, 79.566°E)</span>
              <span className="text-cyan-500/70">|</span>
              <span className="text-slate-500 dark:text-slate-400">10 KM AOI</span>
            </div>

            {/* UTC Clock */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 font-mono text-[11px] shadow-sm">
              <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{utcTime || 'UTC 00:00:00'}</span>
            </div>

            {/* System Status Pill */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-500/40 rounded-lg text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-semibold tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <span>NODE ONLINE</span>
            </div>

            {/* Theme Toggle Button with Glowing Active Outline */}
            <button
              id="theme-toggle-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Click to switch to ${isDark ? 'light' : 'dark'} mode`}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-black tracking-wider transition-all duration-300 scale-100 hover:scale-105 active:scale-95 ${
                isDark
                  ? 'bg-dark-900 border-2 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400 ring-offset-2 ring-offset-dark-950 shadow-[0_0_22px_rgba(0,240,255,0.6)]'
                  : 'bg-white border-2 border-amber-400 text-amber-700 ring-2 ring-amber-400 ring-offset-2 ring-offset-white shadow-[0_0_22px_rgba(245,158,11,0.5)]'
              }`}
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                {isDark ? (
                  <Moon className="w-4 h-4 text-cyan-400 animate-fadeIn" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                )}
              </div>
              <span className="uppercase">
                {isDark ? 'DARK' : 'LIGHT'}
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
