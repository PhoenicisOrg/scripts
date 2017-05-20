include(["Functions", "QuickScript", "OnlineInstallerScript"]);
include(["Functions", "Verbs", "corefonts"]);
include(["Functions", "Verbs", "vcrun2015"]);

new OnlineInstallerScript()
    .name("Warcraft III")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/en/")
    .author("FalseCAM")
    .url("https://www.battle.net/download/getLegacy?product=WAR3&locale=en-US&os=WIN")
    .category("Games")
    .wineUserSettings(true)
    .executable("Warcraft III.exe")
    .wineVersion("2.7")
    .wineDistribution("staging")
    .preInstall(function (wine, wizard) {
        wine.windowsVersion("winxp");
        wine.corefonts();
        wine.vcrun2015();
    })
    .go();

new OnlineInstallerScript()
    .name("Warcraft III")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/en/")
    .author("FalseCAM")
    .url("https://www.battle.net/download/getLegacy?product=W3XP&locale=en-US&os=WIN")
    .category("Games")
    .wineUserSettings(true)
    .executable("Frozen Throne.exe")
    .wineVersion("2.7")
    .wineDistribution("staging")
    .preInstall(function (wine, wizard) {
        wine.windowsVersion("winxp");
        wine.corefonts();
        wine.vcrun2015();
    })
    .go();
