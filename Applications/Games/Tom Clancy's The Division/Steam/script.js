const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

const Uplay = include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Tom Clancy’s The Division™")
    .editor("Massive Entertainment")
    .author("Plata")
    .appId(365590)
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .postInstall(function (wine /*, wizard*/) {
        new Uplay(wine).go();
    });
