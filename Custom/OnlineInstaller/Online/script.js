include(["Functions", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .editor("PlayOnLinux")
    .applicationHomepage("https://www.playonlinux.com/en/")
    .author("Plata")
    .category("Custom")
    .wineUserSettings(true)
    .preInstall(function(wine, wizard) {
        var windowsVersion = wizard.menu("Please select the wine windows version.", ["win7", "vista", "win2003", "winxp", "win2k", "winnt", "winme", "win98", "win95", "win31"], "winxp");
        wine.windowsVersion(windowsVersion)
    })
    .go();
