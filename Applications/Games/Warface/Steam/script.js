const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

const CSMT = include("engines.wine.plugins.csmt");

new SteamScript()
    .name("Warface")
    .editor("Crytek")
    .author("ImperatorS79")
    .appId(291480)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function (wine /*, wizard*/) {
        new CSMT(wine).go();
    });
