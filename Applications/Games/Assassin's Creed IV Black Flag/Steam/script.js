include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Assassin’s Creed® IV Black Flag™")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(242050)
    .wineVersion("2.14")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        // the automatically installed Uplay version does not update properly
        wine.uplay();
    })
    .go();
