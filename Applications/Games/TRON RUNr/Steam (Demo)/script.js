const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new SteamScript()
    .name("TRON RUN/r (Demo)")
    .editor("Sanzaru Games Inc.")
    .author("Plata")
    .appId(436130)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
