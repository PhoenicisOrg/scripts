include(["Functions", "Functions", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Uplay")
    .editor("Ubisoft")
    .applicationHomepage("https://uplay.ubi.com/")
    .author("Plata")
    .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
    .category("Games")
    .executable("UbisoftGameLauncher.exe")
    .wineVersion("2.1")
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("vista");
    })
    .go();
