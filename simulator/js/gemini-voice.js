// Omnitrix Gemini Voice-to-Action Engine
// Integrates Speech Recognition, Gemini AI Natural Language Processing, and Galvan TTS Feedback

class GeminiVoiceEngine {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.apiKey = localStorage.getItem('omnitrix_gemini_api_key') || '';
        this.synth = window.speechSynthesis;
        this.onActionResult = null; // Callback for state machine
        this.initSpeechRecognition();
    }

    initSpeechRecognition() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRec) {
            this.recognition = new SpeechRec();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                window.OmnitrixAudio.playVoiceChime(true);
                this.updateUIListening(true);
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log("[Gemini Voice Input]:", transcript);
                this.processVoiceCommand(transcript);
            };

            this.recognition.onerror = (event) => {
                console.warn("[Gemini Voice Error]:", event.error);
                this.isListening = false;
                this.updateUIListening(false);
                if (event.error === 'not-allowed') {
                    this.speak("Microphone permission denied. You can also type commands into the simulator console.");
                }
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateUIListening(false);
            };
        } else {
            console.log("SpeechRecognition not available natively in this environment. Text console will be primary.");
        }
    }

    setApiKey(key) {
        this.apiKey = key.trim();
        localStorage.setItem('omnitrix_gemini_api_key', this.apiKey);
    }

    toggleListening() {
        if (!this.recognition) {
            this.speak("Voice recognition not supported by browser. Please use the Voice Simulator input below.");
            const input = document.getElementById('voice-sim-input');
            if (input) input.focus();
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (e) {
                console.error("Speech start error:", e);
            }
        }
    }

    updateUIListening(listening) {
        const voiceOrb = document.getElementById('gemini-voice-orb');
        const voiceStatus = document.getElementById('voice-status-text');
        const micBtn = document.getElementById('btn-voice-mic');
        
        if (listening) {
            if (voiceOrb) voiceOrb.classList.add('listening');
            if (voiceStatus) voiceStatus.textContent = "Listening to Ben...";
            if (micBtn) micBtn.classList.add('active');
        } else {
            if (voiceOrb) voiceOrb.classList.remove('listening');
            if (voiceStatus) voiceStatus.textContent = "Gemini AI Ready";
            if (micBtn) micBtn.classList.remove('active');
        }
    }

    async processVoiceCommand(rawTranscript) {
        const transcript = rawTranscript.toLowerCase().trim();
        const display = document.getElementById('voice-transcript-display');
        if (display) {
            display.textContent = `"${rawTranscript}"`;
            display.classList.add('flash');
            setTimeout(() => display.classList.remove('flash'), 1000);
        }

        // 1. If API key is present, optionally invoke live Gemini 1.5/2.0 REST API
        if (this.apiKey) {
            try {
                const geminiResult = await this.callGeminiAPI(rawTranscript);
                if (geminiResult) {
                    this.dispatchAction(geminiResult);
                    return;
                }
            } catch (err) {
                console.warn("Gemini API call failed, falling back to local Galvan engine:", err);
            }
        }

        // 2. High-speed Galvan heuristic semantic intent parser
        const intent = this.parseLocalIntent(transcript);
        this.dispatchAction(intent);
    }

    parseLocalIntent(text) {
        // Alien Transformations
        if (text.includes('heatblast') || text.includes('fire') || text.includes('flame') || text.includes('burn') || text.includes('pyronite')) {
            return {
                action: 'TRANSFORM',
                alienId: 'heatblast',
                speech: "DNA verified. Pyronite selected. Let's turn up the heat!"
            };
        }
        if (text.includes('four arms') || text.includes('fourarms') || text.includes('strength') || text.includes('smash') || text.includes('tetramand') || text.includes('punch')) {
            return {
                action: 'TRANSFORM',
                alienId: 'fourarms',
                speech: "DNA verified. Tetramand selected. Maximum brute strength online."
            };
        }
        if (text.includes('xlr8') || text.includes('accelerate') || text.includes('speed') || text.includes('fast') || text.includes('kineceleran') || text.includes('run')) {
            return {
                action: 'TRANSFORM',
                alienId: 'xlr8',
                speech: "DNA verified. Kineceleran selected. Hyper-speed engaged."
            };
        }
        if (text.includes('diamondhead') || text.includes('diamond') || text.includes('crystal') || text.includes('shard') || text.includes('petrosapien')) {
            return {
                action: 'TRANSFORM',
                alienId: 'diamondhead',
                speech: "DNA verified. Petrosapien selected. Diamond armor reinforced."
            };
        }
        if (text.includes('upgrade') || text.includes('hack') || text.includes('machine') || text.includes('merge') || text.includes('mechamorph') || text.includes('tech')) {
            return {
                action: 'TRANSFORM',
                alienId: 'upgrade',
                speech: "DNA verified. Galvanic Mechamorph selected. System upgrade initiated."
            };
        }
        if (text.includes('ghostfreak') || text.includes('ghost') || text.includes('invisible') || text.includes('phase') || text.includes('ectonurite') || text.includes('spooky')) {
            return {
                action: 'TRANSFORM',
                alienId: 'ghostfreak',
                speech: "DNA verified. Ectonurite selected. Phasing through physical matter."
            };
        }
        if (text.includes('cannonbolt') || text.includes('roll') || text.includes('ball') || text.includes('sphere') || text.includes('arburian')) {
            return {
                action: 'TRANSFORM',
                alienId: 'cannonbolt',
                speech: "DNA verified. Arburian Pelarota selected. Spherical armor locked."
            };
        }
        if (text.includes('grey matter') || text.includes('greymatter') || text.includes('brain') || text.includes('smart') || text.includes('galvan') || text.includes('genius') || text.includes('azmuth')) {
            return {
                action: 'TRANSFORM',
                alienId: 'greymatter',
                speech: "DNA verified. Galvan selected. Level twenty intellect authorized."
            };
        }
        if (text.includes('ripjaws') || text.includes('rip jaws') || text.includes('water') || text.includes('ocean') || text.includes('swim') || text.includes('piscciss')) {
            return {
                action: 'TRANSFORM',
                alienId: 'ripjaws',
                speech: "DNA verified. Piscciss Volann selected. Aquatic combat mode active."
            };
        }
        if (text.includes('alien x') || text.includes('alien 10') || text.includes('reality') || text.includes('god') || text.includes('celestial') || text.includes('forge')) {
            return {
                action: 'TRANSFORM',
                alienId: 'alienx',
                speech: "Caution: Celestialsapien DNA unlocked. Motion must be carried by Belicus and Serena."
            };
        }

        // Self-Destruct commands
        if (text.includes('self destruct') || text.includes('destroy') || text.includes('destruct sequence')) {
            return {
                action: 'SELF_DESTRUCT',
                speech: "Warning! Omnitrix self-destruct sequence initiated. Thirty seconds to planetary cataclysm."
            };
        }
        if (text.includes('abort') || text.includes('cancel') || text.includes('stop self destruct') || text.includes('code 000')) {
            return {
                action: 'CANCEL_SELF_DESTRUCT',
                speech: "Self-destruct sequence aborted. Command code recognized."
            };
        }

        // DNA Scan
        if (text.includes('scan') || text.includes('dna') || text.includes('sample')) {
            return {
                action: 'SCAN_DNA',
                speech: "Yellow scanning beam engaged. Searching for uncatalogued alien DNA."
            };
        }

        // Recharge / Cooldown
        if (text.includes('recharge') || text.includes('power up') || text.includes('energy') || text.includes('restore')) {
            return {
                action: 'RECHARGE',
                speech: "Emergency Galvan power cell injected. Omnitrix core fully charged."
            };
        }

        // Master Control
        if (text.includes('master control') || text.includes('unlock all') || text.includes('azmuth code')) {
            return {
                action: 'MASTER_CONTROL',
                speech: "Voice code confirmed: Azmuth. Master Control activated. Dial timeout disabled."
            };
        }

        // Status report
        if (text.includes('status') || text.includes('report') || text.includes('battery') || text.includes('diagnostics')) {
            return {
                action: 'STATUS_REPORT',
                speech: "Omnitrix online. Firmware: Pixel Watch 5 Wear OS Galvan Edition. All 10 active DNA playlists operational."
            };
        }

        // Default: general query or unrecognized command
        return {
            action: 'CHAT',
            speech: `Gemini processed: "${text}". Omnitrix ready for alien selection.`
        };
    }

    async callGeminiAPI(userPrompt) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        const systemPrompt = `You are the Galvan Omnitrix Artificial Intelligence on Ben Tennyson's Google Pixel Watch. 
Given a voice command from Ben, decide which alien to select or which Omnitrix command to trigger.
Available aliens:
- heatblast (fire, magma, heat)
- fourarms (brute strength, punching, heavy lifting)
- xlr8 (speed, running, fast reflex)
- diamondhead (crystals, armor, shards)
- upgrade (hacking, computers, machines, vehicles)
- ghostfreak (invisibility, intangibility, fear)
- cannonbolt (rolling, bowling, bounce, shell)
- greymatter (hacking, thinking, genius, small spaces)
- ripjaws (swimming, ocean, water, biting)
- alienx (reality warping, universe creation)

Commands:
- TRANSFORM (with alienId)
- SELF_DESTRUCT
- CANCEL_SELF_DESTRUCT
- SCAN_DNA
- RECHARGE
- MASTER_CONTROL
- STATUS_REPORT

Return JSON only in this format:
{"action": "TRANSFORM", "alienId": "heatblast", "speech": "DNA locked. Pyronite ready."}`;

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: `${systemPrompt}\n\nUser command: "${userPrompt}"` }]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2
            }
        };

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return JSON.parse(text);
    }

    dispatchAction(intent) {
        console.log("[Gemini Voice Action Dispatched]:", intent);
        if (intent.speech) {
            this.speak(intent.speech);
        }
        if (this.onActionResult) {
            this.onActionResult(intent);
        }
    }

    speak(text) {
        if (!this.synth) return;
        this.synth.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find robotic/AI sounding voice if available
        const voices = this.synth.getVoices();
        const aiVoice = voices.find(v => v.name.includes('Google') || v.name.includes('David') || v.name.includes('Natural')) || voices[0];
        if (aiVoice) utterance.voice = aiVoice;

        utterance.rate = 1.05;
        utterance.pitch = 0.95; // Slightly lower pitch for Galvan computer
        this.synth.speak(utterance);
    }
}

window.GeminiVoice = new GeminiVoiceEngine();
