include(["Functions", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .url("https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi")
    .checksum("53f167f8a80ef38a75c796be2cbf3847cb32d5ff")
    .category("Games")
    .executable("EpicGamesLauncher.exe")
    .wineVersion("2.5")
    .wineDistribution("staging")
    .go();
