// Omnitrix Alien Database - Level 20 Galvan Technology
window.ALIEN_DATABASE = [
    {
        id: 'heatblast',
        name: 'Heatblast',
        species: 'Pyronite',
        planet: 'Pyros',
        element: 'Fire / Magma',
        color: '#ff5500',
        glowColor: 'rgba(255, 85, 0, 0.8)',
        quote: "It's hero time! Let's turn up the heat!",
        abilities: ['Pyrokinesis', 'Fire Blasts', 'Flight via Propulsion', 'Heat Absorption'],
        stats: { strength: 75, speed: 65, firepower: 95, defense: 80 },
        soundProfile: 'fire',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <defs>
                    <radialGradient id="heatGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fffb00" />
                        <stop offset="60%" stop-color="#ff4400" />
                        <stop offset="100%" stop-color="#800000" stop-opacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ff5500" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
                <!-- Flame Head -->
                <path d="M50 12 C44 24 38 28 38 38 C38 48 45 52 50 52 C55 52 62 48 62 38 C62 28 56 24 50 12 Z" fill="#ffaa00" />
                <path d="M50 18 C46 26 42 30 42 38 C42 45 47 48 50 48 C53 48 58 45 58 38 C58 30 54 26 50 18 Z" fill="#ffff66" />
                <!-- Magma Face Features -->
                <ellipse cx="46" cy="38" rx="2" ry="3" fill="#111" />
                <ellipse cx="54" cy="38" rx="2" ry="3" fill="#111" />
                <!-- Body Rock Plates -->
                <path d="M42 53 L32 60 L35 78 L45 88 L55 88 L65 78 L68 60 L58 53 Z" fill="#3a1c0d" stroke="#ff6600" stroke-width="2"/>
                <path d="M50 54 L44 68 L50 78 L56 68 Z" fill="#ff6600" />
                <!-- Shoulder magma boulders -->
                <circle cx="28" cy="62" r="7" fill="#4d1b06" stroke="#ff7700" stroke-width="1.5" />
                <circle cx="72" cy="62" r="7" fill="#4d1b06" stroke="#ff7700" stroke-width="1.5" />
                <!-- Flaming sparks -->
                <circle cx="50" cy="8" r="1.5" fill="#fff" />
                <circle cx="34" cy="22" r="2" fill="#ff7700" />
                <circle cx="66" cy="22" r="2" fill="#ff7700" />
            </svg>
        `
    },
    {
        id: 'fourarms',
        name: 'Four Arms',
        species: 'Tetramand',
        planet: 'Khoros',
        element: 'Brute Strength',
        color: '#d62222',
        glowColor: 'rgba(214, 34, 34, 0.8)',
        quote: "Time to smash some heads together!",
        abilities: ['Superhuman Strength', 'Sonic Clap', 'High-Density Muscle', 'Enormous Leaps'],
        stats: { strength: 100, speed: 50, firepower: 40, defense: 95 },
        soundProfile: 'clap',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#d62222" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.6"/>
                <!-- Tetramand Head & 4 Eyes -->
                <ellipse cx="50" cy="30" rx="14" ry="12" fill="#b81616" stroke="#222" stroke-width="1.5"/>
                <!-- 4 Yellow Eyes -->
                <ellipse cx="44" cy="26" rx="2" ry="1.5" fill="#ffe600" />
                <ellipse cx="56" cy="26" rx="2" ry="1.5" fill="#ffe600" />
                <ellipse cx="44" cy="32" rx="2.5" ry="2" fill="#ffe600" />
                <ellipse cx="56" cy="32" rx="2.5" ry="2" fill="#ffe600" />
                <!-- Black stripe on head -->
                <path d="M50 18 L50 42" stroke="#111" stroke-width="3" />
                <!-- Huge Muscular Torso -->
                <path d="M30 42 L70 42 L65 72 L50 82 L35 72 Z" fill="#b81616" stroke="#111" stroke-width="2"/>
                <path d="M50 42 L50 82" stroke="#fff" stroke-width="4"/>
                <!-- Upper Dual Arms -->
                <path d="M30 44 Q14 36 10 50 Q16 62 26 56" fill="#b81616" stroke="#111" stroke-width="1.5"/>
                <path d="M70 44 Q86 36 90 50 Q84 62 74 56" fill="#b81616" stroke="#111" stroke-width="1.5"/>
                <!-- Lower Dual Arms -->
                <path d="M32 58 Q16 64 14 76 Q22 84 30 74" fill="#990f0f" stroke="#111" stroke-width="1.5"/>
                <path d="M68 58 Q84 64 86 76 Q78 84 70 74" fill="#990f0f" stroke="#111" stroke-width="1.5"/>
            </svg>
        `
    },
    {
        id: 'xlr8',
        name: 'XLR8',
        species: 'Kineceleran',
        planet: 'Kinet',
        element: 'Hyper Speed',
        color: '#00d4ff',
        glowColor: 'rgba(0, 212, 255, 0.8)',
        quote: "Blink and you missed me!",
        abilities: ['Frictionless Speed', 'Reflex Acceleration', 'Scissor Claws', 'Vortex Creation'],
        stats: { strength: 40, speed: 100, firepower: 30, defense: 60 },
        soundProfile: 'speed',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
                <!-- Sleek Aerodynamic Helmet -->
                <path d="M32 40 Q50 14 74 26 Q78 36 64 48 Q46 54 32 40 Z" fill="#111827" stroke="#00d4ff" stroke-width="1.5"/>
                <!-- Visor Cyan Stripe -->
                <path d="M46 32 Q62 26 70 34" stroke="#00e5ff" stroke-width="3" stroke-linecap="round"/>
                <!-- Slender Body -->
                <path d="M48 48 L56 68 L48 85 L44 68 Z" fill="#00d4ff" stroke="#0f172a" stroke-width="1.5"/>
                <path d="M42 46 L58 46 L54 62 L46 62 Z" fill="#111" />
                <!-- Speed Tail -->
                <path d="M48 82 Q28 86 16 94 Q24 78 46 72" fill="#111" stroke="#00d4ff" stroke-width="1"/>
                <!-- Spherical Wheel Feet Indicator -->
                <circle cx="48" cy="90" r="4" fill="#111" stroke="#00e5ff" stroke-width="2"/>
                <!-- Speed trail streaks -->
                <line x1="15" y1="36" x2="30" y2="38" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
                <line x1="10" y1="50" x2="32" y2="52" stroke="#00d4ff" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
                <line x1="18" y1="64" x2="36" y2="64" stroke="#00d4ff" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
            </svg>
        `
    },
    {
        id: 'diamondhead',
        name: 'Diamondhead',
        species: 'Petrosapien',
        planet: 'Petropia',
        element: 'Crystalline Armor',
        color: '#00ffa2',
        glowColor: 'rgba(0, 255, 162, 0.8)',
        quote: "Unbreakable and razor sharp!",
        abilities: ['Crystal Generation', 'Laser Redirection', 'Regeneration', 'Blade Constructs'],
        stats: { strength: 80, speed: 50, firepower: 85, defense: 100 },
        soundProfile: 'crystal',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#00ffa2" stroke-width="1.5" stroke-dasharray="6 2" opacity="0.6"/>
                <!-- Crystal Shard Crown / Crest -->
                <polygon points="50,14 42,34 50,28 58,34" fill="#29e39b" stroke="#005234" stroke-width="1"/>
                <polygon points="32,24 40,38 34,42 26,30" fill="#1ac784" stroke="#005234" stroke-width="1"/>
                <polygon points="68,24 74,30 66,42 60,38" fill="#1ac784" stroke="#005234" stroke-width="1"/>
                <!-- Petrosapien Face -->
                <polygon points="40,36 60,36 56,54 50,58 44,54" fill="#20bf80" stroke="#111" stroke-width="1.5"/>
                <!-- Yellow eye -->
                <polygon points="46,42 54,42 50,46" fill="#ffea00" />
                <!-- Crystalline Torso (Black/Cyan Uniform) -->
                <polygon points="34,54 66,54 60,86 40,86" fill="#111" stroke="#00ffa2" stroke-width="1.5"/>
                <polygon points="50,54 44,72 50,86 56,72" fill="#00ffa2" />
                <!-- Back Crystal Spikes -->
                <polygon points="24,46 12,38 28,58" fill="#52ffbe" opacity="0.9"/>
                <polygon points="76,46 88,38 72,58" fill="#52ffbe" opacity="0.9"/>
            </svg>
        `
    },
    {
        id: 'upgrade',
        name: 'Upgrade',
        species: 'Galvanic Mechamorph',
        planet: 'Galvan B',
        element: 'Technopathy',
        color: '#39ff14',
        glowColor: 'rgba(57, 255, 20, 0.8)',
        quote: "Upgraded and online. System override initiated.",
        abilities: ['Technological Merging', 'Nanotech Morphing', 'Optic Laser', 'Liquid Metal Body'],
        stats: { strength: 65, speed: 70, firepower: 90, defense: 85 },
        soundProfile: 'tech',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#39ff14" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.6"/>
                <!-- Fluid Morphic Head -->
                <path d="M38 28 C38 18 62 18 62 28 C62 38 58 46 50 46 C42 46 38 38 38 28 Z" fill="#121212" stroke="#39ff14" stroke-width="2"/>
                <!-- Single Glowing Optic Eye -->
                <circle cx="50" cy="30" r="7" fill="#080808" stroke="#39ff14" stroke-width="2.5" />
                <circle cx="50" cy="30" r="3" fill="#39ff14" />
                <!-- Circuit-board lines -->
                <path d="M50 37 L50 78" stroke="#39ff14" stroke-width="2" />
                <path d="M50 50 L36 58 L36 72" stroke="#39ff14" stroke-width="1.5" fill="none" />
                <path d="M50 50 L64 58 L64 72" stroke="#39ff14" stroke-width="1.5" fill="none" />
                <circle cx="36" cy="72" r="2" fill="#39ff14" />
                <circle cx="64" cy="72" r="2" fill="#39ff14" />
                <!-- Liquid Torso Silhouette -->
                <path d="M34 46 Q24 60 30 76 Q42 86 50 86 Q58 86 70 76 Q76 60 66 46 Z" fill="#1c1c1c" stroke="#39ff14" stroke-width="1.5" opacity="0.9"/>
                <!-- Front Omnitrix Circle -->
                <circle cx="50" cy="62" r="5" fill="#39ff14" opacity="0.8"/>
            </svg>
        `
    },
    {
        id: 'ghostfreak',
        name: 'Ghostfreak',
        species: 'Ectonurite',
        planet: 'Anur Phaetos',
        element: 'Spectral Void',
        color: '#b39ddb',
        glowColor: 'rgba(179, 157, 219, 0.8)',
        quote: "You can't hit what you can't touch...",
        abilities: ['Intangibility', 'Invisibility', 'Tentacle Manifestation', 'Telekinesis'],
        stats: { strength: 40, speed: 75, firepower: 70, defense: 95 },
        soundProfile: 'ghost',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#b39ddb" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>
                <!-- Ghostly Wisp Head -->
                <path d="M50 14 C36 14 32 30 36 44 C40 54 44 62 40 76 C38 82 44 88 50 86 C56 88 62 82 60 76 C56 62 60 54 64 44 C68 30 64 14 50 14 Z" 
                      fill="#e0e0e0" stroke="#7e57c2" stroke-width="1.5" opacity="0.95"/>
                <!-- Slanted Eye Track -->
                <path d="M38 30 Q50 38 62 44" stroke="#222" stroke-width="3" stroke-linecap="round" fill="none"/>
                <!-- Moving Purple Eye -->
                <circle cx="48" cy="37" r="3.5" fill="#9c27b0" stroke="#fff" stroke-width="1"/>
                <circle cx="48" cy="37" r="1.5" fill="#000" />
                <!-- Ghost trails and claws -->
                <path d="M34 50 Q20 54 22 66 Q26 70 34 60" fill="#d1c4e9" stroke="#7e57c2" stroke-width="1"/>
                <path d="M66 50 Q80 54 78 66 Q74 70 66 60" fill="#d1c4e9" stroke="#7e57c2" stroke-width="1"/>
            </svg>
        `
    },
    {
        id: 'cannonbolt',
        name: 'Cannonbolt',
        species: 'Arburian Pelarota',
        planet: 'Arburia',
        element: 'Kinetic Armor',
        color: '#ffcc00',
        glowColor: 'rgba(255, 204, 0, 0.8)',
        quote: "Time to roll out!",
        abilities: ['Armored Sphere Mode', 'Kinetic Impact', 'Chemical Immunity', 'Ricochet Attack'],
        stats: { strength: 85, speed: 90, firepower: 20, defense: 100 },
        soundProfile: 'roll',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ffcc00" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.6"/>
                <!-- Huge Armored Back Plates -->
                <path d="M24 38 Q50 16 76 38 Q82 68 70 82 Q50 90 30 82 Q18 68 24 38 Z" fill="#fff" stroke="#111" stroke-width="2"/>
                <!-- Yellow Shield Segments -->
                <path d="M28 40 Q50 24 72 40 Q76 56 72 64 Q50 72 28 64 Z" fill="#ffb300" stroke="#b27b00" stroke-width="1.5"/>
                <!-- Face -->
                <ellipse cx="50" cy="46" rx="14" ry="10" fill="#111" />
                <circle cx="44" cy="46" r="2.5" fill="#ffea00" />
                <circle cx="56" cy="46" r="2.5" fill="#ffea00" />
                <!-- Claw plates -->
                <circle cx="22" cy="62" r="6" fill="#ffb300" stroke="#111" stroke-width="1.5"/>
                <circle cx="78" cy="62" r="6" fill="#ffb300" stroke="#111" stroke-width="1.5"/>
            </svg>
        `
    },
    {
        id: 'greymatter',
        name: 'Grey Matter',
        species: 'Galvan',
        planet: 'Galvan Prime',
        element: 'Supreme Intellect',
        color: '#a3e635',
        glowColor: 'rgba(163, 230, 53, 0.8)',
        quote: "Technically, your strategy has a 99.8% failure rate.",
        abilities: ['Level 20 Intellect', 'Technological Intuition', 'Wall Crawling', 'Weakpoint Analysis'],
        stats: { strength: 15, speed: 60, firepower: 45, defense: 30 },
        soundProfile: 'intellect',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#a3e635" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.6"/>
                <!-- Large Bulbous Galvan Head -->
                <ellipse cx="50" cy="36" rx="24" ry="18" fill="#78909c" stroke="#263238" stroke-width="2"/>
                <!-- Large Frog Eyes -->
                <ellipse cx="34" cy="30" rx="9" ry="8" fill="#a3e635" stroke="#111" stroke-width="2"/>
                <ellipse cx="66" cy="30" rx="9" ry="8" fill="#a3e635" stroke="#111" stroke-width="2"/>
                <!-- Rectangular horizontal pupils -->
                <rect x="29" y="29" width="10" height="2.5" rx="1" fill="#000" />
                <rect x="61" y="29" width="10" height="2.5" rx="1" fill="#000" />
                <!-- Slender Small Body -->
                <path d="M44 54 L44 76 L56 76 L56 54 Z" fill="#111" stroke="#a3e635" stroke-width="1.5"/>
                <line x1="50" y1="54" x2="50" y2="76" stroke="#fff" stroke-width="2" />
                <!-- Tiny webbed hands -->
                <circle cx="34" cy="62" r="3" fill="#78909c" />
                <circle cx="66" cy="62" r="3" fill="#78909c" />
            </svg>
        `
    },
    {
        id: 'ripjaws',
        name: 'Ripjaws',
        species: 'Piscciss Volann',
        planet: 'Piscciss',
        element: 'Ocean Predator',
        color: '#06b6d4',
        glowColor: 'rgba(6, 182, 212, 0.8)',
        quote: "Time to take a bite out of crime!",
        abilities: ['Steel-Crushing Jaws', 'Underwater Breathing', 'Tail Fin Propulsion', 'Luminescent Lure'],
        stats: { strength: 75, speed: 90, firepower: 30, defense: 70 },
        soundProfile: 'sonar',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
                <!-- Angler Light Lure -->
                <path d="M50 20 Q56 8 62 14" stroke="#06b6d4" stroke-width="2" fill="none"/>
                <circle cx="63" cy="14" r="3.5" fill="#67e8f9" stroke="#fff" stroke-width="1"/>
                <!-- Ferocious Jaw Head -->
                <path d="M34 26 C34 18 66 18 66 26 C66 36 62 44 50 44 C38 44 34 36 34 26 Z" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5"/>
                <!-- Huge Shark/Piranha Jaw -->
                <path d="M30 38 Q50 56 70 38 Q50 62 30 38 Z" fill="#334155" stroke="#e2e8f0" stroke-width="1.5"/>
                <!-- Razor Teeth -->
                <polygon points="36,41 40,46 44,42 48,47 52,42 56,47 60,42 64,45" fill="#fff" />
                <!-- Black Eyes -->
                <circle cx="40" cy="30" r="3" fill="#111" />
                <circle cx="60" cy="30" r="3" fill="#111" />
                <!-- Fish Fin Body -->
                <path d="M42 48 L32 78 L50 88 L68 78 L58 48 Z" fill="#0f766e" stroke="#06b6d4" stroke-width="1.5"/>
            </svg>
        `
    },
    {
        id: 'alienx',
        name: 'Alien X',
        species: 'Celestialsapien',
        planet: 'Forge of Creation',
        element: 'Reality Warping',
        color: '#c084fc',
        glowColor: 'rgba(192, 132, 252, 0.95)',
        quote: "Motion carried. Reality has been rewritten.",
        abilities: ['Omnipotence', 'Time & Space Alteration', 'Invulnerability', 'Cosmic Creation'],
        stats: { strength: 100, speed: 100, firepower: 100, defense: 100 },
        soundProfile: 'cosmic',
        svgSilhouette: `
            <svg viewBox="0 0 100 100" class="alien-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#c084fc" stroke-width="2" stroke-dasharray="1 3" opacity="0.8"/>
                <!-- 3 Celestialsapien Horns -->
                <polygon points="50,10 46,26 54,26" fill="#fff" />
                <polygon points="34,16 40,30 34,32" fill="#fff" />
                <polygon points="66,16 66,32 60,30" fill="#fff" />
                <!-- Deep Space Silhouette with Constellation Stars -->
                <path d="M34 32 C34 22 66 22 66 32 C66 42 60 48 50 48 C40 48 34 42 34 32 Z" fill="#040209" stroke="#c084fc" stroke-width="1.5"/>
                <!-- Green Glowing Eyes -->
                <ellipse cx="44" cy="34" rx="2.5" ry="1.5" fill="#39ff14" />
                <ellipse cx="56" cy="34" rx="2.5" ry="1.5" fill="#39ff14" />
                <!-- Torso with Constellation Starlight -->
                <path d="M38 48 L30 76 L50 88 L70 76 L62 48 Z" fill="#040209" stroke="#818cf8" stroke-width="1.5"/>
                <!-- Embedded Stars -->
                <circle cx="48" cy="54" r="1.5" fill="#fff" />
                <circle cx="58" cy="60" r="1.2" fill="#e0e7ff" />
                <circle cx="40" cy="66" r="1.8" fill="#fff" />
                <circle cx="52" cy="74" r="1.4" fill="#a5b4fc" />
                <circle cx="62" cy="70" r="1" fill="#fff" />
                <line x1="48" y1="54" x2="58" y2="60" stroke="#818cf8" stroke-width="0.7" opacity="0.7"/>
                <line x1="40" y1="66" x2="52" y2="74" stroke="#818cf8" stroke-width="0.7" opacity="0.7"/>
            </svg>
        `
    }
];
