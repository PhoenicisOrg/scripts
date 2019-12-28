const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

const Uplay = include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Assassin's Creed® Revelations")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(201870)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .postInstall((wine /*, wizard*/) => {
        new Uplay(wine).go();
    });
