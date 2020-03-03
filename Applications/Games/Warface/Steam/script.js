const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const CSMT = include("engines.wine.plugins.csmt");

new SteamScript()
    .name("Warface")
    .editor("Crytek")
    .author("ImperatorS79")
    .appId(291480)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .postInstall((wine /*, wizard*/) => {
        new CSMT(wine).go();
    });
