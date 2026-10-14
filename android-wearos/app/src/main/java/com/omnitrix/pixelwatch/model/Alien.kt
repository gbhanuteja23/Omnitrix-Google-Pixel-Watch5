package com.omnitrix.pixelwatch.model

import androidx.compose.ui.graphics.Color

data class Alien(
    val id: String,
    val name: String,
    val species: String,
    val planet: String,
    val quote: String,
    val color: Color,
    val abilities: List<String>,
    val strength: Int,
    val speed: Int,
    val defense: Int
)

object AlienRoster {
    val aliens = listOf(
        Alien(
            id = "heatblast",
            name = "Heatblast",
            species = "Pyronite",
            planet = "Pyros",
            quote = "Let's turn up the heat!",
            color = Color(0xFFFF5500),
            abilities = listOf("Pyrokinesis", "Fire Blasts", "Flight"),
            strength = 75,
            speed = 65,
            defense = 80
        ),
        Alien(
            id = "fourarms",
            name = "Four Arms",
            species = "Tetramand",
            planet = "Khoros",
            quote = "Time to smash!",
            color = Color(0xFFD62222),
            abilities = listOf("Super Strength", "Sonic Clap", "Leaping"),
            strength = 100,
            speed = 50,
            defense = 95
        ),
        Alien(
            id = "xlr8",
            name = "XLR8",
            species = "Kineceleran",
            planet = "Kinet",
            quote = "Blink and you missed me!",
            color = Color(0xFF00D4FF),
            abilities = listOf("Hyper Speed", "Frictionless Surface", "Reflexes"),
            strength = 40,
            speed = 100,
            defense = 60
        ),
        Alien(
            id = "diamondhead",
            name = "Diamondhead",
            species = "Petrosapien",
            planet = "Petropia",
            quote = "Unbreakable and razor sharp!",
            color = Color(0xFF00FFA2),
            abilities = listOf("Crystal Shards", "Armor", "Laser Reflection"),
            strength = 80,
            speed = 50,
            defense = 100
        ),
        Alien(
            id = "upgrade",
            name = "Upgrade",
            species = "Galvanic Mechamorph",
            planet = "Galvan B",
            quote = "System upgrade initiated.",
            color = Color(0xFF39FF14),
            abilities = listOf("Tech Merging", "Nanotech", "Optic Laser"),
            strength = 65,
            speed = 70,
            defense = 85
        ),
        Alien(
            id = "ghostfreak",
            name = "Ghostfreak",
            species = "Ectonurite",
            planet = "Anur Phaetos",
            quote = "You cannot touch me...",
            color = Color(0xFFB39DDB),
            abilities = listOf("Intangibility", "Invisibility", "Tentacles"),
            strength = 40,
            speed = 75,
            defense = 95
        ),
        Alien(
            id = "cannonbolt",
            name = "Cannonbolt",
            species = "Arburian Pelarota",
            planet = "Arburia",
            quote = "Time to roll out!",
            color = Color(0xFFFFCC00),
            abilities = listOf("Armored Sphere", "Kinetic Force", "Ricochet"),
            strength = 85,
            speed = 90,
            defense = 100
        ),
        Alien(
            id = "greymatter",
            name = "Grey Matter",
            species = "Galvan",
            planet = "Galvan Prime",
            quote = "Level 20 intellect activated.",
            color = Color(0xFFA3E635),
            abilities = listOf("Hyper Intellect", "Tech Hacking", "Agility"),
            strength = 20,
            speed = 60,
            defense = 30
        ),
        Alien(
            id = "ripjaws",
            name = "Ripjaws",
            species = "Piscciss Volann",
            planet = "Piscciss",
            quote = "Underwater predator online!",
            color = Color(0xFF06B6D4),
            abilities = listOf("Crushing Jaws", "Water Breathing", "Swimmer"),
            strength = 75,
            speed = 90,
            defense = 70
        ),
        Alien(
            id = "alienx",
            name = "Alien X",
            species = "Celestialsapien",
            planet = "Forge of Creation",
            quote = "Motion carried.",
            color = Color(0xFFC084FC),
            abilities = listOf("Omnipotence", "Reality Alteration", "Cosmic Power"),
            strength = 100,
            speed = 100,
            defense = 100
        )
    )
}
