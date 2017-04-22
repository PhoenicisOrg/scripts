include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Verbs", "uplay"]);

new SteamScript()
    .name("Assassin's Creed® Revelations")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(201870)
    .wineVersion("2.5")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
