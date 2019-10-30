const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

const WindowsVersion = include("engines.wine.plugins.windows_version");

new LocalInstallerScript()
    .editor("PlayOnLinux")
    .applicationHomepage("https://www.playonlinux.com/en/")
    .author("Plata")
    .category("Custom")
    .wineUserSettings(true)
    .preInstall(function (wine) {
        const wizard = wine.wizard();

        const versions = ["win7", "vista", "win2003", "winxp", "win2k", "winnt", "winme", "win98", "win95", "win31"];
        const shownVersions = [
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

        const selectedVersion = wizard.menu(
            "Please select the wine windows version.",
            shownVersions,
            "winxp (recommended)"
        );

        new WindowsVersion(wine).withWindowsVersion(versions[selectedVersion.index]).go();
    });
