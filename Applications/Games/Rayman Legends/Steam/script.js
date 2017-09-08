include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "uplay"]);

new SteamScript()
    .name("Rayman® Legends")
    .editor("Ubisoft")
    .author("Plata")
    .appId(242550)
    .wineVersion("2.16")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
