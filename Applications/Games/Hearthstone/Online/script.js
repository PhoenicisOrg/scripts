include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2015"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new OnlineInstallerScript()
    .name("Hearthstone")
    .editor("Blizzard")
    .applicationHomepage("https://eu.battle.net/hearthstone/")
    .author("ImperatorS79")
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=Hearthstone-Setup.exe")
    .category("Games")
    .executable("Hearthstone.exe")
    .wineVersion("2.15")
    .wineDistribution("staging")
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("winxp");
        wine.vcrun2015();
        wine.corefonts();
    })
    .go(); 
