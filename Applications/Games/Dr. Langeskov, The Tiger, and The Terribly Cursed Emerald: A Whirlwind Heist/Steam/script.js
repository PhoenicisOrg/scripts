include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Dr. Langeskov, The Tiger, and The Terribly Cursed Emerald: A Whirlwind Heist")
    .editor("Crows Crows Crows")
    .author("Plata")
    .appId(409160)
    .executable("Steam.exe", ["-applaunch", 409160, "-force-d3d9"])
    .go();
