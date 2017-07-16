include(["Wine", "QuickScript", "SteamScript"]);
include(["Wine", "Verbs", "quicktime76"]);
include(["Wine", "Verbs", "corefonts"]);
include(["Wine", "Verbs", "tahoma"]);

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
