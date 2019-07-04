include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("Red Trigger")
    .editor("Maxime Vézina")
    .author("Plata")
    .appId(491130)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging");
