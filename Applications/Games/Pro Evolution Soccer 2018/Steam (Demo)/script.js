const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

new SteamScript()
    .name("Pro Evolution Soccer 2018 (Demo)")
    .editor("Konami Digital Entertainment Co., Ltd.")
    .author("Plata")
    .appId(592590)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
