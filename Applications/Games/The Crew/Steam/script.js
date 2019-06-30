include("engines.wine.quick_script.steam_script");

new SteamScript()
    .name("The Crew™")
    .editor("Ivory Tower in collaboration with Ubisoft Reflections")
    .author("Plata")
    .appId(241560)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
