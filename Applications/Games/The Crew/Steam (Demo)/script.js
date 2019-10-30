const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new SteamScript()
    .name("The Crew™ (Demo)")
    .editor("Ivory Tower in collaboration with Ubisoft Reflections")
    .author("Plata")
    .appId(366310)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
