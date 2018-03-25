include(["Engines", "Wine", "QuickScript", "SteamScript"]);

include(["Engines", "Wine", "Verbs", "d3dx10"]);

new SteamScript()
    .name("It came from space, and ate our brains")
    .editor("Triangle Studios")
    .author("madoar")
    .appId(342620)
    .preInstall(function (wine, wizard) {
        wine.d3dx10();
    })
    .go();
