const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const CSMT = include("engines.wine.plugins.csmt");

new SteamScript()
    .name("Batman™: Arkham City")
    .editor("Rocksteady Studios")
    .author("ImperatorS79")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .appId(200260)
    .postInstall((wine/*, wizard*/) => {
        new CSMT(wine).go();
    });
