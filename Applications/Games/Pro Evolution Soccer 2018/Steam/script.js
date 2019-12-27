const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new SteamScript()
    .name("Pro Evolution Soccer 2018")
    .editor("Konami Digital Entertainment Co., Ltd.")
    .author("Plata")
    .appId(592580)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
