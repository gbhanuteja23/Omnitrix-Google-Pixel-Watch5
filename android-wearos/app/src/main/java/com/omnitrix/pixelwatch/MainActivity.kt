package com.omnitrix.pixelwatch

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import com.omnitrix.pixelwatch.audio.OmnitrixSoundPlayer
import com.omnitrix.pixelwatch.presentation.screens.OmnitrixMainScreen
import com.omnitrix.pixelwatch.presentation.theme.OmnitrixTheme
import com.omnitrix.pixelwatch.sensors.WristGestureDetector
import com.omnitrix.pixelwatch.voice.GeminiVoiceManager
import com.omnitrix.pixelwatch.voice.VoiceCommand

class MainActivity : ComponentActivity() {

    private lateinit var soundPlayer: OmnitrixSoundPlayer
    private lateinit var gestureDetector: WristGestureDetector
    private lateinit var voiceManager: GeminiVoiceManager

    private val recordAudioPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            voiceManager.startListening()
        } else {
            Toast.makeText(this, "Microphone permission needed for Gemini voice", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        soundPlayer = OmnitrixSoundPlayer(this)

        gestureDetector = WristGestureDetector(this) {
            // Wrist flick gesture detected!
            soundPlayer.playPopUp()
        }

        voiceManager = GeminiVoiceManager(
            context = this,
            onCommandResolved = { cmd ->
                when (cmd) {
                    is VoiceCommand.Transform -> {
                        Toast.makeText(this, "Transforming into ${cmd.alienId}", Toast.LENGTH_SHORT).show()
                    }
                    is VoiceCommand.QueryResponse -> {
                        Toast.makeText(this, cmd.text, Toast.LENGTH_SHORT).show()
                    }
                    else -> {}
                }
            },
            onListeningStateChanged = { isListening ->
                if (isListening) {
                    soundPlayer.playPopUp()
                }
            }
        )

        setContent {
            OmnitrixTheme {
                OmnitrixMainScreen(
                    soundPlayer = soundPlayer,
                    onTriggerVoice = { triggerVoiceRecognition() }
                )
            }
        }
    }

    private fun triggerVoiceRecognition() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
            voiceManager.startListening()
        } else {
            recordAudioPermissionLauncher.launch(Manifest.permission.RECORD_AUDIO)
        }
    }

    override fun onResume() {
        super.onResume()
        gestureDetector.start()
    }

    override fun onPause() {
        super.onPause()
        gestureDetector.stop()
        voiceManager.stopListening()
    }

    override fun onDestroy() {
        super.onDestroy()
        voiceManager.destroy()
    }
}
