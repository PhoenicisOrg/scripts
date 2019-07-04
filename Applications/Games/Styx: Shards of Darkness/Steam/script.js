include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("Styx: Shards of Darkness")
    .editor("Cyanide Studio")
    .author("Plata")
    .appId(355790)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
