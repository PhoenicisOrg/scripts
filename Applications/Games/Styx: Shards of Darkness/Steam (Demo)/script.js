const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Styx: Shards of Darkness (Demo)")
    .editor("Cyanide Studio")
    .author("Plata")
    .appId(630880)
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .wineArchitecture("amd64");
