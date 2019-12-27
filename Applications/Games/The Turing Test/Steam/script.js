const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestDevelopmentVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("The Turing Test")
    .editor("Bulkhead Interactive")
    .author("Plata")
    .appId(499520)
    .wineArchitecture("amd64")
    .wineVersion(getLatestDevelopmentVersion);
