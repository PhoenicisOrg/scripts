const SteamScript = include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("Tomb Raider: Legend")
    .editor("Crystal Dynamics")
    .author("Plata")
    .appId(7000)
    .executable("trl.exe");
