include(["engines", "wine", "quick_script", "steam_script"]);
include(["Engines", "Wine", "Verbs", "uplay"]);

new SteamScript()
    .name("Rayman® Legends (Demo)")
    .editor("Ubisoft")
    .author("Plata")
    .appId(243340)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function(wine/*, wizard*/) {
        wine.uplay();
    })
    .go();
