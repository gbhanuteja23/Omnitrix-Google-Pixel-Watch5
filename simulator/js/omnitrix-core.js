// Omnitrix Core State Machine & Pixel Watch Hardware Emulation
// Manages states, rotary input, gestures, visual feedback, and timers

const OMNITRIX_STATES = {
    IDLE: 'IDLE',                       // Standard standby watchface (Green Hourglass)
    POPPED: 'POPPED',                   // Raised dial, alien selection wheel active
    TRANSFORMING: 'TRANSFORMING',       // Neon flash & DNA surge explosion
    ACTIVE: 'ACTIVE',                   // Transformed into an alien with timer
    RECHARGE: 'RECHARGE',               // Crimson red cooldown mode
    SCAN: 'SCAN',                       // Yellow DNA scanner mode
    SELF_DESTRUCT: 'SELF_DESTRUCT',     // Amber klaxon countdown
    MASTER_CONTROL: 'MASTER_CONTROL',   // Cyan instant switching mode
    AMBIENT: 'AMBIENT'                  // Low-power Always-On Display (AOD)
};

class OmnitrixCore {
    constructor() {
        this.state = OMNITRIX_STATES.IDLE;
        this.aliens = window.ALIEN_DATABASE || [];
        this.selectedAlienIndex = 0;
        this.transformedAlien = null;
        this.masterControlUnlocked = false;

        // Timers & intervals
        this.activeTimer = null;
        this.remainingSeconds = 0;
        this.rechargeTimer = null;
        this.rechargeSeconds = 0;
        this.selfDestructTimer = null;
        this.selfDestructRemaining = 30;

        // Rotary state
        this.dialRotationDeg = 0;
        this.isDraggingCrown = false;
        this.lastDragY = 0;

        // Audio & Voice hooks
        this.audio = window.OmnitrixAudio;
        this.voice = window.GeminiVoice;
    }

    init() {
        this.bindEvents();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        this.renderAlienSelection();
        this.setState(OMNITRIX_STATES.IDLE);

        // Connect Gemini voice actions
        if (this.voice) {
            this.voice.onActionResult = (intent) => this.handleVoiceIntent(intent);
        }
    }

    bindEvents() {
        // Watch face center tap
        const corePlate = document.getElementById('omnitrix-core-plate');
        if (corePlate) {
            corePlate.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleCorePlateClick();
            });
        }

        // Rotary Crown Click
        const crownBtn = document.getElementById('pixel-crown');
        if (crownBtn) {
            crownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleCrownClick();
            });

            // Rotary Crown Mouse Wheel
            crownBtn.addEventListener('wheel', (e) => {
                e.preventDefault();
                this.rotateDial(e.deltaY > 0 ? 1 : -1);
            });

            // Rotary Crown Drag
            crownBtn.addEventListener('mousedown', (e) => {
                this.isDraggingCrown = true;
                this.lastDragY = e.clientY;
                crownBtn.classList.add('dragging');
            });
        }

        window.addEventListener('mousemove', (e) => {
            if (!this.isDraggingCrown) return;
            const deltaY = e.clientY - this.lastDragY;
            if (Math.abs(deltaY) > 12) {
                this.rotateDial(deltaY > 0 ? 1 : -1);
                this.lastDragY = e.clientY;
            }
        });

        window.addEventListener('mouseup', () => {
            if (this.isDraggingCrown) {
                this.isDraggingCrown = false;
                const crownBtn = document.getElementById('pixel-crown');
                if (crownBtn) crownBtn.classList.remove('dragging');
            }
        });

        // Watch Screen Wheel (Rotary scroll on display)
        const screenEl = document.getElementById('pixel-screen');
        if (screenEl) {
            screenEl.addEventListener('wheel', (e) => {
                if (this.state === OMNITRIX_STATES.POPPED || this.state === OMNITRIX_STATES.MASTER_CONTROL) {
                    e.preventDefault();
                    this.rotateDial(e.deltaY > 0 ? 1 : -1);
                }
            });
        }

        // Side Button (Gemini Voice trigger)
        const sideBtn = document.getElementById('pixel-side-btn');
        if (sideBtn) {
            sideBtn.addEventListener('click', () => {
                this.audio.init();
                this.voice.toggleListening();
            });
        }

        // Wrist Flick Simulator Button
        const flickBtn = document.getElementById('btn-wrist-flick');
        if (flickBtn) {
            flickBtn.addEventListener('click', () => {
                this.simulateWristFlick();
            });
        }

        // Voice Simulator text input
        const voiceSimForm = document.getElementById('voice-sim-form');
        const voiceSimInput = document.getElementById('voice-sim-input');
        if (voiceSimForm && voiceSimInput) {
            voiceSimForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const cmd = voiceSimInput.value.trim();
                if (cmd) {
                    this.audio.init();
                    this.voice.processVoiceCommand(cmd);
                    voiceSimInput.value = '';
                }
            });
        }

        // Keybindings (Arrow keys to rotate, Space to slap, Enter to pop up, V for voice)
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.rotateDial(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.rotateDial(-1);
            } else if (e.key === ' ') {
                e.preventDefault();
                this.handleCorePlateClick();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.handleCrownClick();
            } else if (e.key === 'v' || e.key === 'V') {
                this.audio.init();
                this.voice.toggleListening();
            }
        });
    }

    updateClock() {
        const timeEl = document.getElementById('pixel-watch-time');
        const dateEl = document.getElementById('pixel-watch-date');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        if (timeEl) timeEl.textContent = `${hours}:${minutes}`;
        if (dateEl) {
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
        }
    }

    handleCrownClick() {
        this.audio.init();
        if (this.state === OMNITRIX_STATES.IDLE || this.state === OMNITRIX_STATES.AMBIENT) {
            this.popUpDial();
        } else if (this.state === OMNITRIX_STATES.POPPED) {
            this.pushDownDial();
        } else if (this.state === OMNITRIX_STATES.ACTIVE) {
            // Revert back early
            this.detransform();
        } else if (this.state === OMNITRIX_STATES.RECHARGE) {
            this.audio.playTimeoutWarning();
        }
    }

    handleCorePlateClick() {
        this.audio.init();
        if (this.state === OMNITRIX_STATES.IDLE) {
            this.popUpDial();
        } else if (this.state === OMNITRIX_STATES.POPPED || this.state === OMNITRIX_STATES.MASTER_CONTROL) {
            this.slapDownTransform();
        } else if (this.state === OMNITRIX_STATES.ACTIVE) {
            // Trigger active alien's primary special power!
            this.triggerAlienPower();
        } else if (this.state === OMNITRIX_STATES.RECHARGE) {
            this.audio.playTimeoutWarning();
        }
    }

    simulateWristFlick() {
        this.audio.init();
        const watch = document.getElementById('pixel-watch-casing');
        if (watch) {
            watch.classList.add('flicking');
            setTimeout(() => watch.classList.remove('flicking'), 500);
        }

        if (this.state === OMNITRIX_STATES.IDLE) {
            this.popUpDial();
        } else if (this.state === OMNITRIX_STATES.POPPED) {
            this.slapDownTransform();
        } else if (this.state === OMNITRIX_STATES.ACTIVE) {
            // Quick alien cycle in Master Control or detransform
            if (this.masterControlUnlocked) {
                this.rotateDial(1);
                this.slapDownTransform();
            } else {
                this.detransform();
            }
        }
    }

    popUpDial() {
        if (this.state === OMNITRIX_STATES.RECHARGE) {
            this.audio.playTimeoutWarning();
            return;
        }
        this.audio.playPopUp();
        this.setState(OMNITRIX_STATES.POPPED);
    }

    pushDownDial() {
        this.audio.playDialClick();
        this.setState(OMNITRIX_STATES.IDLE);
    }

    rotateDial(direction) {
        if (this.state !== OMNITRIX_STATES.POPPED && this.state !== OMNITRIX_STATES.MASTER_CONTROL) {
            // If idle, a crown rotation also raises the dial
            if (this.state === OMNITRIX_STATES.IDLE) {
                this.popUpDial();
                return;
            }
            return;
        }

        this.selectedAlienIndex = (this.selectedAlienIndex + direction + this.aliens.length) % this.aliens.length;
        this.dialRotationDeg += direction * 36; // 360 / 10 aliens = 36 deg per step

        this.audio.playDialClick(direction);
        this.renderAlienSelection();
        this.animateDialWheel();
    }

    animateDialWheel() {
        const ring = document.getElementById('omnitrix-bezel-ring');
        if (ring) {
            ring.style.transform = `rotate(${this.dialRotationDeg}deg)`;
        }
        const crownKnob = document.getElementById('crown-texture');
        if (crownKnob) {
            crownKnob.style.transform = `rotate(${this.dialRotationDeg * 2}deg)`;
        }
    }

    renderAlienSelection() {
        const alien = this.aliens[this.selectedAlienIndex];
        if (!alien) return;

        const alienName = document.getElementById('selected-alien-name');
        const alienSpecies = document.getElementById('selected-alien-species');
        const alienHolo = document.getElementById('alien-hologram-container');
        const alienIndexBadge = document.getElementById('alien-index-badge');

        if (alienName) alienName.textContent = alien.name.toUpperCase();
        if (alienSpecies) alienSpecies.textContent = `${alien.species} • ${alien.planet}`;
        if (alienIndexBadge) alienIndexBadge.textContent = `${this.selectedAlienIndex + 1}/${this.aliens.length}`;
        if (alienHolo) {
            alienHolo.innerHTML = alien.svgSilhouette;
            alienHolo.style.filter = `drop-shadow(0 0 16px ${alien.color})`;
        }

        // Update side preview panel
        const previewImg = document.getElementById('panel-alien-svg');
        const previewName = document.getElementById('panel-alien-name');
        const previewSpecies = document.getElementById('panel-alien-species');
        const previewQuote = document.getElementById('panel-alien-quote');
        const previewAbilities = document.getElementById('panel-alien-abilities');

        if (previewImg) previewImg.innerHTML = alien.svgSilhouette;
        if (previewName) previewName.textContent = alien.name;
        if (previewSpecies) previewSpecies.textContent = `${alien.species} (${alien.planet})`;
        if (previewQuote) previewQuote.textContent = `"${alien.quote}"`;
        if (previewAbilities) {
            previewAbilities.innerHTML = alien.abilities.map(a => `<span class="ability-pill">${a}</span>`).join('');
        }
    }

    slapDownTransform() {
        const alien = this.aliens[this.selectedAlienIndex];
        this.transformedAlien = alien;
        this.audio.playSlapDown();

        this.setState(OMNITRIX_STATES.TRANSFORMING);

        // Blinding flash lasts 600ms, then reveals transformed state
        setTimeout(() => {
            this.audio.playAlienRoar(alien.soundProfile);
            this.setState(OMNITRIX_STATES.ACTIVE);
            this.startActiveCountdown(30); // 30 seconds transformation duration
        }, 650);
    }

    startActiveCountdown(seconds) {
        clearInterval(this.activeTimer);
        this.remainingSeconds = seconds;
        const totalDuration = seconds;

        this.updateActiveTimerUI(this.remainingSeconds, totalDuration);

        this.activeTimer = setInterval(() => {
            this.remainingSeconds--;
            this.updateActiveTimerUI(this.remainingSeconds, totalDuration);

            // Warning beeps in last 5 seconds
            if (this.remainingSeconds <= 5 && this.remainingSeconds > 0) {
                this.audio.playTimeoutWarning();
                const activeScreen = document.getElementById('screen-active');
                if (activeScreen) activeScreen.classList.add('flash-timeout');
            }

            if (this.remainingSeconds <= 0) {
                clearInterval(this.activeTimer);
                if (this.masterControlUnlocked) {
                    // Master control doesn't time out, reverts gently or stays
                    this.voice.speak("Master control engaged. Transformation sustained.");
                } else {
                    this.triggerRecharge();
                }
            }
        }, 1000);
    }

    updateActiveTimerUI(current, total) {
        const timerText = document.getElementById('active-timer-display');
        const timerBar = document.getElementById('active-energy-bar');
        if (timerText) {
            const m = Math.floor(current / 60);
            const s = current % 60;
            timerText.textContent = `${m}:${String(s).padStart(2, '0')}`;
        }
        if (timerBar) {
            const percent = (current / total) * 100;
            timerBar.style.width = `${percent}%`;
            if (percent < 25) {
                timerBar.style.backgroundColor = '#ff2222';
            } else {
                timerBar.style.backgroundColor = '#39ff14';
            }
        }
    }

    triggerAlienPower() {
        if (!this.transformedAlien) return;
        this.audio.playAlienRoar(this.transformedAlien.soundProfile);
        const powerFeedback = document.getElementById('power-fx-burst');
        if (powerFeedback) {
            powerFeedback.classList.remove('active');
            void powerFeedback.offsetWidth; // Trigger reflow
            powerFeedback.classList.add('active');
            setTimeout(() => powerFeedback.classList.remove('active'), 600);
        }
    }

    detransform() {
        clearInterval(this.activeTimer);
        this.audio.playSlapDown();
        if (this.masterControlUnlocked) {
            this.setState(OMNITRIX_STATES.IDLE);
        } else {
            this.triggerRecharge();
        }
    }

    triggerRecharge() {
        clearInterval(this.activeTimer);
        this.setState(OMNITRIX_STATES.RECHARGE);
        this.audio.playTimeoutWarning();

        this.rechargeSeconds = 8;
        const rechargeText = document.getElementById('recharge-countdown-text');
        if (rechargeText) rechargeText.textContent = `${this.rechargeSeconds}s`;

        clearInterval(this.rechargeTimer);
        this.rechargeTimer = setInterval(() => {
            this.rechargeSeconds--;
            if (rechargeText) rechargeText.textContent = `${this.rechargeSeconds}s`;

            if (this.rechargeSeconds <= 0) {
                clearInterval(this.rechargeTimer);
                this.audio.playRechargeDone();
                this.setState(OMNITRIX_STATES.IDLE);
            }
        }, 1000);
    }

    emergencyRecharge() {
        clearInterval(this.rechargeTimer);
        this.audio.playRechargeDone();
        this.setState(OMNITRIX_STATES.IDLE);
    }

    startSelfDestruct() {
        clearInterval(this.activeTimer);
        clearInterval(this.rechargeTimer);
        clearInterval(this.selfDestructTimer);

        this.selfDestructRemaining = 30;
        this.setState(OMNITRIX_STATES.SELF_DESTRUCT);

        this.selfDestructTimer = setInterval(() => {
            this.selfDestructRemaining--;
            const countEl = document.getElementById('sd-countdown-val');
            if (countEl) countEl.textContent = this.selfDestructRemaining;

            this.audio.playSelfDestructKlaxon();

            if (this.selfDestructRemaining <= 0) {
                clearInterval(this.selfDestructTimer);
                alert("Omnitrix Self-Destruct Expired! The entire universe has unraveled.");
                this.setState(OMNITRIX_STATES.IDLE);
            }
        }, 1000);
    }

    cancelSelfDestruct() {
        clearInterval(this.selfDestructTimer);
        this.audio.playRechargeDone();
        this.setState(OMNITRIX_STATES.IDLE);
    }

    startDnaScan() {
        this.setState(OMNITRIX_STATES.SCAN);
        this.audio.playDnaScan();
        setTimeout(() => {
            this.audio.playRechargeDone();
            this.voice.speak("Scan complete. New uncatalogued alien DNA acquired. Added to active playlist.");
            this.setState(OMNITRIX_STATES.IDLE);
        }, 4000);
    }

    toggleMasterControl() {
        this.masterControlUnlocked = !this.masterControlUnlocked;
        const badge = document.getElementById('master-control-badge');
        if (badge) badge.style.display = this.masterControlUnlocked ? 'inline-block' : 'none';
        if (this.masterControlUnlocked) {
            this.setState(OMNITRIX_STATES.MASTER_CONTROL);
            this.voice.speak("Master Control active. Dial restriction lifted.");
        } else {
            this.setState(OMNITRIX_STATES.IDLE);
            this.voice.speak("Master Control disabled.");
        }
    }

    toggleAmbientMode() {
        if (this.state === OMNITRIX_STATES.AMBIENT) {
            this.setState(OMNITRIX_STATES.IDLE);
        } else {
            this.setState(OMNITRIX_STATES.AMBIENT);
        }
    }

    handleVoiceIntent(intent) {
        if (!intent || !intent.action) return;

        switch (intent.action) {
            case 'TRANSFORM':
                if (intent.alienId) {
                    const idx = this.aliens.findIndex(a => a.id === intent.alienId);
                    if (idx !== -1) {
                        this.selectedAlienIndex = idx;
                        this.renderAlienSelection();
                        this.animateDialWheel();
                        this.popUpDial();
                        setTimeout(() => this.slapDownTransform(), 700);
                    }
                }
                break;
            case 'SELF_DESTRUCT':
                this.startSelfDestruct();
                break;
            case 'CANCEL_SELF_DESTRUCT':
                this.cancelSelfDestruct();
                break;
            case 'SCAN_DNA':
                this.startDnaScan();
                break;
            case 'RECHARGE':
                this.emergencyRecharge();
                break;
            case 'MASTER_CONTROL':
                this.toggleMasterControl();
                break;
            case 'STATUS_REPORT':
                // Handled in voice
                break;
            default:
                break;
        }
    }

    setState(newState) {
        this.state = newState;
        const casing = document.getElementById('pixel-watch-casing');
        const stateScreens = document.querySelectorAll('.watch-screen-view');
        stateScreens.forEach(s => s.classList.remove('active'));

        if (casing) {
            casing.classList.remove(
                'state-idle', 'state-popped', 'state-transforming', 
                'state-active', 'state-recharge', 'state-scan', 
                'state-self-destruct', 'state-master-control', 'state-ambient'
            );
        }

        const stateLabel = document.getElementById('current-state-badge');
        if (stateLabel) stateLabel.textContent = newState;

        switch (newState) {
            case OMNITRIX_STATES.IDLE:
                casing?.classList.add('state-idle');
                document.getElementById('screen-idle')?.classList.add('active');
                break;

            case OMNITRIX_STATES.POPPED:
                casing?.classList.add('state-popped');
                document.getElementById('screen-selector')?.classList.add('active');
                this.renderAlienSelection();
                break;

            case OMNITRIX_STATES.TRANSFORMING:
                casing?.classList.add('state-transforming');
                document.getElementById('screen-transform')?.classList.add('active');
                break;

            case OMNITRIX_STATES.ACTIVE:
                casing?.classList.add('state-active');
                document.getElementById('screen-active')?.classList.add('active');
                this.renderActiveScreen();
                break;

            case OMNITRIX_STATES.RECHARGE:
                casing?.classList.add('state-recharge');
                document.getElementById('screen-recharge')?.classList.add('active');
                break;

            case OMNITRIX_STATES.SCAN:
                casing?.classList.add('state-scan');
                document.getElementById('screen-scan')?.classList.add('active');
                break;

            case OMNITRIX_STATES.SELF_DESTRUCT:
                casing?.classList.add('state-self-destruct');
                document.getElementById('screen-self-destruct')?.classList.add('active');
                break;

            case OMNITRIX_STATES.MASTER_CONTROL:
                casing?.classList.add('state-master-control');
                document.getElementById('screen-selector')?.classList.add('active');
                this.renderAlienSelection();
                break;

            case OMNITRIX_STATES.AMBIENT:
                casing?.classList.add('state-ambient');
                document.getElementById('screen-ambient')?.classList.add('active');
                break;
        }
    }

    renderActiveScreen() {
        if (!this.transformedAlien) return;
        const a = this.transformedAlien;

        const title = document.getElementById('active-alien-name');
        const icon = document.getElementById('active-alien-avatar');
        const quote = document.getElementById('active-alien-quote');
        const stats = document.getElementById('active-alien-stats');

        if (title) {
            title.textContent = a.name.toUpperCase();
            title.style.color = a.color;
            title.style.textShadow = `0 0 10px ${a.color}`;
        }
        if (icon) {
            icon.innerHTML = a.svgSilhouette;
            icon.style.filter = `drop-shadow(0 0 20px ${a.color})`;
        }
        if (quote) quote.textContent = `"${a.quote}"`;
        if (stats) {
            stats.innerHTML = `
                <div class="stat-mini"><span>STR</span><div class="bar"><div style="width:${a.stats.strength}%; background:${a.color}"></div></div></div>
                <div class="stat-mini"><span>SPD</span><div class="bar"><div style="width:${a.stats.speed}%; background:${a.color}"></div></div></div>
                <div class="stat-mini"><span>PWR</span><div class="bar"><div style="width:${a.stats.firepower}%; background:${a.color}"></div></div></div>
                <div class="stat-mini"><span>DEF</span><div class="bar"><div style="width:${a.stats.defense}%; background:${a.color}"></div></div></div>
            `;
        }
    }
}

window.Omnitrix = new OmnitrixCore();
document.addEventListener('DOMContentLoaded', () => {
    window.Omnitrix.init();
});
