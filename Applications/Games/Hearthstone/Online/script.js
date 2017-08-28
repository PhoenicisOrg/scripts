include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2015"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new OnlineInstallerScript()
    .name("Hearthstone")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/en/app/")
    .author("ImperatorS79")
    .url("https://www.battle.net/download/getInstallerForGame?os=win&locale=enGB&version=LIVE&gameProgram=BATTLENET_APP.exe")
    .category("Games")
    .executable("Battle.net.exe")
    .wineVersion("2.15")
    .wineDistribution("staging")
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("winxp");
        wine.vcrun2015();
        wine.corefonts();
    })
    .go(); 
