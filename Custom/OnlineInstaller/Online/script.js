include(["Functions", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .editor("PlayOnLinux")
    .applicationHomepage("https://www.playonlinux.com/en/")
    .author("Plata")
    .category("Custom")
    .wineUserSettings(true)
    .go();
