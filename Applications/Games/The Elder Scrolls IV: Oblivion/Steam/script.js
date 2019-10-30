const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new SteamScript()
    .name("The Elder Scrolls IV: Oblivion")
    .editor("Bethesda Game Studios")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .appId(22330);
