package com.omnitrix.pixelwatch.voice

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import com.google.ai.client.generativeai.GenerativeModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

sealed class VoiceCommand {
    data class Transform(val alienId: String) : VoiceCommand()
    object SelfDestruct : VoiceCommand()
    object CancelSelfDestruct : VoiceCommand()
    object ScanDna : VoiceCommand()
    object EmergencyRecharge : VoiceCommand()
    object ToggleMasterControl : VoiceCommand()
    data class QueryResponse(val text: String) : VoiceCommand()
}

/**
 * Gemini Voice Manager for Wear OS
 * Listens to voice commands via SpeechRecognizer and resolves intent via Gemini API or on-device rules.
 */
class GeminiVoiceManager(
    private val context: Context,
    private val onCommandResolved: (VoiceCommand) -> Unit,
    private val onListeningStateChanged: (Boolean) -> Unit
) {
    private var speechRecognizer: SpeechRecognizer? = null
    private val scope = CoroutineScope(Dispatchers.Main)
    var apiKey: String = ""

    fun startListening() {
        if (!SpeechRecognizer.isRecognitionAvailable(context)) {
            onCommandResolved(VoiceCommand.QueryResponse("Speech recognition not available on this watch"))
            return
        }

        speechRecognizer?.destroy()
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(context).apply {
            setRecognitionListener(object : RecognitionListener {
                override fun onReadyForSpeech(params: Bundle?) {
                    onListeningStateChanged(true)
                }

                override fun onBeginningOfSpeech() {}
                override fun onRmsChanged(rmsdB: Float) {}
                override fun onBufferReceived(buffer: ByteArray?) {}
                override fun onEndOfSpeech() {
                    onListeningStateChanged(false)
                }

                override fun onError(error: Int) {
                    onListeningStateChanged(false)
                }

                override fun onResults(results: Bundle?) {
                    onListeningStateChanged(false)
                    val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                    val spokenText = matches?.firstOrNull() ?: return
                    processVoiceTranscript(spokenText)
                }

                override fun onPartialResults(partialResults: Bundle?) {}
                override fun onEvent(eventType: Int, params: Bundle?) {}
            })
        }

        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        }
        speechRecognizer?.startListening(intent)
    }

    fun stopListening() {
        speechRecognizer?.stopListening()
        onListeningStateChanged(false)
    }

    private fun processVoiceTranscript(transcript: String) {
        val lower = transcript.lowercase().trim()

        // 1. High speed on-device rule matching
        when {
            lower.contains("heatblast") || lower.contains("fire") || lower.contains("pyros") -> {
                onCommandResolved(VoiceCommand.Transform("heatblast"))
                return
            }
            lower.contains("four arms") || lower.contains("fourarms") || lower.contains("strength") || lower.contains("smash") -> {
                onCommandResolved(VoiceCommand.Transform("fourarms"))
                return
            }
            lower.contains("xlr8") || lower.contains("speed") || lower.contains("accelerate") -> {
                onCommandResolved(VoiceCommand.Transform("xlr8"))
                return
            }
            lower.contains("diamondhead") || lower.contains("crystal") -> {
                onCommandResolved(VoiceCommand.Transform("diamondhead"))
                return
            }
            lower.contains("upgrade") || lower.contains("hack") || lower.contains("tech") -> {
                onCommandResolved(VoiceCommand.Transform("upgrade"))
                return
            }
            lower.contains("ghostfreak") || lower.contains("ghost") || lower.contains("invisible") -> {
                onCommandResolved(VoiceCommand.Transform("ghostfreak"))
                return
            }
            lower.contains("cannonbolt") || lower.contains("roll") -> {
                onCommandResolved(VoiceCommand.Transform("cannonbolt"))
                return
            }
            lower.contains("grey matter") || lower.contains("greymatter") || lower.contains("smart") -> {
                onCommandResolved(VoiceCommand.Transform("greymatter"))
                return
            }
            lower.contains("ripjaws") || lower.contains("water") || lower.contains("swim") -> {
                onCommandResolved(VoiceCommand.Transform("ripjaws"))
                return
            }
            lower.contains("alien x") || lower.contains("reality") -> {
                onCommandResolved(VoiceCommand.Transform("alienx"))
                return
            }
            lower.contains("self destruct") -> {
                onCommandResolved(VoiceCommand.SelfDestruct)
                return
            }
            lower.contains("abort") || lower.contains("cancel") -> {
                onCommandResolved(VoiceCommand.CancelSelfDestruct)
                return
            }
            lower.contains("scan") || lower.contains("dna") -> {
                onCommandResolved(VoiceCommand.ScanDna)
                return
            }
            lower.contains("recharge") -> {
                onCommandResolved(VoiceCommand.EmergencyRecharge)
                return
            }
            lower.contains("master control") -> {
                onCommandResolved(VoiceCommand.ToggleMasterControl)
                return
            }
        }

        // 2. Fallback to Gemini GenerativeModel if API key configured
        if (apiKey.isNotBlank()) {
            scope.launch {
                try {
                    val generativeModel = GenerativeModel(
                        modelName = "gemini-1.5-flash",
                        apiKey = apiKey
                    )
                    val prompt = "You are the Omnitrix AI on Ben 10's watch. Answer very briefly in 1 short sentence: $transcript"
                    val response = withContext(Dispatchers.IO) {
                        generativeModel.generateContent(prompt).text ?: "Command acknowledged."
                    }
                    onCommandResolved(VoiceCommand.QueryResponse(response))
                } catch (e: Exception) {
                    onCommandResolved(VoiceCommand.QueryResponse("Gemini: $transcript"))
                }
            }
        } else {
            onCommandResolved(VoiceCommand.QueryResponse("Omnitrix: Command '$transcript' recorded."))
        }
    }

    fun destroy() {
        speechRecognizer?.destroy()
    }
}
