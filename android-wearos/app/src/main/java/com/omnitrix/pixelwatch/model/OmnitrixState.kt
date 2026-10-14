package com.omnitrix.pixelwatch.model

sealed class OmnitrixState {
    object Standby : OmnitrixState()
    data class Selecting(val selectedIndex: Int) : OmnitrixState()
    data class Transforming(val alien: Alien) : OmnitrixState()
    data class Transformed(val alien: Alien, val remainingSeconds: Int) : OmnitrixState()
    data class Recharging(val remainingSeconds: Int) : OmnitrixState()
    data class SelfDestruct(val remainingSeconds: Int) : OmnitrixState()
    object DnaScanning : OmnitrixState()
    data class MasterControl(val selectedIndex: Int) : OmnitrixState()
    object Ambient : OmnitrixState()
}
