const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("The Elder Scrolls IV: Oblivion")
    .editor("Bethesda Game Studios")
    .author("ImperatorS79")
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .appId(22330);
