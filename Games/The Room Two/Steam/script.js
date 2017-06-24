include(["Functions", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("The Room Two")
    .editor("Fireproof Games")
    .author("Plata")
    .appId(425580)
    .executable("Steam.exe", ["-silent", "-applaunch", 425580, "-force-d3d9"])
    .go();
