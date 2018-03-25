include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "uplay"]);

new SteamScript()
    .name("Trackmania® Turbo (Demo)")
    .editor("Nadeo")
    .author("Plata")
    .appId(456400)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
