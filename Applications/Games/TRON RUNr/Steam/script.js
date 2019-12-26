const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("TRON RUN/r")
    .editor("Sanzaru Games Inc.")
    .author("Plata")
    .appId(392000)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
