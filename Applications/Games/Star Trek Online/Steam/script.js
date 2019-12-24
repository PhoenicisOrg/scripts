const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Star Trek Online")
    .editor("Cryptic Studios")
    .author("ImperatorS79")
    .appId(9900)
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging");
