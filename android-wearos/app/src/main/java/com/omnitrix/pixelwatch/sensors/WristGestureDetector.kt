package com.omnitrix.pixelwatch.sensors

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import kotlin.math.sqrt

/**
 * Wrist Flick Gesture Detector
 * Monitors 3-axis accelerometer data on Google Pixel Watch to trigger Omnitrix activation
 */
class WristGestureDetector(
    context: Context,
    private val onFlickDetected: () -> Unit
) : SensorEventListener {

    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)

    private var lastAcceleration = 0f
    private var currentAcceleration = 0f
    private var accelerationThreshold = 14f // Jerk magnitude threshold
    private var lastFlickTimestamp: Long = 0

    fun start() {
        accelerometer?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_GAME)
        }
    }

    fun stop() {
        sensorManager.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event == null) return
        val x = event.values[0]
        val y = event.values[1]
        val z = event.values[2]

        lastAcceleration = currentAcceleration
        currentAcceleration = sqrt((x * x + y * y + z * z).toDouble()).toFloat()
        val delta = currentAcceleration - lastAcceleration

        val now = System.currentTimeMillis()
        if (delta > accelerationThreshold && (now - lastFlickTimestamp) > 1000) {
            lastFlickTimestamp = now
            onFlickDetected()
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
}
