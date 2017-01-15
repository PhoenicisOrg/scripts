include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Verbs", "quicktime76"]);
include(["Functions", "Verbs", "corefonts"]);
include(["Functions", "Verbs", "tahoma"]);

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
