const SteamScript = include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("Spore")
    .editor("Maxis")
    .author("Zemogiter")
    .applicationHomepage("http://www.spore.com/")
    .wineDistribution("upstream")
    .wineVersion("4.0-rc1")
    .appId(17390);
