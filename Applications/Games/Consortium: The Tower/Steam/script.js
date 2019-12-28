const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Consortium: The Tower")
    .editor("Interdimensional Games Inc")
    .author("Plata")
    .appId(626250)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
