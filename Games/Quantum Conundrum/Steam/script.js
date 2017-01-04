include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Verbs", "msvc90"]);

new SteamScript()
    .name("Quantum Conundrum")
    .editor("Square Enix")
    .author("Plata")
    .appId(200010)
    .preInstall(function(wine, wizard) {
        wine.msvc90();
    })
    .go();
