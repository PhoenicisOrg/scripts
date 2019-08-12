const SteamScript = include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("Totally Accurate Battlegrounds")
    .editor("Landfall")
    .author("Plata")
    .appId(823130)
    .wineArchitecture("amd64");
