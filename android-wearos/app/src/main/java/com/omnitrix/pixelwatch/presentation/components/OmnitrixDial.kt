package com.omnitrix.pixelwatch.presentation.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import com.omnitrix.pixelwatch.presentation.theme.OmnitrixGreen
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun OmnitrixHourglass(
    modifier: Modifier = Modifier,
    color: Color = OmnitrixGreen,
    isPulsing: Boolean = true
) {
    val infiniteTransition = rememberInfiniteTransition(label = "hourglassPulse")
    val scale by if (isPulsing) {
        infiniteTransition.animateFloat(
            initialValue = 0.96f,
            targetValue = 1.04f,
            animationSpec = infiniteRepeatable(
                animation = tween(1500, easing = FastOutSlowInEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "scale"
        )
    } else {
        rememberUpdatedState(1f)
    }

    Box(
        modifier = modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.fillMaxSize(0.75f * scale)) {
            val w = size.width
            val h = size.height
            val cx = w / 2f
            val cy = h / 2f
            val radius = w / 2f

            // Outer ring
            drawCircle(
                color = color,
                radius = radius,
                style = Stroke(width = 8f)
            )

            // Inner dark backing
            drawCircle(
                color = Color.Black,
                radius = radius - 4f
            )

            // Top Triangle
            val topTriangle = Path().apply {
                moveTo(cx - radius * 0.7f, cy - radius * 0.75f)
                lineTo(cx + radius * 0.7f, cy - radius * 0.75f)
                lineTo(cx, cy - 6f)
                close()
            }
            drawPath(path = topTriangle, color = color)

            // Bottom Triangle
            val bottomTriangle = Path().apply {
                moveTo(cx - radius * 0.7f, cy + radius * 0.75f)
                lineTo(cx + radius * 0.7f, cy + radius * 0.75f)
                lineTo(cx, cy + 6f)
                close()
            }
            drawPath(path = bottomTriangle, color = color)
        }
    }
}

@Composable
fun OmnitrixBezelRing(
    rotationDegrees: Float,
    modifier: Modifier = Modifier,
    tickColor: Color = OmnitrixGreen
) {
    Canvas(modifier = modifier.fillMaxSize()) {
        val cx = size.width / 2f
        val cy = size.height / 2f
        val radius = size.width / 2f - 8f

        rotate(degrees = rotationDegrees, pivot = Offset(cx, cy)) {
            // Draw 10 primary alien notches + 30 sub notches
            for (i in 0 until 40) {
                val angleRad = Math.toRadians((i * 9).toDouble())
                val isMajor = (i % 4 == 0)
                val innerR = if (isMajor) radius - 18f else radius - 8f
                val strokeW = if (isMajor) 4f else 2f

                val startX = cx + (innerR * cos(angleRad)).toFloat()
                val startY = cy + (innerR * sin(angleRad)).toFloat()
                val endX = cx + (radius * cos(angleRad)).toFloat()
                val endY = cy + (radius * sin(angleRad)).toFloat()

                drawLine(
                    color = if (isMajor) tickColor else tickColor.copy(alpha = 0.4f),
                    start = Offset(startX, startY),
                    end = Offset(endX, endY),
                    strokeWidth = strokeW
                )
            }
        }
    }
}
