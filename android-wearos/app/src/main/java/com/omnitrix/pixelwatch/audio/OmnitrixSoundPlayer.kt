package com.omnitrix.pixelwatch.audio

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.math.PI
import kotlin.math.sin

/**
 * Procedural Audio Synthesizer & Tactile Haptic Engine for Pixel Watch 5
 * Generates audio waveforms programmatically using AudioTrack - 0 raw asset dependencies needed.
 */
class OmnitrixSoundPlayer(private val context: Context) {

    private val sampleRate = 44100
    private val vibrator: Vibrator? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        val vibratorManager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
        vibratorManager?.defaultVibrator
    } else {
        @Suppress("DEPRECATION")
        context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }

    private val audioScope = CoroutineScope(Dispatchers.Default)

    fun playDialTick() {
        vibrate(30, VibrationEffect.DEFAULT_AMPLITUDE)
        audioScope.launch {
            val numSamples = (sampleRate * 0.04).toInt()
            val buffer = ShortArray(numSamples)
            for (i in 0 until numSamples) {
                val t = i.toDouble() / sampleRate
                val freq = 800.0 - (t * 12000.0)
                val decay = 1.0 - (i.toDouble() / numSamples)
                val sample = sin(2.0 * PI * freq * t) * decay
                buffer[i] = (sample * Short.MAX_VALUE * 0.4).toInt().toShort()
            }
            playPcmBuffer(buffer)
        }
    }

    fun playPopUp() {
        vibrate(80, VibrationEffect.DEFAULT_AMPLITUDE)
        audioScope.launch {
            val numSamples = (sampleRate * 0.35).toInt()
            val buffer = ShortArray(numSamples)
            for (i in 0 until numSamples) {
                val t = i.toDouble() / sampleRate
                val freq = 200.0 + (t * 3000.0)
                val envelope = if (i < numSamples * 0.7) i.toDouble() / (numSamples * 0.7) else (numSamples - i).toDouble() / (numSamples * 0.3)
                val sample = sin(2.0 * PI * freq * t) * envelope
                buffer[i] = (sample * Short.MAX_VALUE * 0.5).toInt().toShort()
            }
            playPcmBuffer(buffer)
        }
    }

    fun playSlapDown() {
        vibrate(180, VibrationEffect.DEFAULT_AMPLITUDE)
        audioScope.launch {
            val numSamples = (sampleRate * 0.5).toInt()
            val buffer = ShortArray(numSamples)
            for (i in 0 until numSamples) {
                val t = i.toDouble() / sampleRate
                val decay = 1.0 - (i.toDouble() / numSamples)
                // Sub boom + white noise burst
                val sub = sin(2.0 * PI * (120.0 - t * 180.0) * t) * 0.7
                val noise = (Math.random() * 2.0 - 1.0) * 0.3
                val sample = (sub + noise) * decay
                buffer[i] = (sample * Short.MAX_VALUE * 0.7).toInt().toShort()
            }
            playPcmBuffer(buffer)
        }
    }

    fun playTimeoutWarning() {
        vibrate(100, VibrationEffect.DEFAULT_AMPLITUDE)
        audioScope.launch {
            val numSamples = (sampleRate * 0.12).toInt()
            val buffer = ShortArray(numSamples)
            for (i in 0 until numSamples) {
                val t = i.toDouble() / sampleRate
                val sample = sin(2.0 * PI * 950.0 * t)
                buffer[i] = (sample * Short.MAX_VALUE * 0.4).toInt().toShort()
            }
            playPcmBuffer(buffer)
        }
    }

    fun playRechargeDone() {
        vibrate(60, VibrationEffect.DEFAULT_AMPLITUDE)
        audioScope.launch {
            val notes = listOf(523.25, 659.25, 783.99, 1046.5)
            val noteSamples = (sampleRate * 0.08).toInt()
            val buffer = ShortArray(noteSamples * notes.size)
            for ((idx, freq) in notes.withIndex()) {
                val offset = idx * noteSamples
                for (i in 0 until noteSamples) {
                    val t = i.toDouble() / sampleRate
                    val decay = 1.0 - (i.toDouble() / noteSamples)
                    val sample = sin(2.0 * PI * freq * t) * decay
                    buffer[offset + i] = (sample * Short.MAX_VALUE * 0.4).toInt().toShort()
                }
            }
            playPcmBuffer(buffer)
        }
    }

    private fun playPcmBuffer(buffer: ShortArray) {
        val minBufferSize = AudioTrack.getMinBufferSize(
            sampleRate,
            AudioFormat.CHANNEL_OUT_MONO,
            AudioFormat.ENCODING_PCM_16BIT
        )
        val track = AudioTrack.Builder()
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_GAME)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build()
            )
            .setAudioFormat(
                AudioFormat.Builder()
                    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                    .setSampleRate(sampleRate)
                    .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                    .build()
            )
            .setBufferSizeInBytes(maxOf(minBufferSize, buffer.size * 2))
            .setTransferMode(AudioTrack.MODE_STATIC)
            .build()

        track.write(buffer, 0, buffer.size)
        track.play()
        track.setNotificationMarkerPosition(buffer.size)
        track.setPlaybackPositionUpdateListener(object : AudioTrack.OnPlaybackPositionUpdateListener {
            override fun onMarkerReached(t: AudioTrack?) {
                t?.release()
            }
            override fun onPeriodicNotification(t: AudioTrack?) {}
        })
    }

    private fun vibrate(durationMs: Long, amplitude: Int) {
        if (vibrator?.hasVibrator() == true) {
            val effect = VibrationEffect.createOneShot(durationMs, amplitude)
            vibrator.vibrate(effect)
        }
    }
}
