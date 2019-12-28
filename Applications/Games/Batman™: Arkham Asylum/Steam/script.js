const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const CSMT = include("engines.wine.plugins.csmt");
const GLSL = include("engines.wine.plugins.glsl");

new SteamScript()
    .name("Batman™: Arkham Asylum")
    .editor("Rocksteady Studios")
    .author("ImperatorS79")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .appId(35140)
    .postInstall((wine) => {
        new GLSL(wine).withMode("disabled").go();
        new CSMT(wine).go();
    });
