include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("DOOM (2016)")
    .editor("ID Software")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .appId(379720);
