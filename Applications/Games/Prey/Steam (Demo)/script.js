const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Prey (Demo)")
    .editor("Arkane Studios")
    .author("Plata")
    .appId(609380)
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .wineArchitecture("amd64");
