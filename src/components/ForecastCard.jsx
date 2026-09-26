import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart
} from 'recharts';
import { TrendingUp, CloudRain, Droplets, ShieldAlert, Info } from 'lucide-react';
import { formatDecimal } from '../utils/formatting';
import { useTheme } from '../context/ThemeContext';

export default function ForecastCard({
  rainfallData = { historical: [], forecast: [] },
  soilData = { historical: [], forecast: [] },
  riskData = { risk_forecast: [] }
}) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('rainfall');

  // Prepare combined rainfall dataset for chart
  const combinedRainfall = [
    ...(rainfallData.historical || []).map((d) => ({
      time: d.timestamp,
      Historical: d.rainfall,
      Forecast: null
    })),
    ...(rainfallData.forecast || []).map((d) => ({
      time: d.timestamp,
      Historical: null,
      Forecast: d.rainfall
    }))
  ];

  // Prepare combined soil moisture dataset
  const combinedSoil = [
    ...(soilData.historical || []).map((d) => ({
      date: d.date,
      Historical: d.soil_moisture,
      Forecast: null
    })),
    ...(soilData.forecast || []).map((d) => ({
      date: d.date,
      Historical: null,
      Forecast: d.soil_moisture
    }))
  ];

  const riskTimeline = riskData.risk_forecast || [];

  const tooltipStyle = isDark
    ? {
        backgroundColor: 'rgba(8, 12, 20, 0.95)',
        borderColor: 'rgba(0, 240, 255, 0.4)',
        color: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.8)'
      }
    : {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderColor: 'rgba(2, 132, 199, 0.4)',
        color: '#0f172a',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
      };

  const gridStroke = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const axisColor = isDark ? '#64748b' : '#475569';

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-white/10 shadow-2xl transition-colors duration-300">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>TEMPORAL TREND & FORECAST ANALYTICS</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
              Sequential 24-step LSTM precipitation forecasting & 7-day GRU soil moisture saturation
            </p>
          </div>
        </div>

        {/* Tab Buttons with Bright Outlines */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto text-xs font-mono gap-1.5 shadow-sm">
          <button
            id="tab-forecast-rainfall"
            onClick={() => setActiveTab('rainfall')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all duration-200 ${
              activeTab === 'rainfall'
                ? 'active-tab-outline-cyan scale-105'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Rainfall (24h)</span>
          </button>

          <button
            id="tab-forecast-soil"
            onClick={() => setActiveTab('soil')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all duration-200 ${
              activeTab === 'soil'
                ? 'active-tab-outline-emerald scale-105'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Soil Moisture</span>
          </button>

          <button
            id="tab-forecast-risk"
            onClick={() => setActiveTab('risk')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all duration-200 ${
              activeTab === 'risk'
                ? 'active-tab-outline-rose scale-105'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Risk Trend</span>
          </button>
        </div>
      </div>

      {/* Forecast Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <div className="bg-sky-50/70 dark:bg-slate-900/60 border border-sky-200 dark:border-cyan-500/20 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            Peak 24h Rainfall
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
            {formatDecimal(rainfallData.max_rainfall, 4)} <span className="text-xs text-slate-500 dark:text-slate-400">mm</span>
          </div>
        </div>

        <div className="bg-sky-50/70 dark:bg-slate-900/60 border border-sky-200 dark:border-cyan-500/20 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            24h Cum. Rainfall
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
            {formatDecimal(rainfallData.total_24h_rainfall, 2)} <span className="text-xs text-slate-500 dark:text-slate-400">mm</span>
          </div>
        </div>

        <div className="bg-emerald-50/70 dark:bg-slate-900/60 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Peak Soil Moisture
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
            {formatDecimal(soilData.max_forecasted_soil_moisture, 4)} <span className="text-xs text-slate-500 dark:text-slate-400">m³/m³</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Forecast Horizon
          </div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
            24h / 7 Days
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 col-span-2 lg:col-span-1 shadow-sm">
          <div className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Active Checkpoints
          </div>
          <div className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-300 mt-1 truncate">
            LSTM & GRU (Dual-Net)
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-72 sm:h-80 w-full pt-2">
        {activeTab === 'rainfall' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={combinedRainfall} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? '#00f0ff' : '#0284c7'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isDark ? '#00f0ff' : '#0284c7'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="time" stroke={axisColor} fontSize={11} fontStyle="italic" />
              <YAxis stroke={axisColor} fontSize={11} unit=" mm" />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={{ color: isDark ? '#00f0ff' : '#0284c7', fontFamily: 'monospace' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontFamily: 'monospace' }} />
              <Area type="monotone" dataKey="Historical" fill="url(#rainGrad)" stroke={isDark ? '#00f0ff' : '#0284c7'} strokeWidth={2.5} dot={{ r: 3, fill: isDark ? '#00f0ff' : '#0284c7' }} connectNulls />
              <Line type="monotone" dataKey="Forecast" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: '#f59e0b' }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'soil' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={combinedSoil} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="date" stroke={axisColor} fontSize={11} />
              <YAxis stroke={axisColor} fontSize={11} domain={[0, 0.6]} />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={{ color: '#10b981', fontFamily: 'monospace' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontFamily: 'monospace' }} />
              <Area type="monotone" dataKey="Historical" fill="url(#soilGrad)" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
              <Line type="monotone" dataKey="Forecast" stroke="#10b981" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: '#10b981' }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'risk' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskTimeline} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="timestamp" stroke={axisColor} fontSize={11} />
              <YAxis stroke={axisColor} fontSize={11} domain={[0, 100]} unit="%" />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={{ fontFamily: 'monospace' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontFamily: 'monospace' }} />
              <Line type="monotone" dataKey="flood_risk" name="Flood Risk (%)" stroke="#38bdf8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="landslide_risk" name="Landslide Risk (%)" stroke="#fb923c" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="overall_risk" name="Composite Hazard Index (%)" stroke="#f43f5e" strokeWidth={3} dot={{ r: 3, fill: '#f43f5e' }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-4 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-white/5 font-mono">
        <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
        <span>
          Solid curves denote satellite observations; dashed curves denote recursive ML forecasts with physics-based bounding.
        </span>
      </div>
    </div>
  );
}
