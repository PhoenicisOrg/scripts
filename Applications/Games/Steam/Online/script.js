const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { LATEST_STAGING_VERSION } = include("engines.wine.engine.versions");

const Corefonts = include("engines.wine.verbs.corefonts");
const WindowsVersion = include("engines.wine.plugins.windows_version");

new OnlineInstallerScript()
    .name("Steam")
    .editor("Valve")
    .applicationHomepage("https://www.steampowered.com")
    .author("Quentin PÂRIS")
    .url("https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe")
    .checksum("4b1b85ec2499a4ce07c89609b256923a4fc479e5")
    .category("Games")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function(wine) {
        new WindowsVersion(wine)
            .withApplicationWindowsVersion("steam.exe", "winxp")
            .withApplicationWindowsVersion("steamwebhelper.exe", "winxp")
            .go();

        new Corefonts(wine).go();
    })
    .executable("Steam.exe", ["-no-cef-sandbox"]);
