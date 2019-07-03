include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Trackmania® Turbo (Demo)")
    .editor("Nadeo")
    .author("Plata")
    .appId(456400)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function (wine /*, wizard*/) {
        wine.uplay();
    });
