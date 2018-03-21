include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2015"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new OnlineInstallerScript()
    .name("Warcraft III Expansion Set")
    .editor("Blizzard")
    .applicationHomepage("http://www.blizzard.com/en-gb/games/war3/")
    .author("Grimler91")
    .url("https://www.battle.net/download/getInstaller?os=win&installer=Warcraft-III-Setup.exe")
    // The checksum changes each time you download
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
