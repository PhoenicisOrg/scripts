include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Verbs", "uplay"]);

new SteamScript()
    .name("Assassin’s Creed® Brotherhood")
    .editor("Ubisoft")
    .author("Plata")
    .appId(48190)
    .wineVersion("2.5")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
