include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.uplay");

new SteamScript()
    .name("Assassin's Creed® Revelations")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(201870)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function (wine /*, wizard*/) {
        wine.uplay();
    });
