include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "uplay"]);

new SteamScript()
    .name("Rayman® Legends (Demo)")
    .editor("Ubisoft")
    .author("Plata")
    .appId(243340)
    .wineVersion("2.16")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
