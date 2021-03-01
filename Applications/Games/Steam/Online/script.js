const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Steam")
    .editor("Valve")
    .applicationHomepage("https://www.steampowered.com")
    .author("Quentin PÂRIS")
    .url("https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe")
    .checksum("0308b646b70fa915c6fb1bc7df5212940c7a938e")
    .category("Games")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .preInstall((wine) => {
        new Corefonts(wine).go();
    })
    .executable("steam.exe", ["-no-cef-sandbox"]);
