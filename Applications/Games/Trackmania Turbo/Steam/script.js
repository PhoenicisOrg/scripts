include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "uplay"]);

new SteamScript()
    .name("Trackmania® Turbo")
    .editor("Nadeo")
    .author("Plata")
    .appId(375900)
    .wineVersion("2.16")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
