const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Steam")
    .editor("Valve")
    .applicationHomepage("https://www.steampowered.com")
    .author("Quentin PÂRIS")
    .url("https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe")
    .checksum("4b1b85ec2499a4ce07c89609b256923a4fc479e5")
    .category("Games")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .preInstall(function (wine) {
        new Corefonts(wine).go();
    })
    .executable("Steam.exe", ["-no-cef-sandbox"]);
