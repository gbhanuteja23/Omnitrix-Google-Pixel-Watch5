# ⌚ Omnitrix for Google Pixel Watch (Wear OS) & Interactive Simulator

> **Level 20 Galvan Technology** powered by **Gemini AI** and engineered specifically for the circular AMOLED display, rotating digital crown, and motion sensors of the **Google Pixel Watch 5**.

---

## 🌟 Overview

This repository contains two complete components:
1. **Interactive Pixel Watch 5 Omnitrix Simulator**: An ultra-realistic browser-based hardware emulator that runs immediately in **VS Code** or your browser without requiring any heavy runtimes or emulators. Experience the circular watch face, rotating digital crown, sound synthesis, wrist flick gestures, and **Gemini Voice-to-Action**.
2. **Native Wear OS Android Project (`android-wearos/`)**: A native Kotlin + Jetpack Compose for Wear OS app ready to be compiled and installed on your Google Pixel Watch as soon as it arrives!

---

## 🚀 Part 1: Quickstart the Simulator in VS Code

You can test the entire Omnitrix experience immediately on your PC:

### Option A: From VS Code (Recommended)
1. In VS Code, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> (Run Build Task).
2. Select **`Omnitrix: Start Simulator & Open Browser`**.
3. Your browser will automatically open to `http://localhost:8080/`.

### Option B: From File Explorer
- Simply double-click [`simulator/start-simulator.bat`](file:///d:/1-Projects/0-Omnitrix-Google-Pixel-Watch5/simulator/start-simulator.bat).

### Option C: From Terminal
```powershell
powershell -ExecutionPolicy Bypass -File simulator\serve.ps1
```

---

## 🎮 How to Control the Omnitrix Simulator

| Action | How to do it | Description |
| :--- | :--- | :--- |
| **Pop Up Dial** | Click center face or press <kbd>Enter</kbd> | The Omnitrix dial springs up into 3D alien selection mode. |
| **Turn Crown / Cycle Aliens** | Scroll mouse wheel or drag the Crown at 3 o'clock | Turns the digital crown with authentic ratchet clicks. |
| **Slap Down / Transform** | Click center dial or press <kbd>Space</kbd> | Triggers the iconic green plasma flash and transforms into the selected alien! |
| **Use Alien Power** | Tap the transformed alien avatar | Unleashes the alien's signature sound & attack effect. |
| **Wrist Flick Gesture** | Click **"👋 Flick Wrist"** button | Simulates the watch accelerometer flicking to wake/transform. |
| **Speak to Gemini** | Click **"🎤 Speak"**, side button, or press <kbd>V</kbd> | Opens the Gemini voice listener for natural language commands. |
| **Ambient Display (AOD)** | Click **"🌙 Ambient AOD"** | Activates the low-power AMOLED Always-On Display. |

---

## 🎙️ Gemini Voice-to-Action Commands

The built-in Gemini AI engine recognizes both direct names and **natural language situational intents**:

### 1. Natural Language Intent Commands
* *"Gemini, I need fire power!"* ➔ **Transforms into Heatblast**
* *"I need to run to the station in 30 seconds!"* ➔ **Transforms into XLR8**
* *"Someone is trapped under heavy rubble!"* ➔ **Transforms into Four Arms**
* *"Help me hack and upgrade this computer!"* ➔ **Transforms into Upgrade**
* *"Make me invisible, I need to sneak past!"* ➔ **Transforms into Ghostfreak**
* *"I need an impenetrable diamond shield!"* ➔ **Transforms into Diamondhead**
* *"Roll out and ram the obstacle!"* ➔ **Transforms into Cannonbolt**
* *"I'm underwater, help!"* ➔ **Transforms into Ripjaws**
* *"Analyze this alien tech, Azmuth!"* ➔ **Transforms into Grey Matter**
* *"Rewrite reality!"* ➔ **Unlocks Alien X**

### 2. Omnitrix System Commands
* *"Omnitrix, activate self destruct code 10"* ➔ Starts 30s emergency countdown with warning sirens.
* *"Abort self destruct sequence"* ➔ Cancels self-destruct and restores core.
* *"Scan alien DNA"* ➔ Engages yellow radar beam to sample environmental DNA.
* *"Emergency recharge"* ➔ Injects instant power to bypass cooldown timer.
* *"Activate Master Control"* ➔ Removes timeout and dial lock restrictions.
* *"Omnitrix status report"* ➔ Galvan AI speaks diagnostics via speech synthesis.

*(Optional)* You can connect your own Google Gemini API key by clicking **⚙️ Gemini API** in the header to enable conversational AI answering!

---

## 👽 10 Classic Playlists + Alien X Included

1. **Heatblast** (*Pyronite / Pyros*) - Fire manipulation, magma propulsion.
2. **Four Arms** (*Tetramand / Khoros*) - Superhuman strength, sonic thunderclap.
3. **XLR8** (*Kineceleran / Kinet*) - Frictionless hyper-speed, vortex generation.
4. **Diamondhead** (*Petrosapien / Petropia*) - Petrosapien crystal shards, diamond armor.
5. **Upgrade** (*Galvanic Mechamorph / Galvan B*) - Techno-organic merging, optical laser.
6. **Ghostfreak** (*Ectonurite / Anur Phaetos*) - Phasing, intangibility, invisibility.
7. **Cannonbolt** (*Arburian Pelarota / Arburia*) - Kinetic armored rolling sphere.
8. **Wildmutt** (*Vulpimancer / Vulpin*) - Scent tracking, supersonic senses.
9. **Ripjaws** (*Piscciss Volann / Piscciss*) - Steel-crushing jaws, aquatic combat.
10. **Grey Matter** (*Galvan / Galvan Prime*) - Level 20 intellect, technology intuitive.
11. **Alien X** (*Celestialsapien / Forge of Creation*) - Reality warping omnipotence.

---

## ⌚ Part 2: Installing on Your Google Pixel Watch (When it Arrives)

When your Google Pixel Watch arrives in 1-2 days, follow these steps to install the app onto your wrist:

### Step 1: Enable Developer Options on Pixel Watch
1. On your Pixel Watch, open **Settings** ➔ **System** ➔ **About**.
2. Scroll to **Build number** and tap it **7 times** until you see *"You are now a developer!"*.
3. Go back to **Settings** ➔ **Developer options**.
4. Enable **ADB debugging** and **Wireless debugging**.
5. Connect your watch and your PC to the **same Wi-Fi network**.
6. Note the IP address and port displayed under *Wireless debugging* (e.g., `192.168.1.50:5555`).

### Step 2: Connect PC to Pixel Watch
In VS Code, run the preconfigured task:
- Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> ➔ **`Tasks: Run Task`** ➔ **`Wear OS: Connect Pixel Watch over Wireless ADB`**.
- Or via terminal:
```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" connect <YOUR-WATCH-IP>:5555
```

### Step 3: Build & Install the APK
Open the `android-wearos` folder in Android Studio (or run gradle from terminal) and build the debug APK, then run:
```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" install -r android-wearos\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📁 Project Architecture

```
0-Omnitrix-Google-Pixel-Watch5/
├── simulator/                      # Interactive Pixel Watch 5 Simulator
│   ├── index.html                  # 3D Pixel Watch chassis & AMOLED display
│   ├── css/omnitrix.css            # Domed glass, glowing core, animations
│   ├── js/
│   │   ├── aliens-data.js          # Vector silhouettes, lore, stats, abilities
│   │   ├── audio-engine.js         # Procedural Web Audio API sound synthesizer
│   │   ├── gemini-voice.js         # Web Speech Recognition + Gemini AI Intent Engine
│   │   └── omnitrix-core.js        # State machine, rotary crown & gestures
│   ├── serve.ps1                   # Zero-dependency local server with Web Audio support
│   └── start-simulator.bat         # 1-click batch launcher
├── android-wearos/                 # Native Wear OS Kotlin App
│   ├── app/
│   │   ├── build.gradle.kts        # Wear Compose 1.4 + Gemini AI SDK
│   │   └── src/main/
│   │       ├── AndroidManifest.xml # Wearable standalone manifest & permissions
│   │       └── java/com/omnitrix/pixelwatch/
│   │           ├── MainActivity.kt               # Rotary crown & lifecycle handler
│   │           ├── audio/OmnitrixSoundPlayer.kt  # Procedural PCM audio & haptics
│   │           ├── sensors/WristGestureDetector.kt # Accelerometer flick detection
│   │           ├── voice/GeminiVoiceManager.kt   # SpeechRecognizer + Gemini SDK
│   │           ├── model/Alien.kt & OmnitrixState.kt
│   │           └── presentation/
│   │               ├── theme/                    # Galvan AMOLED dark theme
│   │               ├── components/OmnitrixDial.kt# Rotating bezel & hourglass canvas
│   │               └── screens/OmnitrixMainScreen.kt
│   ├── build.gradle.kts
│   └── settings.gradle.kts
├── .vscode/
│   ├── tasks.json                  # One-click simulator & ADB deploy tasks
│   ├── launch.json                 # Debug configuration
│   └── settings.json
└── README.md
```
