const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
include("engines.wine.plugins.windows_version");

new LocalInstallerScript()
    .editor("PlayOnLinux")
    .applicationHomepage("https://www.playonlinux.com/en/")
    .author("Plata")
    .category("Custom")
    .wineUserSettings(true)
    .preInstall(function (wine, wizard) {
        var versions = ["win7", "vista", "win2003", "winxp", "win2k", "winnt", "winme", "win98", "win95", "win31"];
        var shownVersions = [
            "win7",
            "vista",
            "win2003",
            "winxp (recommended)",
            "win2k",
            "winnt",
            "winme",
            "win98",
            "win95",
            "win31"
        ];
        var selectedVersion = wizard.menu("Please select the wine windows version.", shownVersions, "winxp (recommended)");
        wine.windowsVersion(versions[selectedVersion.index]);
    });
