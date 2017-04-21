include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Engines", "Wine"]);

var wine = new Wine()
    .prefix("Stronghold")
    .create()
    .setVirtualDesktop("1366", "768")
.do();

new SteamScript()
    .name("Stronghold")
    .editor("FireFly Studios")
    .author("odziom91")
    .appId(40950)
    .go();
