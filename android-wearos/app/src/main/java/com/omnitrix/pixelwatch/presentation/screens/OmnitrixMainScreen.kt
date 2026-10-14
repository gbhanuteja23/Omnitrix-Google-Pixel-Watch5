package com.omnitrix.pixelwatch.presentation.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.gestures.scrollBy
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.rotary.onRotaryScrollEvent
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.wear.compose.material.*
import com.omnitrix.pixelwatch.audio.OmnitrixSoundPlayer
import com.omnitrix.pixelwatch.model.AlienRoster
import com.omnitrix.pixelwatch.model.OmnitrixState
import com.omnitrix.pixelwatch.presentation.components.OmnitrixBezelRing
import com.omnitrix.pixelwatch.presentation.components.OmnitrixHourglass
import com.omnitrix.pixelwatch.presentation.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun OmnitrixMainScreen(
    soundPlayer: OmnitrixSoundPlayer,
    onTriggerVoice: () -> Unit,
    modifier: Modifier = Modifier
) {
    var state by remember { mutableStateOf<OmnitrixState>(OmnitrixState.Standby) }
    var selectedAlienIndex by remember { mutableStateOf(0) }
    var dialRotation by remember { mutableStateOf(0f) }
    val focusRequester = remember { FocusRequester() }
    val coroutineScope = rememberCoroutineScope()

    val aliens = AlienRoster.aliens
    val currentAlien = aliens[selectedAlienIndex]

    // Request rotary focus for Google Pixel Watch digital crown
    LaunchedEffect(Unit) {
        focusRequester.requestFocus()
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(Color.Black)
            .focusRequester(focusRequester)
            .focusable()
            .onRotaryScrollEvent { rotaryEvent ->
                // Physical crown rotation on Pixel Watch!
                val delta = rotaryEvent.verticalScrollPixels
                if (state is OmnitrixState.Selecting || state is OmnitrixState.MasterControl) {
                    if (delta > 0) {
                        selectedAlienIndex = (selectedAlienIndex + 1) % aliens.size
                        dialRotation += 36f
                        soundPlayer.playDialTick()
                    } else if (delta < 0) {
                        selectedAlienIndex = (selectedAlienIndex - 1 + aliens.size) % aliens.size
                        dialRotation -= 36f
                        soundPlayer.playDialTick()
                    }
                } else if (state is OmnitrixState.Standby) {
                    soundPlayer.playPopUp()
                    state = OmnitrixState.Selecting(selectedAlienIndex)
                }
                true
            },
        contentAlignment = Alignment.Center
    ) {
        // Top Wear OS Time
        TimeText(
            timeTextStyle = TimeTextDefaults.timeTextStyle(
                color = OmnitrixGreen.copy(alpha = 0.8f),
                fontSize = 11.sp
            )
        )

        // State-driven screen views
        when (val s = state) {
            is OmnitrixState.Standby -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .clickable {
                            soundPlayer.playPopUp()
                            state = OmnitrixState.Selecting(selectedAlienIndex)
                        },
                    contentAlignment = Alignment.Center
                ) {
                    OmnitrixHourglass(color = OmnitrixGreen)
                    Text(
                        text = "TAP TO ACTIVATE",
                        color = OmnitrixGreen.copy(alpha = 0.7f),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .padding(bottom = 26.dp)
                    )
                }
            }

            is OmnitrixState.Selecting -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    OmnitrixBezelRing(rotationDegrees = dialRotation)

                    // Alien Info Header
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier
                            .align(Alignment.TopCenter)
                            .padding(top = 28.dp)
                    ) {
                        Text(
                            text = currentAlien.name.uppercase(),
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Black
                        )
                        Text(
                            text = "${currentAlien.species} • ${currentAlien.planet}",
                            color = OmnitrixGreen,
                            fontSize = 9.sp
                        )
                    }

                    // Center Slap Button
                    Box(
                        modifier = Modifier
                            .size(120.dp)
                            .clip(CircleShape)
                            .background(OmnitrixDarkGreen)
                            .clickable {
                                soundPlayer.playSlapDown()
                                state = OmnitrixState.Transforming(currentAlien)
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        OmnitrixHourglass(
                            color = currentAlien.color,
                            isPulsing = false,
                            modifier = Modifier.size(80.dp)
                        )
                    }

                    Text(
                        text = "SLAP TO TRANSFORM",
                        color = Color.Black,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .padding(bottom = 22.dp)
                            .background(OmnitrixGreen, CircleShape)
                            .padding(horizontal = 10.dp, vertical = 2.dp)
                    )
                }
            }

            is OmnitrixState.Transforming -> {
                // Intense Flash
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(OmnitrixGreen)
                )

                LaunchedEffect(Unit) {
                    delay(550)
                    state = OmnitrixState.Transformed(s.alien, remainingSeconds = 30)
                }
            }

            is OmnitrixState.Transformed -> {
                var remaining by remember { mutableStateOf(s.remainingSeconds) }

                LaunchedEffect(Unit) {
                    while (remaining > 0) {
                        delay(1000)
                        remaining--
                        if (remaining in 1..4) {
                            soundPlayer.playTimeoutWarning()
                        }
                    }
                    soundPlayer.playTimeoutWarning()
                    state = OmnitrixState.Recharging(remainingSeconds = 8)
                }

                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .clickable {
                            soundPlayer.playSlapDown()
                            state = OmnitrixState.Recharging(8)
                        }
                        .padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = s.alien.name.uppercase(),
                        color = s.alien.color,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Black
                    )
                    Text(
                        text = "\"${s.alien.quote}\"",
                        color = Color.LightGray,
                        fontSize = 10.sp,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    // Energy Bar
                    CircularProgressIndicator(
                        progress = remaining / 30f,
                        modifier = Modifier.size(60.dp),
                        indicatorColor = if (remaining > 5) OmnitrixGreen else OmnitrixRed,
                        trackColor = Color.DarkGray,
                        strokeWidth = 6.dp
                    )

                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "${remaining}s",
                        color = Color.White,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            is OmnitrixState.Recharging -> {
                var rechargeSec by remember { mutableStateOf(s.remainingSeconds) }

                LaunchedEffect(Unit) {
                    while (rechargeSec > 0) {
                        delay(1000)
                        rechargeSec--
                    }
                    soundPlayer.playRechargeDone()
                    state = OmnitrixState.Standby
                }

                Column(
                    modifier = Modifier.fillMaxSize(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    OmnitrixHourglass(color = OmnitrixRed, isPulsing = true, modifier = Modifier.size(100.dp))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "RECHARGING",
                        color = OmnitrixRed,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "${rechargeSec}s",
                        color = Color.White,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Black
                    )
                }
            }

            is OmnitrixState.SelfDestruct -> {
                // Amber klaxon countdown
                Column(
                    modifier = Modifier.fillMaxSize(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "SELF DESTRUCT",
                        color = OmnitrixAmber,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Black
                    )
                    Text(
                        text = "${s.remainingSeconds}",
                        color = OmnitrixAmber,
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Black
                    )
                }
            }

            else -> {}
        }

        // Floating Gemini Voice Trigger Button on Watch Screen
        Button(
            onClick = { onTriggerVoice() },
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(end = 12.dp, bottom = 12.dp)
                .size(32.dp),
            colors = ButtonDefaults.buttonColors(backgroundColor = OmnitrixGreen)
        ) {
            Text("✨", fontSize = 12.sp, color = Color.Black)
        }
    }
}
