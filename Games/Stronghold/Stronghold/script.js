include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Engines", "Wine"]);

var setupWizard = SetupWizard("Stronghold HD");

setupWizard.presentation("Stronghold HD", "FireFly Studios", "http://#", "odziom91");

var wine = new Wine()
    .wizard(setupWizard)
    .version(LATEST_STABLE_VERSION)
    .distribution("upstream")
    .architecture("x86")
    .prefix("Stronghold HD")
    .create()
    .wait()
    .setVirtualDesktop("1366", "768")
    .wait()
.do();


new SteamScript()
    .name("Stronghold HD")
    .editor("FireFly Studios")
    .author("odziom91")
    .appId(40950)
    .go();
