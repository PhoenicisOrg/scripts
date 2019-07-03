include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Trackmania® Turbo")
    .editor("Nadeo")
    .author("Plata")
    .appId(375900)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function (wine /*, wizard*/) {
        wine.uplay();
    });
