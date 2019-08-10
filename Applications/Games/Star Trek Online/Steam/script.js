const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Star Trek Online")
    .editor("Cryptic Studios")
    .author("ImperatorS79")
    .appId(9900)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging");
