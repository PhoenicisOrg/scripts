const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

new SteamScript()
    .name("Consortium: The Tower (Demo)")
    .editor("Interdimensional Games Inc")
    .author("Plata")
    .appId(726310)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
