include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "quicktime76"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);
include(["Engines", "Wine", "Verbs", "tahoma"]);

new SteamScript()
    .name("Audiosurf")
    .editor("Dylan Fitterer")
    .author("Brainzyy")
    .appId(12900)
    .preInstall(function(wine, wizard) {
        wine.quicktime76();
        wine.corefonts();
        wine.tahoma();
    })
    .go();
