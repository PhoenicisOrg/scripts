const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

include("engines.wine.plugins.csmt");
include("engines.wine.plugins.glsl");

new SteamScript()
    .name("Batman™: Arkham Asylum")
    .editor("Rocksteady Studios")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .appId(35140)
    .postInstall(function (wine/*, wizard*/) {
        wine.UseGLSL("disabled");
        wine.enableCSMT();
    });
