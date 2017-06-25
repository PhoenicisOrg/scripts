include(["Functions", "QuickScript", "SteamScript"]);

include(["Functions", "Verbs", "d3dx9"]);

new SteamScript()
    .name("It came from space, and ate our brains")
    .editor("Triangle Studios")
    .author("madoar")
    .appId(342620)
    .preInstall(function (wine, wizard) {
        wine.d3dx9();
    })
    .go();
