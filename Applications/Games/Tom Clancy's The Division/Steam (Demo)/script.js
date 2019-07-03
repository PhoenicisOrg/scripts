include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Tom Clancy’s The Division™ (Demo)")
    .editor("Massive Entertainment")
    .author("Plata")
    .appId(588220)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .postInstall(function (wine /*, wizard*/) {
        wine.uplay();
    });
