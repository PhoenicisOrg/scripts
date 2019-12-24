const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("The Vanishing of Ethan Carter Redux")
    .editor("The Astronauts")
    .author("Plata")
    .appId(400430)
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .wineArchitecture("amd64");
