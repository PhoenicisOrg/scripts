const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

const DotNET40 = include("engines.wine.verbs.dotnet40");

new SteamScript()
    .name("Unholy Heights")
    .editor("AGM PLAYISM")
    .author("madoar")
    .appId(249330)
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        new DotNET40(wine).go();
    });
