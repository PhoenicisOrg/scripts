const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Assassin’s Creed II")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(33230)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging");
