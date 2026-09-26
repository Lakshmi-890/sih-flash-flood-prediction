import React, { useState, useEffect, useRef } from 'react';
import { Siren, ChevronDown, Volume2, Megaphone, Check, Radio } from 'lucide-react';
import { startEmergencySiren, stopEmergencySiren, SIREN_MODES } from '../utils/sirenAudio';
import { playEmergencyVoiceBroadcast, stopEmergencyVoiceBroadcast } from '../utils/voiceAlert';

export default function EmergencySirenButton({ className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState('hilo'); // Default to piercing Hi-Lo siren
  const [voiceLang, setVoiceLang] = useState('both'); // 'both', 'en', 'hi'
  const [showMenu, setShowMenu] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      stopEmergencySiren();
      stopEmergencyVoiceBroadcast();
    };
  }, []);

  // Countdown timer while playing siren
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      setSecondsLeft(30);
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setSecondsLeft(30);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Toggle Siren On/Off
  const handleToggleSiren = async () => {
    if (isPlaying) {
      stopEmergencySiren();
      setIsPlaying(false);
    } else {
      const started = await startEmergencySiren({
        mode: selectedMode,
        maxDuration: 30,
        volume: 0.38,
        onStop: () => {
          setIsPlaying(false);
        }
      });
      if (started) {
        setIsPlaying(true);
      }
    }
  };

  // Toggle Bilingual Voice Broadcast On/Off
  const handleToggleVoice = async () => {
    if (isVoiceActive) {
      stopEmergencyVoiceBroadcast();
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      const played = await playEmergencyVoiceBroadcast({
        language: voiceLang,
        withChime: true,
        onStart: () => setIsVoiceActive(true),
        onEnd: () => setIsVoiceActive(false)
      });
      if (!played) {
        setIsVoiceActive(false);
      }
    }
  };

  // Silence all active alarms immediately
  const handleSilenceAll = () => {
    stopEmergencySiren();
    stopEmergencyVoiceBroadcast();
    setIsPlaying(false);
    setIsVoiceActive(false);
  };

  const handleSelectMode = async (modeKey) => {
    setSelectedMode(modeKey);
    setShowMenu(false);

    // If already playing, immediately switch to the new siren sound
    if (isPlaying) {
      await startEmergencySiren({
        mode: modeKey,
        maxDuration: secondsLeft > 0 ? secondsLeft : 30,
        volume: 0.38,
        onStop: () => {
          setIsPlaying(false);
        }
      });
    }
  };

  const currentModeInfo = SIREN_MODES[selectedMode] || SIREN_MODES.hilo;
  const isAnyActive = isPlaying || isVoiceActive;

  return (
    <div ref={menuRef} className={`relative inline-flex items-center gap-1.5 ${className}`}>
      {/* Outer Ping Animation when Active */}
      {isAnyActive && (
        <span className="absolute -inset-1 rounded-xl bg-red-600/40 animate-ping pointer-events-none opacity-75"></span>
      )}

      {/* Main Trigger Button: Emergency Siren */}
      <button
        onClick={handleToggleSiren}
        type="button"
        title={isPlaying ? "Silence Emergency Siren" : `Sound ${currentModeInfo.name} Siren`}
        className={`relative inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 select-none shadow-sm cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white border-2 border-red-300 shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse ring-2 ring-red-400 ring-offset-2 ring-offset-white dark:ring-offset-dark-950'
            : 'bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/40 hover:border-red-400 dark:hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] active:scale-95'
        }`}
      >
        {/* Animated Icon */}
        <div className="flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-center space-x-1">
              <Siren className="w-4 h-4 text-white animate-spin" />
              {/* Sound Wave Bars */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-0.5 h-2/3 bg-white animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-0.5 h-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          ) : (
            <div className="p-1 rounded-md bg-red-500/15 text-red-600 dark:text-red-400">
              <Siren className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Text Labels */}
        <div className="flex items-center space-x-1.5">
          {isPlaying ? (
            <>
              <span className="tracking-wide">SIREN ACTIVE ({secondsLeft}s)</span>
              <span className="text-[10px] uppercase font-sans font-normal opacity-90 underline underline-offset-2">
                [SILENCE]
              </span>
            </>
          ) : (
            <>
              <span className="tracking-wider">ALERT SIREN</span>
              <span className="text-[10px] opacity-75 font-normal">({currentModeInfo.name})</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            </>
          )}
        </div>
      </button>

      {/* Bilingual PA Voice Broadcast Button */}
      <button
        onClick={handleToggleVoice}
        type="button"
        title={isVoiceActive ? "Stop Voice Broadcast" : "Broadcast Emergency Evacuation Voice Warning (Hindi & English)"}
        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 select-none shadow-sm cursor-pointer ${
          isVoiceActive
            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-2 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
            : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 hover:border-amber-400 active:scale-95'
        }`}
      >
        <Megaphone className={`w-3.5 h-3.5 ${isVoiceActive ? 'text-white animate-bounce' : 'text-amber-600 dark:text-amber-400'}`} />
        <span className="tracking-wide">
          {isVoiceActive ? 'BROADCASTING...' : 'VOICE ALERT (HIN/ENG)'}
        </span>
      </button>

      {/* Siren Sound Mode Selector Dropdown Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        type="button"
        title="Audio Alert Settings & Sound Patterns"
        className={`px-2 py-1.5 rounded-xl font-mono text-xs font-semibold border transition-all duration-150 flex items-center gap-1 shadow-sm ${
          isAnyActive
            ? 'bg-red-800 text-white border-red-400'
            : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-red-400'
        }`}
      >
        <span>{currentModeInfo.badge.split(' ')[0]}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} />
      </button>

      {/* Audio Settings & Pattern Selection Popover */}
      {showMenu && (
        <div className="absolute top-full right-0 mt-2 w-72 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-[1000] animate-fadeIn font-sans">
          {/* Header */}
          <div className="px-2 py-1 border-b border-slate-100 dark:border-slate-800 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Emergency Sound Mode
            </span>
            {isAnyActive && (
              <button
                onClick={handleSilenceAll}
                className="text-[10px] font-mono text-rose-600 hover:underline font-bold"
              >
                SILENCE ALL
              </button>
            )}
          </div>

          {/* Siren Patterns */}
          <div className="space-y-1 mb-3">
            {Object.values(SIREN_MODES).map((mode) => {
              const isSelected = mode.id === selectedMode;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleSelectMode(mode.id)}
                  className={`w-full p-2 rounded-lg text-left transition-colors flex items-start justify-between gap-2 text-xs ${
                    isSelected
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 font-bold border border-red-200 dark:border-red-500/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px]">{mode.badge}</span>
                      <span className="font-semibold">{mode.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 line-clamp-1">
                      {mode.description}
                    </p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Voice Language Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Voice Announcement Language
            </span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'both', label: 'Bilingual' },
                { id: 'hi', label: 'हिंदी (Hindi)' },
                { id: 'en', label: 'English' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setVoiceLang(lang.id)}
                  className={`py-1 px-1.5 rounded-md text-[11px] font-mono font-semibold transition-colors text-center ${
                    voiceLang === lang.id
                      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-500/40'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
