include(["Functions", "Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Functions", "Verbs", "quicktime76"]);
include(["Functions", "Functions", "Verbs", "corefonts"]);
include(["Functions", "Functions", "Verbs", "tahoma"]);

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
