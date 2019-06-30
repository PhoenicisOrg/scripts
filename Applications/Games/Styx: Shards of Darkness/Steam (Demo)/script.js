include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("Styx: Shards of Darkness (Demo)")
    .editor("Cyanide Studio")
    .author("Plata")
    .appId(630880)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
