const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const CSMT = include("engines.wine.plugins.csmt");
const Secur32 = include("engines.wine.verbs.secur32");

new SteamScript()
    .name("Far Cry® 2")
    .editor("Ubisoft Montréal")
    .author("ImperatorS79")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .appId(19900)
    .preInstall((wine /*, wizard*/) => {
        new Secur32(wine).go();
        new CSMT(wine).go();
    });
