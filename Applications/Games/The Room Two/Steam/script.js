const SteamScript = include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("The Room Two")
    .editor("Fireproof Games")
    .author("Plata")
    .appId(425580)
    .executable("Steam.exe", ["-silent", "-applaunch", 425580, "-force-d3d9"]);
