include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "uplay"]);

new SteamScript()
    .name("Assassin's Creed® Revelations")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(201870)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.uplay();
    })
    .go();
