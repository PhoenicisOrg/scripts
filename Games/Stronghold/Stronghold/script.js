include(["Functions", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Stronghold HD")
    .editor("FireFly Studios")
    .author("odziom91")
    .appId(40950)
    .postInstall(function(wine, wizard) {
        wine.setVirtualDesktop("1366", "768");
     })
    .go();
