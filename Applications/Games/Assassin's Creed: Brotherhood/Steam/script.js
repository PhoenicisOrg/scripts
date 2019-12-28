const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

const Uplay = include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Assassin’s Creed® Brotherhood")
    .editor("Ubisoft")
    .author("Plata")
    .appId(48190)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .postInstall((wine /*, wizard*/) => {
        new Uplay(wine).go();
    });
