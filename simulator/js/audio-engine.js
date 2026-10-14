// Omnitrix Web Audio Procedural Synthesizer
// Generates authentic Ben 10 & Galvan acoustic soundscapes using the Web Audio API

class OmnitrixAudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.isMuted = false;
        this.ambientHumNode = null;
        this.ambientGain = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
        }
        return this.isMuted;
    }

    // Dial rotation ratchet tick
    playDialClick(direction = 1) {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400 + (direction * 150), now);
        filter.Q.setValueAtTime(8, now);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.05);

        // Sub click
        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(120, now);
        subGain.gain.setValueAtTime(0.4, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        sub.connect(subGain);
        subGain.connect(this.masterGain);
        sub.start(now);
        sub.stop(now + 0.035);
    }

    // Dial pop-up activation sequence
    playPopUp() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;

        // 1. Mechanical pneumatic release click
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(250, now);
        clickOsc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
        clickGain.gain.setValueAtTime(0.5, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        clickOsc.connect(clickGain);
        clickGain.connect(this.masterGain);
        clickOsc.start(now);
        clickOsc.stop(now + 0.09);

        // 2. Rising Galvan capacitor charge whine
        const whineOsc = this.ctx.createOscillator();
        const whineGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(3500, now + 0.35);

        whineOsc.type = 'triangle';
        whineOsc.frequency.setValueAtTime(220, now + 0.02);
        whineOsc.frequency.exponentialRampToValueAtTime(1480, now + 0.4);

        whineGain.gain.setValueAtTime(0.01, now);
        whineGain.gain.linearRampToValueAtTime(0.4, now + 0.2);
        whineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        whineOsc.connect(filter);
        filter.connect(whineGain);
        whineGain.connect(this.masterGain);

        whineOsc.start(now + 0.02);
        whineOsc.stop(now + 0.46);

        // 3. Sci-fi energy pulse ping
        setTimeout(() => {
            if (this.isMuted || !this.ctx) return;
            const t = this.ctx.currentTime;
            const ping = this.ctx.createOscillator();
            const pGain = this.ctx.createGain();
            ping.type = 'sine';
            ping.frequency.setValueAtTime(1760, t);
            ping.frequency.exponentialRampToValueAtTime(880, t + 0.2);
            pGain.gain.setValueAtTime(0.3, t);
            pGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
            ping.connect(pGain);
            pGain.connect(this.masterGain);
            ping.start(t);
            ping.stop(t + 0.26);
        }, 320);
    }

    // Slap down core -> Transformation shockwave
    playSlapDown() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;

        // 1. Heavy physical slap slam impact
        const slapOsc = this.ctx.createOscillator();
        const slapGain = this.ctx.createGain();
        slapOsc.type = 'sawtooth';
        slapOsc.frequency.setValueAtTime(180, now);
        slapOsc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
        slapGain.gain.setValueAtTime(0.8, now);
        slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        slapOsc.connect(slapGain);
        slapGain.connect(this.masterGain);
        slapOsc.start(now);
        slapOsc.stop(now + 0.21);

        // 2. White noise energy burst (plasma flash)
        const bufferSize = this.ctx.sampleRate * 0.4;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1800, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(200, now + 0.35);
        noiseFilter.Q.setValueAtTime(3, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        whiteNoise.start(now);

        // 3. Galvan DNA surge chords (Iconic Ben 10 transformation swell)
        const chordNotes = [392, 587.33, 783.99, 1174.66]; // G chord harmonic cascade
        chordNotes.forEach((freq, idx) => {
            const chordOsc = this.ctx.createOscillator();
            const chordGain = this.ctx.createGain();
            chordOsc.type = 'triangle';
            chordOsc.frequency.setValueAtTime(freq * 0.5, now + 0.05);
            chordOsc.frequency.exponentialRampToValueAtTime(freq, now + 0.3 + idx * 0.04);

            chordGain.gain.setValueAtTime(0.001, now + 0.05);
            chordGain.gain.linearRampToValueAtTime(0.25 / (idx + 1), now + 0.25);
            chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

            chordOsc.connect(chordGain);
            chordGain.connect(this.masterGain);
            chordOsc.start(now + 0.05);
            chordOsc.stop(now + 0.9);
        });
    }

    // Alien unique sound profiles
    playAlienRoar(soundProfile) {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;

        switch (soundProfile) {
            case 'fire': // Heatblast: crackling flame & roar
                this.synthesizeFireWhoosh(now);
                break;
            case 'clap': // Four Arms: sonic boom shockwave
                this.synthesizeSonicBoom(now);
                break;
            case 'speed': // XLR8: doppler jet flyby
                this.synthesizeSpeedFlyby(now);
                break;
            case 'crystal': // Diamondhead: crystalline harmonic resonance
                this.synthesizeCrystalChimes(now);
                break;
            case 'tech': // Upgrade: cybernetic digital modulation
                this.synthesizeCyberModem(now);
                break;
            case 'ghost': // Ghostfreak: eerie spectral wisp
                this.synthesizeGhostWisp(now);
                break;
            case 'roll': // Cannonbolt: heavy tumbling kinetic sphere
                this.synthesizeKineticRoll(now);
                break;
            case 'intellect': // Grey Matter: synaptic high-frequency pulses
                this.synthesizeSynapsePing(now);
                break;
            case 'sonar': // Ripjaws: deep ocean sonar ping
                this.synthesizeUnderwaterSonar(now);
                break;
            case 'cosmic': // Alien X: celestial deep space drone
            default:
                this.synthesizeCosmicDrone(now);
                break;
        }
    }

    synthesizeFireWhoosh(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.6);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.7);
    }

    synthesizeSonicBoom(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.4);
        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.55);
    }

    synthesizeSpeedFlyby(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(250, now + 0.35);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    synthesizeCrystalChimes(now) {
        [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.06);
            gain.gain.setValueAtTime(0.2, now + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.5);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + idx * 0.06);
            osc.stop(now + idx * 0.06 + 0.55);
        });
    }

    synthesizeCyberModem(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(1200, now + 0.08);
        osc.frequency.setValueAtTime(600, now + 0.16);
        osc.frequency.setValueAtTime(1800, now + 0.24);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.46);
    }

    synthesizeGhostWisp(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.3);
        osc.frequency.linearRampToValueAtTime(260, now + 0.6);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.7);
    }

    synthesizeKineticRoll(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.3);
        osc.frequency.linearRampToValueAtTime(80, now + 0.55);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.62);
    }

    synthesizeSynapsePing(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(3200, now + 0.1);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.22);
    }

    synthesizeUnderwaterSonar(now) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.82);
    }

    synthesizeCosmicDrone(now) {
        [110, 220, 277.18, 329.63].forEach((f) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 1.25);
        });
    }

    // Urgent timeout warning beep (Galvan red flash alarm)
    playTimeoutWarning() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(950, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.13);
    }

    // Recharge complete (green ready chime)
    playRechargeDone() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.3, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.35);
        });
    }

    // Gemini voice assistant listening chime
    playVoiceChime(activated = true) {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const f1 = activated ? 587.33 : 880;
        const f2 = activated ? 880 : 587.33;

        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(f1, now);
        gain1.gain.setValueAtTime(0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        osc1.start(now);
        osc1.stop(now + 0.13);

        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(f2, now + 0.1);
        gain2.gain.setValueAtTime(0.25, now + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.3);
    }

    // Self-destruct klaxon
    playSelfDestructKlaxon() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(450, now + 0.3);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.36);
    }

    // DNA Scanner ping
    playDnaScan() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.34);
    }
}

window.OmnitrixAudio = new OmnitrixAudioEngine();
