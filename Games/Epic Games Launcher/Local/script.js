include(["Functions", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .category("Games")
    .executable("EpicGamesLauncher.exe")
    .wineVersion("2.9")
    .wineDistribution("staging")
    .go();
