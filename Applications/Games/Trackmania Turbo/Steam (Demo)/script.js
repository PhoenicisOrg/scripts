const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

const Uplay = include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Trackmania® Turbo (Demo)")
    .editor("Nadeo")
    .author("Plata")
    .appId(456400)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .postInstall((wine /*, wizard*/) => {
        new Uplay(wine).go();
    });
