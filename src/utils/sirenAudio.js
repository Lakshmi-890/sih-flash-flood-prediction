/**
 * Multi-Mode Emergency Alert Siren Engine using Web Audio API
 * Generates piercing, authentic disaster warning & evacuation sirens
 * Zero network dependencies, works offline.
 */

let audioCtx = null;
let sirenNodes = null;
let patternInterval = null;
let autoStopTimer = null;

export const SIREN_MODES = {
  hilo: {
    id: 'hilo',
    name: 'Hi-Lo Evacuation',
    description: 'Urgent alternating two-tone civil emergency siren (European / Disaster Alarm)',
    badge: '🚨 HI-LO'
  },
  yelp: {
    id: 'yelp',
    name: 'Fast Yelp Alarm',
    description: 'Rapid multi-hazard emergency warble sweep',
    badge: '⚡ YELP'
  },
  wail: {
    id: 'wail',
    name: 'Air-Raid Horn',
    description: 'Deep continuous rising and falling disaster wail',
    badge: '📢 WAIL'
  },
  klaxon: {
    id: 'klaxon',
    name: 'Pulsed Klaxon',
    description: 'Loud industrial dam-breach evacuation horn',
    badge: '⚠️ KLAXON'
  }
};

function getAudioContext() {
  if (!audioCtx || audioCtx.state === 'closed') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

/**
 * Start the emergency alert siren with selectable sound patterns.
 * @param {Object} options
 * @param {('hilo'|'yelp'|'wail'|'klaxon')} [options.mode='hilo'] - Siren pattern
 * @param {number} [options.maxDuration=30] - Max seconds before auto-silencing
 * @param {Function} [options.onStop] - Callback when siren stops
 * @param {number} [options.volume=0.35] - Master volume
 */
export async function startEmergencySiren({
  mode = 'hilo',
  maxDuration = 30,
  onStop = null,
  volume = 0.35
} = {}) {
  // If already playing, stop first
  if (sirenNodes) {
    stopEmergencySiren();
  }

  const ctx = getAudioContext();
  if (!ctx) {
    console.warn('Web Audio API not supported.');
    return false;
  }

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch (e) {
      console.error('Failed to resume AudioContext:', e);
    }
  }

  const now = ctx.currentTime;

  // Master Gain with quick punchy fade-in
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, now);
  masterGain.gain.exponentialRampToValueAtTime(Math.max(0.05, Math.min(volume, 0.8)), now + 0.1);
  masterGain.connect(ctx.destination);

  // Lowpass filter with slight resonance to give physical horn acoustics
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2800, now);
  filter.Q.setValueAtTime(3.0, now);
  filter.connect(masterGain);

  let activeOscs = [];

  if (mode === 'hilo') {
    // ==========================================
    // MODE 1: HI-LO EVACUATION SIREN (Default)
    // Piercing alternating two-tone: 960Hz <-> 770Hz
    // ==========================================
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(960, now);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(964, now); // Detuned for thick mechanical beating

    const subOsc = ctx.createOscillator();
    subOsc.type = 'square';
    subOsc.frequency.setValueAtTime(480, now);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.35, now);
    subOsc.connect(subGain);
    subGain.connect(filter);

    osc1.connect(filter);
    osc2.connect(filter);

    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);
    activeOscs = [osc1, osc2, subOsc];

    let isHigh = true;
    const SWITCH_MS = 380; // Alternation period

    patternInterval = setInterval(() => {
      if (!sirenNodes || !audioCtx || audioCtx.state !== 'running') return;
      isHigh = !isHigh;
      const t = audioCtx.currentTime;
      const freq = isHigh ? 960 : 770;

      osc1.frequency.cancelScheduledValues(t);
      osc2.frequency.cancelScheduledValues(t);
      subOsc.frequency.cancelScheduledValues(t);

      // Sharp step with micro-glide (40ms) like a mechanical dual-tone horn
      osc1.frequency.linearRampToValueAtTime(freq, t + 0.04);
      osc2.frequency.linearRampToValueAtTime(freq + 4, t + 0.04);
      subOsc.frequency.linearRampToValueAtTime(freq / 2, t + 0.04);
    }, SWITCH_MS);

  } else if (mode === 'yelp') {
    // ==========================================
    // MODE 2: FAST YELP EMERGENCY WARBLE
    // Rapid sweeps from 650Hz to 1350Hz every 200ms
    // ==========================================
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(650, now);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(655, now);

    osc1.connect(filter);
    osc2.connect(filter);

    osc1.start(now);
    osc2.start(now);
    activeOscs = [osc1, osc2];

    const YELP_MS = 220;

    function runYelpCycle() {
      if (!sirenNodes || !audioCtx || audioCtx.state !== 'running') return;
      const t = audioCtx.currentTime;
      osc1.frequency.cancelScheduledValues(t);
      osc2.frequency.cancelScheduledValues(t);

      osc1.frequency.setValueAtTime(650, t);
      osc2.frequency.setValueAtTime(655, t);
      osc1.frequency.exponentialRampToValueAtTime(1350, t + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(1360, t + 0.18);
    }

    runYelpCycle();
    patternInterval = setInterval(runYelpCycle, YELP_MS);

  } else if (mode === 'klaxon') {
    // ==========================================
    // MODE 3: PULSED KLAXON EVACUATION HORN
    // Dual dissonant tone (460Hz + 580Hz) pulsed
    // ==========================================
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(460, now);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(580, now);

    const pulseGain = ctx.createGain();
    pulseGain.gain.setValueAtTime(1.0, now);

    osc1.connect(pulseGain);
    osc2.connect(pulseGain);
    pulseGain.connect(filter);

    osc1.start(now);
    osc2.start(now);
    activeOscs = [osc1, osc2];

    let isOn = true;
    patternInterval = setInterval(() => {
      if (!sirenNodes || !audioCtx || audioCtx.state !== 'running') return;
      isOn = !isOn;
      const t = audioCtx.currentTime;
      pulseGain.gain.cancelScheduledValues(t);
      if (isOn) {
        pulseGain.gain.setValueAtTime(0.001, t);
        pulseGain.gain.linearRampToValueAtTime(1.0, t + 0.05);
      } else {
        pulseGain.gain.linearRampToValueAtTime(0.001, t + 0.05);
      }
    }, 450);

  } else {
    // ==========================================
    // MODE 4: AIR-RAID WAIL (Continuous sweep)
    // Faster, punchier 1.2s sweep cycle 500Hz - 1000Hz
    // ==========================================
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(500, now);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(505, now);

    osc1.connect(filter);
    osc2.connect(filter);

    osc1.start(now);
    osc2.start(now);
    activeOscs = [osc1, osc2];

    let goingUp = true;
    const HALF_SEC = 1.0;

    function scheduleWail(time) {
      if (!sirenNodes || !audioCtx || audioCtx.state !== 'running') return;
      const target = goingUp ? 1020 : 500;
      const nextTime = time + HALF_SEC;

      osc1.frequency.cancelScheduledValues(time);
      osc2.frequency.cancelScheduledValues(time);

      osc1.frequency.linearRampToValueAtTime(target, nextTime);
      osc2.frequency.linearRampToValueAtTime(target + 5, nextTime);

      goingUp = !goingUp;
      patternInterval = setTimeout(() => {
        if (sirenNodes && audioCtx && audioCtx.state === 'running') {
          scheduleWail(audioCtx.currentTime);
        }
      }, HALF_SEC * 1000 - 40);
    }

    scheduleWail(now);
  }

  sirenNodes = {
    masterGain,
    filter,
    activeOscs,
    mode,
    onStop
  };

  // Auto-silence safety timer
  if (maxDuration > 0) {
    autoStopTimer = setTimeout(() => {
      stopEmergencySiren();
    }, maxDuration * 1000);
  }

  return true;
}

/**
 * Stop the emergency siren smoothly.
 */
export function stopEmergencySiren() {
  if (autoStopTimer) {
    clearTimeout(autoStopTimer);
    autoStopTimer = null;
  }
  if (patternInterval) {
    clearInterval(patternInterval);
    clearTimeout(patternInterval);
    patternInterval = null;
  }

  if (!sirenNodes) return;

  const { masterGain, activeOscs, onStop } = sirenNodes;
  sirenNodes = null;

  try {
    if (audioCtx && audioCtx.state !== 'closed') {
      const now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.15);

      setTimeout(() => {
        try {
          activeOscs.forEach(osc => {
            osc.stop();
            osc.disconnect();
          });
          masterGain.disconnect();
        } catch (e) {
          // ignore already stopped
        }
      }, 200);
    }
  } catch (e) {
    console.error('Error stopping siren audio:', e);
  }

  if (typeof onStop === 'function') {
    onStop();
  }
}

/**
 * Check if the siren is active.
 */
export function isEmergencySirenActive() {
  return sirenNodes !== null;
}
