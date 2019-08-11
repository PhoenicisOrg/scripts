const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Red Trigger")
    .editor("Maxime Vézina")
    .author("Plata")
    .appId(491130)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging");
