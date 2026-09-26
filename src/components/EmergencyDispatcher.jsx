import React, { useState } from 'react';
import {
  Radio,
  Send,
  CheckCircle2,
  AlertTriangle,
  Users,
  Smartphone,
  MessageSquare,
  Globe,
  Volume2,
  ShieldAlert,
  Clock,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Building,
  Activity
} from 'lucide-react';
import { playEmergencyVoiceBroadcast } from '../utils/voiceAlert';
import { formatDateTime } from '../utils/formatting';

export default function EmergencyDispatcher({ risk = {}, meta = {} }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('en'); // 'en' | 'hi'
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionDone, setTransmissionDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Recipient selection states
  const [recipients, setRecipients] = useState({
    sdrf: true,
    deoc: true,
    citizens: true,
    medical: true
  });

  // Channel selection states
  const [channels, setChannels] = useState({
    sms: true,
    whatsapp: true,
    cap: true,
    pa: true
  });

  const overallRisk = Math.round((risk.overall_risk || 0.275) * 100);
  const riskLevel = risk.overall_risk_level || 'MODERATE';

  // Dynamic Emergency Advisory Scripts
  const englishMessage = `[CRITICAL ALERT - CHAMOLI DEOC] Multi-hazard flash flood & slope shear detected in Joshimath catchment (Overall Risk: ${overallRisk}% - ${riskLevel}). Soil saturation elevated. Pre-monsoon evacuation advisory active for Dhauliganga & Alaknanda riverbanks. Move to designated high-ground shelters (Ravigram/Sunil relief camps). Protocol: SIH-CHAMOLI-01. Helpline: 1077.`;

  const hindiMessage = `[आपदा चेतावनी - चमोली जिला आपदा केंद्र] जोशीमठ क्षेत्र में आकस्मिक बाढ़ एवं भूस्खलन की चेतावनी (जोखिम: ${overallRisk}% - ${riskLevel})। मिट्टी में नमी खतरनाक स्तर पर है। धौलीगंगा एवं अलकनंदा नदी तटों से तुरंत सुरक्षित ऊंचे स्थानों (रविग्राम/सुनील राहत शिविर) की ओर पहुंचे। आपदा प्रोटोकॉल: SIH-CHAMOLI-01। आपातकालीन नंबर: 1077।`;

  const toggleRecipient = (key) => {
    setRecipients(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChannel = (key) => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = () => {
    const text = activeTab === 'en' ? englishMessage : hindiMessage;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVoicePreview = () => {
    playEmergencyVoiceBroadcast({
      language: activeTab,
      englishText: englishMessage,
      hindiText: hindiMessage,
      withChime: true
    });
  };

  const handleTransmitBroadcast = () => {
    setIsTransmitting(true);
    setTransmissionDone(false);
    setStepIndex(1);

    setTimeout(() => setStepIndex(2), 700);
    setTimeout(() => setStepIndex(3), 1500);
    setTimeout(() => setStepIndex(4), 2300);
    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionDone(true);
    }, 3000);
  };

  return (
    <div className="glass-panel rounded-2xl border border-amber-300/80 dark:border-amber-500/30 shadow-xl overflow-hidden mb-8 transition-all">
      {/* Top Banner Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-red-500/15 hover:from-amber-500/20 transition-all flex items-center justify-between cursor-pointer select-none border-b border-amber-200 dark:border-amber-500/20"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-wide flex items-center gap-2">
                <span>DISTRICT EMERGENCY BROADCAST DISPATCHER</span>
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border border-red-300 dark:border-red-500/30">
                  CAP-v1.2 PROTOCOL
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-0.5">
              Automated multi-channel civil alerting engine for Chamoli District Emergency Operations Centre (DEOC)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden md:inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>GATEWAY ONLINE</span>
          </span>
          <div className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 space-y-6 animate-fadeIn">
          {/* Target Agencies & Distribution Channels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Target Agencies */}
            <div className="bg-slate-50/70 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Target Response Units & Population</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'sdrf', label: 'SDRF & NDRF Quick Response', desc: 'Chamoli & Joshimath Outposts', count: '64 Personnel' },
                  { id: 'deoc', label: 'District Magistrate & DEOC', desc: 'Gopeshwar Central Command', count: '12 Officers' },
                  { id: 'citizens', label: 'Public Cellular Broadcast', desc: 'Joshimath-Badrinath Corridor', count: '~18,400 Devices' },
                  { id: 'medical', label: 'Emergency Medical & EMS', desc: 'Sub-District Hospital Joshimath', count: '6 Ambulances' }
                ].map((agency) => {
                  const isChecked = recipients[agency.id];
                  return (
                    <button
                      key={agency.id}
                      type="button"
                      onClick={() => toggleRecipient(agency.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all text-xs flex items-start justify-between ${
                        isChecked
                          ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-500/40 text-slate-900 dark:text-slate-100 shadow-sm'
                          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{agency.label}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{agency.desc}</div>
                        <div className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold mt-1">{agency.count}</div>
                      </div>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border mt-0.5 ${
                        isChecked ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Broadcast Channels */}
            <div className="bg-slate-50/70 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Multi-Modal Transmission Channels</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'sms', icon: Smartphone, label: 'TRAI Cell Broadcast / SMS', speed: '< 4 seconds', priority: 'Class 0 Flash' },
                  { id: 'whatsapp', icon: MessageSquare, label: 'WhatsApp Disaster Bot', speed: '< 6 seconds', priority: 'Media Push' },
                  { id: 'cap', icon: Globe, label: 'NDMA CAP-XML Web Feed', speed: 'Immediate', priority: 'Govt Portal' },
                  { id: 'pa', icon: Volume2, label: 'Joshimath Siren & PA Horns', speed: 'Instantaneous', priority: 'Acoustic Alert' }
                ].map((ch) => {
                  const isChecked = channels[ch.id];
                  const Icon = ch.icon;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => toggleChannel(ch.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all text-xs flex items-start justify-between ${
                        isChecked
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-slate-900 dark:text-slate-100 shadow-sm'
                          : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                        <div>
                          <div className="font-semibold">{ch.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Latency: {ch.speed}</div>
                          <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">{ch.priority}</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border mt-0.5 ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bilingual Message Preview & Live Editor */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-50 dark:bg-slate-950/60">
              <div className="flex items-center space-x-1 font-mono text-xs">
                <span className="text-slate-500 dark:text-slate-400 mr-2 font-bold uppercase text-[11px]">Advisory Language:</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                    activeTab === 'en'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                  }`}
                >
                  English Broadcast
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('hi')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                    activeTab === 'hi'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                  }`}
                >
                  हिंदी चेतावनी (Hindi)
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleVoicePreview}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-300 text-xs font-mono font-semibold flex items-center gap-1 shadow-sm"
                  title="Play speech announcement preview"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Preview Voice Announcement</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-mono flex items-center gap-1 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50/40 dark:bg-dark-950/40 select-all">
              {activeTab === 'en' ? englishMessage : hindiMessage}
            </div>
          </div>

          {/* Action Trigger & Simulated Transmission Telemetry */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Payload format: <strong className="text-slate-800 dark:text-slate-200">NDMA CAP-XML v1.2 / TRAI Class-0 Cell Broadcast</strong>
              </div>

              <button
                type="button"
                onClick={handleTransmitBroadcast}
                disabled={isTransmitting}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono font-extrabold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center space-x-2.5 ${
                  isTransmitting
                    ? 'bg-amber-600 text-white cursor-wait animate-pulse'
                    : transmissionDone
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500'
                    : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white hover:from-red-500 hover:to-rose-600 border border-red-400/40 shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-95'
                }`}
              >
                {isTransmitting ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING BROADCAST TO 18,400+ RECIPIENTS...</span>
                  </>
                ) : transmissionDone ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>BROADCAST DELIVERED SUCCESSFULLY (RE-TRANSMIT)</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>DISPATCH EMERGENCY ALERT BROADCAST</span>
                  </>
                )}
              </button>
            </div>

            {/* Transmission Telemetry Progress */}
            {(isTransmitting || transmissionDone) && (
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 shadow-inner space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>DISPATCH TELEMETRY AUDIT TRAIL</span>
                  </div>
                  <span>{formatDateTime(new Date().toISOString())}</span>
                </div>

                <div className="space-y-1.5">
                  <div className={`flex items-center space-x-2 ${stepIndex >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>[0.4s] Encrypted NDMA CAP-XML payload with Chamoli DEOC Private Key.</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${stepIndex >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>[1.1s] Cell Broadcast Handshake: Airtel, Jio, BSNL Joshimath towers synchronized.</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${stepIndex >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>[2.2s] Geo-fencing locked: 10 km Joshimath polygon broadcast triggered.</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${stepIndex >= 4 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>[2.9s] Completed: 18,420 mobile alerts dispatched, SDRF Quick Response Unit acknowledged.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
