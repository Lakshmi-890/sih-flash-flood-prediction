import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LivePredictionButton from '../components/LivePredictionButton';
import PredictionProgress from '../components/PredictionProgress';
import RiskCard from '../components/RiskCard';
import RiskFactorBars from '../components/RiskFactorBars';
import EnvironmentalCard from '../components/EnvironmentalCard';
import MLPredictionCard from '../components/MLPredictionCard';
import ForecastCard from '../components/ForecastCard';
import MapSection from '../components/MapSection';
import PredictionSummary from '../components/PredictionSummary';
import RiskAlert from '../components/RiskAlert';
import ModelInformation from '../components/ModelInformation';
import ModelTransparency from '../components/ModelTransparency';
import ModelPerformance from '../components/ModelPerformance';
import TimestampDisplay from '../components/TimestampDisplay';
import ErrorMessage from '../components/ErrorMessage';
import EmergencySirenButton from '../components/EmergencySirenButton';
import EmergencyDispatcher from '../components/EmergencyDispatcher';
import { useTheme } from '../context/ThemeContext';

import {
  executeLivePrediction,
  fetchRainfallForecast,
  fetchSoilMoistureForecast,
  fetchRiskForecast,
  fetchMapLayers,
  fetchModelsMetadata
} from '../services/api';

import {
  Waves,
  Mountain,
  ShieldAlert,
  Satellite,
  Activity,
  Radio
} from 'lucide-react';

export default function Dashboard() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [hasPrediction, setHasPrediction] = useState(false);
  const [error, setError] = useState(null);

  // Data states
  const [predictionData, setPredictionData] = useState(null);
  const [rainfallForecast, setRainfallForecast] = useState(null);
  const [soilForecast, setSoilForecast] = useState(null);
  const [riskForecast, setRiskForecast] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [metadata, setMetadata] = useState(null);

  // Initial load of map metadata (optional)
  useEffect(() => {
    fetchMapLayers().then(setMapData).catch(() => {});
    fetchModelsMetadata().then(setMetadata).catch(() => {});
  }, []);

  // Main Live Prediction Trigger Function
  const handleGetLivePrediction = async () => {
    setIsLoading(true);
    setError(null);
    setStageIndex(0);

    try {
      // Step through pipeline stage messages smoothly for aerospace HUD feel
      const stepTime = 260;
      setStageIndex(0); // Querying GEE & Multi-Satellite Sensors...
      await new Promise(r => setTimeout(r, stepTime));
      
      setStageIndex(1); // Executing PyTorch Deep Bi-LSTM Rainfall Predictor...
      await new Promise(r => setTimeout(r, stepTime));

      setStageIndex(2); // Inferring Keras GRU Soil Moisture Sequences...
      await new Promise(r => setTimeout(r, stepTime));

      setStageIndex(3); // Classifying Historical Landslide Vulnerability...
      await new Promise(r => setTimeout(r, stepTime));

      setStageIndex(4); // Computing 4-Factor Flash Flood Hydro-Index...
      await new Promise(r => setTimeout(r, stepTime));

      setStageIndex(5); // Calculating Terrain & SAR Geomorphological Risk...
      await new Promise(r => setTimeout(r, stepTime));

      setStageIndex(6); // Synthesizing Multi-Hazard Early Warning Telemetry...

      // Fetch actual backend predictions in parallel
      const [liveRes, rainRes, soilRes, riskRes, mapRes] = await Promise.all([
        executeLivePrediction(),
        fetchRainfallForecast().catch(() => null),
        fetchSoilMoistureForecast().catch(() => null),
        fetchRiskForecast().catch(() => null),
        fetchMapLayers().catch(() => null)
      ]);

      setPredictionData(liveRes);
      if (rainRes) setRainfallForecast(rainRes);
      if (soilRes) setSoilForecast(soilRes);
      if (riskRes) setRiskForecast(riskRes);
      if (mapRes) setMapData(mapRes);

      setStageIndex(7); // Mission completed
      await new Promise(r => setTimeout(r, 350));

      setHasPrediction(true);
    } catch (err) {
      console.error('Error executing live prediction:', err);
      setError(err.message || 'Unable to connect to local telemetry service or GEE API');
    } finally {
      setIsLoading(false);
    }
  };

  const risk = predictionData?.risk || {};
  const environmental = predictionData?.environmental || {};
  const predictions = predictionData?.predictions || {};
  const riskFactors = predictionData?.risk_factors || {};
  const meta = predictionData?.meta || {};

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans relative overflow-x-hidden transition-colors duration-300">
      {/* Background Cyber Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/10 dark:bg-cyan-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Top Aerospace Deck Header */}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Primary Command Station Trigger */}
        <LivePredictionButton
          onExecute={handleGetLivePrediction}
          isLoading={isLoading}
          isCompleted={hasPrediction}
        />

        {/* Dynamic Multi-Stage Pipeline HUD during Execution */}
        {(isLoading || (hasPrediction && stageIndex === 7)) && (
          <PredictionProgress currentStageIndex={stageIndex} isCompleted={hasPrediction} />
        )}

        {/* Error Notification */}
        {error && (
          <ErrorMessage message={error} onRetry={handleGetLivePrediction} />
        )}

        {/* Main Dashboard Results (Shown after Live Prediction) */}
        {hasPrediction && predictionData && (
          <div className="space-y-8 animate-fadeIn">

            {/* Tactical Emergency Hazard Briefing */}
            <RiskAlert riskLevel={risk.overall_risk_level} />

            {/* Constellation Telemetry & Sensor Timestamps Bar */}
            <TimestampDisplay meta={meta} retrievedAt={predictionData.retrieved_at} />

            {/* RISK ASSESSMENT CARDS */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-300 dark:border-slate-800/80 pb-3 gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wider flex items-center space-x-2 flex-wrap gap-y-1">
                      <span>MULTI-HAZARD RISK SYNTHESIS</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25">
                        REAL-TIME
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <div className="hidden md:flex items-center space-x-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                    <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                    <span>Dynamic Multi-Model Convergence</span>
                  </div>

                  {/* Emergency Alert Siren Button */}
                  <EmergencySirenButton />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RiskCard
                  title="FLOOD RISK"
                  icon={Waves}
                  riskValue={risk.flood_risk}
                  riskLevel={risk.flood_risk_level}
                  subtitle="Weighted: 45% Rainfall, 25% Soil, 15% Slope, 15% Landslide"
                />

                <RiskCard
                  title="LANDSLIDE RISK"
                  icon={Mountain}
                  riskValue={risk.landslide_risk}
                  riskLevel={risk.landslide_risk_level}
                  subtitle="Weighted: 30% Soil, 20% Rain, 20% Slope, 20% SAR, 10% Landslide"
                />

                <RiskCard
                  title="OVERALL HAZARD RISK"
                  icon={ShieldAlert}
                  riskValue={risk.overall_risk}
                  riskLevel={risk.overall_risk_level}
                  subtitle="Combined Multi-Hazard Index: 60% Flood Risk + 40% Landslide Risk"
                />
              </div>
            </div>

            {/* DISTRICT EMERGENCY BROADCAST DISPATCHER (NDMA CAP-XML & Cellular Alert Engine) */}
            <EmergencyDispatcher risk={risk} meta={meta} />

            {/* RISK FACTOR ANALYSIS (Continuous Bars) */}
            <RiskFactorBars factors={riskFactors} />

            {/* LATEST SATELLITE ENVIRONMENTAL CONDITIONS */}
            <EnvironmentalCard environmental={environmental} />

            {/* ML MODEL PREDICTIONS */}
            <MLPredictionCard predictions={predictions} />

            {/* FORECAST & TREND ANALYSIS */}
            <ForecastCard
              rainfallData={rainfallForecast || undefined}
              soilData={soilForecast || undefined}
              riskData={riskForecast || undefined}
            />

            {/* STUDY AREA & CARTOGRAPHY RADAR MAP */}
            <MapSection
              mapData={mapData || undefined}
              overallRiskLevel={risk.overall_risk_level}
              lastUpdated={predictionData.retrieved_at}
            />

            {/* PREDICTION SITUATION REPORT SUMMARY */}
            <PredictionSummary risk={risk} />

            {/* MODEL & DATA SOURCES */}
            <ModelInformation />

            {/* MODEL TRANSPARENCY & FORMULA INSPECTOR */}
            <ModelTransparency />

            {/* MODEL PERFORMANCE BENCHMARKS */}
            <ModelPerformance metadata={metadata || undefined} />
          </div>
        )}

        {/* Initial Empty State Info (Before User Clicks Get Live Prediction) */}
        {!hasPrediction && !isLoading && !error && (
          <div className="glass-panel border-cyan-500/25 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto my-12 relative overflow-hidden shadow-xl transition-all duration-300">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Holographic Radar Pulse */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-500/40 animate-ping opacity-70" />
              <div className="absolute -inset-2 rounded-full border border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '14s' }} />
              <div className="relative w-20 h-20 bg-white dark:bg-dark-900 border border-cyan-500/40 rounded-full flex items-center justify-center text-cyan-500 dark:text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                <Satellite className="w-9 h-9" />
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-500 dark:text-cyan-400" />
              <span>DISASTER INTELLIGENCE SENSORS STANDBY</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
              Himalayan Flash Flood & Landslide Defense Grid
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
              Target Zone: <strong className="text-cyan-600 dark:text-cyan-400 font-semibold">Joshimath Catchment Basin</strong> (Alaknanda & Dhauliganga Confluence, Chamoli, Uttarakhand).
              Click <strong className="text-slate-900 dark:text-white font-semibold">GET LIVE PREDICTION</strong> above to launch real-time multi-satellite telemetry acquisition and deep neural model execution.
            </p>

            {/* Live Sensor Capabilities Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-300 dark:border-slate-800/80">
              <div className="p-3 bg-white dark:bg-dark-900/60 rounded-xl border border-slate-300 dark:border-slate-800 text-left shadow-sm">
                <div className="text-[10px] font-mono text-slate-400">GPM IMERG</div>
                <div className="text-xs font-bold text-cyan-600 dark:text-cyan-300 mt-0.5">Precipitation Radar</div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">30-min Latency</div>
              </div>

              <div className="p-3 bg-white dark:bg-dark-900/60 rounded-xl border border-slate-300 dark:border-slate-800 text-left shadow-sm">
                <div className="text-[10px] font-mono text-slate-400">SMAP L4</div>
                <div className="text-xs font-bold text-cyan-600 dark:text-cyan-300 mt-0.5">Subsurface Moisture</div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">0-100cm Saturation</div>
              </div>

              <div className="p-3 bg-white dark:bg-dark-900/60 rounded-xl border border-slate-300 dark:border-slate-800 text-left shadow-sm">
                <div className="text-[10px] font-mono text-slate-400">SENTINEL-1</div>
                <div className="text-xs font-bold text-cyan-600 dark:text-cyan-300 mt-0.5">C-Band SAR Backscatter</div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">All-Weather Radar</div>
              </div>

              <div className="p-3 bg-white dark:bg-dark-900/60 rounded-xl border border-slate-300 dark:border-slate-800 text-left shadow-sm">
                <div className="text-[10px] font-mono text-slate-400">SRTM 30M</div>
                <div className="text-xs font-bold text-cyan-600 dark:text-cyan-300 mt-0.5">High-Res DEM Slope</div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">Steep Gradient Matrix</div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Aerospace Command Center Footer */}
      <footer className="glass-panel border-t border-slate-300 dark:border-slate-800/80 py-6 text-xs text-slate-500 dark:text-slate-400 mt-auto relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399] animate-pulse" />
            <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
              SIH-2026 AI-DRIVEN DISASTER EARLY WARNING • PROTOCOL JOSHIMATH-01
            </p>
          </div>
          
          <div className="flex items-center space-x-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <span>Inference Engines:</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">PyTorch 2.14</span>
            <span className="text-slate-400 dark:text-slate-700">•</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">TensorFlow/Keras</span>
            <span className="text-slate-400 dark:text-slate-700">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Earth Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
