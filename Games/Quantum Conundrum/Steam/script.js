include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Verbs", "vcrun2008"]);

new SteamScript()
    .name("Quantum Conundrum")
    .editor("Square Enix")
    .author("Plata")
    .appId(200010)
    .wineVersion("1.9.23")
    .preInstall(function(wine, wizard) {
        wine.vcrun2008();
    })
    .go();
