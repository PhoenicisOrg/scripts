include(["Functions", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .editor("PlayOnLinux")
    .applicationHomepage("https://www.playonlinux.com/en/")
    .author("Plata")
    .category("Custom")
    .wineUserSettings(true)
    .go();
