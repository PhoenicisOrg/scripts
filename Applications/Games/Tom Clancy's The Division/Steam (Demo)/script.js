include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "uplay"]);

new SteamScript()
    .name("Tom Clancy’s The Division™ (Demo)")
    .editor("Massive Entertainment")
    .author("Plata")
    .appId(588220)
    .wineVersion("2.16")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
