const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("The Crew™ (Demo)")
    .editor("Ivory Tower in collaboration with Ubisoft Reflections")
    .author("Plata")
    .appId(366310)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
