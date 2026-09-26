/**
 * Bilingual Emergency Voice Announcement System (Hindi & English)
 * Generates an authoritative Public Address (PA) attention chime and
 * utilizes the browser's Web Speech API for emergency broadcast alerts.
 */

let isSpeaking = false;
let currentUtterances = [];

/**
 * Play a realistic 2-tone Public Address (PA) announcement chime before voice starts.
 */
export async function playAttentionChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const now = ctx.currentTime;

    // Tone 1 (e.g. G4: 392 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(392, now);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Tone 2 (e.g. C5: 523.25 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, now + 0.35);
    gain2.gain.setValueAtTime(0.001, now + 0.35);
    gain2.gain.exponentialRampToValueAtTime(0.35, now + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.35);
    osc2.stop(now + 0.95);

    return new Promise(resolve => setTimeout(resolve, 950));
  } catch (err) {
    console.warn('Unable to play attention chime:', err);
  }
}

/**
 * Get available voices from SpeechSynthesis API.
 */
function getVoices() {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices() || [];
}

/**
 * Play emergency voice broadcast in English, Hindi, or both.
 * @param {Object} options
 * @param {('both'|'en'|'hi')} [options.language='both'] - Language mode
 * @param {string} [options.englishText] - Custom English announcement text
 * @param {string} [options.hindiText] - Custom Hindi announcement text
 * @param {boolean} [options.withChime=true] - Whether to play 2-tone attention chime first
 * @param {Function} [options.onStart] - Callback on broadcast start
 * @param {Function} [options.onEnd] - Callback when entire broadcast ends
 */
export async function playEmergencyVoiceBroadcast({
  language = 'both',
  englishText = "Attention. Flash flood and slope instability alert in effect for Joshimath, Chamoli district. Soil saturation is critical. Evacuate riverbeds and move to designated high ground shelters immediately.",
  hindiText = "सावधान। जोशीमठ एवं चमोली क्षेत्र के लिए बाढ़ और भूस्खलन की चेतावनी जारी की गई है। नदी तटों और ढलानों से दूर रहें और तुरंत सुरक्षित स्थानों पर पहुंचे।",
  withChime = true,
  onStart = null,
  onEnd = null
} = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis API not supported in this browser.');
    if (onEnd) onEnd();
    return false;
  }

  // Stop any active speech
  stopEmergencyVoiceBroadcast();

  if (withChime) {
    await playAttentionChime();
  }

  isSpeaking = true;
  if (typeof onStart === 'function') onStart();

  const voices = getVoices();
  const queue = [];

  // 1. English announcement
  if (language === 'both' || language === 'en') {
    const enUtterance = new SpeechSynthesisUtterance(englishText);
    enUtterance.lang = 'en-IN';
    enUtterance.rate = 0.92; // Slightly measured for emergency clarity
    enUtterance.pitch = 1.05;

    // Prefer Indian English voice or natural English voice if available
    const enVoice = voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india')) ||
                    voices.find(v => v.lang.startsWith('en'));
    if (enVoice) enUtterance.voice = enVoice;

    queue.push(enUtterance);
  }

  // 2. Hindi announcement
  if (language === 'both' || language === 'hi') {
    const hiUtterance = new SpeechSynthesisUtterance(hindiText);
    hiUtterance.lang = 'hi-IN';
    hiUtterance.rate = 0.88; // Deliberate pace for maximum comprehension
    hiUtterance.pitch = 1.0;

    // Look for Hindi voice
    const hiVoice = voices.find(v => v.lang === 'hi-IN' || v.lang.startsWith('hi')) ||
                    voices.find(v => v.name.toLowerCase().includes('hindi'));
    if (hiVoice) hiUtterance.voice = hiVoice;

    queue.push(hiUtterance);
  }

  if (queue.length === 0) {
    isSpeaking = false;
    if (onEnd) onEnd();
    return false;
  }

  currentUtterances = queue;

  // Chain utterances sequentially
  queue.forEach((utt, idx) => {
    if (idx === queue.length - 1) {
      utt.onend = () => {
        isSpeaking = false;
        currentUtterances = [];
        if (typeof onEnd === 'function') onEnd();
      };
      utt.onerror = () => {
        isSpeaking = false;
        currentUtterances = [];
        if (typeof onEnd === 'function') onEnd();
      };
    }
    window.speechSynthesis.speak(utt);
  });

  return true;
}

/**
 * Stop active voice broadcast immediately.
 */
export function stopEmergencyVoiceBroadcast() {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
  isSpeaking = false;
  currentUtterances = [];
}

/**
 * Check if voice broadcast is actively speaking.
 */
export function isVoiceSpeaking() {
  return isSpeaking || (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking);
}
