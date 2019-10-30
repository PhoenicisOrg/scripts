const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Styx: Shards of Darkness")
    .editor("Cyanide Studio")
    .author("Plata")
    .appId(355790)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
