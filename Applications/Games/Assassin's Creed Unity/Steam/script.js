const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

new SteamScript()
    .name("Assassin’s Creed® Unity")
    .editor("Ubisoft")
    .author("Plata")
    .appId(289650)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
