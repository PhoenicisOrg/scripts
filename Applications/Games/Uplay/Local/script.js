include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("Uplay")
    .editor("Ubisoft")
    .applicationHomepage("https://uplay.ubi.com/")
    .author("Plata")
    .category("Games")
    .executable("UbisoftGameLauncher.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .go();
