package com.omnitrix.pixelwatch.presentation.theme

import androidx.compose.runtime.Composable
import androidx.wear.compose.material.Colors
import androidx.wear.compose.material.MaterialTheme

val OmnitrixColors = Colors(
    primary = OmnitrixGreen,
    primaryVariant = OmnitrixEmerald,
    secondary = OmnitrixCyan,
    background = OmnitrixBlack,
    surface = OmnitrixGray,
    error = OmnitrixRed,
    onPrimary = OmnitrixBlack,
    onSecondary = OmnitrixBlack,
    onBackground = OmnitrixGreen,
    onSurface = OmnitrixGreen,
    onError = OmnitrixBlack
)

@Composable
fun OmnitrixTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colors = OmnitrixColors,
        content = content
    )
}
