include(["Functions", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Uplay")
    .editor("Ubisoft")
    .applicationHomepage("https://uplay.ubi.com/")
    .author("Plata")
    .url("http://static3.cdn.ubi.com/orbit/launcher_installer/UplayInstaller.exe")
    .category("Games")
    .executable("UbisoftGameLauncher.exe")
    .wineVersion("2.0")
    .wineDistribution("staging")
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("vista");
    })
    .go();
