include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);
include(["Engines", "Wine", "Verbs", "vcrun2015"]);

new OnlineInstallerScript()
    .name("Warcraft III")
    .editor("Blizzard")
    .applicationHomepage("http://eu.blizzard.com/en-gb/games/war3/")
    .author("FalseCAM")
    .url("https://www.battle.net/download/getLegacy?product=WAR3&locale=en-US&os=WIN")
    .category("Games")
    .executable("Warcraft III.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine, wizard) {
        wine.windowsVersion("winxp");
        wine.corefonts();
        wine.vcrun2015();
    })
    .go();
