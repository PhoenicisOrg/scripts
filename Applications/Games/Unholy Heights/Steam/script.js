const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

const DotNET40 = include("engines.wine.verbs.dotnet40");

new SteamScript()
    .name("Unholy Heights")
    .editor("AGM PLAYISM")
    .author("madoar")
    .appId(249330)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        new DotNET40(wine).go();
    });
