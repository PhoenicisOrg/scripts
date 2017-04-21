include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Engines", "Wine"]);

var setupWizard = SetupWizard("Stronghold HD");

setupWizard.presentation("Stronghold HD", "FireFly Studios", "http://#", "odziom91");

var wine = new Wine()
    .wizard(setupWizard)
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
