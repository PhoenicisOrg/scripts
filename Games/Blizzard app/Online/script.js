include(["Functions", "QuickScript", "OnlineInstallerScript"]);
include(["Functions", "Verbs", "vcrun2015"]);

new OnlineInstallerScript()
    .name("Blizzard app")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/en/app/")
    .author("Plata")
    .url("https://www.battle.net/download/getInstallerForGame?os=win&locale=enGB&version=LIVE&gameProgram=BATTLENET_APP")
    .category("Games")
    .executable("Battle.net.exe")
    .wineVersion("2.6")
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("winxp");
        wine.vcrun2015();
    })
    .go();
