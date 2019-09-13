const SteamScript = include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("ChromaGun (Demo)")
    .editor("Pixel Maniacs")
    .author("Plata")
    .appId(455660)
    .executable("chromagun.exe");
