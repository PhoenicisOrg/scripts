const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const WindowsVersion = include("engines.wine.plugins.windows_version");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Uplay")
    .editor("Ubisoft")
    .applicationHomepage("https://uplay.ubi.com/")
    .author("Plata, KREYREN")
    .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
    .category("Games")
    .executable("UbisoftGameLauncher.exe")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .preInstall((wine) => {
        new Corefonts(wine).go();

        new WindowsVersion(wine)
            .withApplicationWindowsVersion("upc.exe", "winvista")
            .withApplicationWindowsVersion("UbisoftGameLauncher.exe", "winvista")
            .go();
    });
