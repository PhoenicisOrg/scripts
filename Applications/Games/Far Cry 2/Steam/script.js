include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.csmt");
include("engines.wine.verbs.secur32");

new SteamScript()
    .name("Far Cry® 2")
    .editor("Ubisoft Montréal")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .appId(19900)
    .preInstall(function (wine /*, wizard*/) {
        wine.secur32();
        wine.enableCSMT();
    });
