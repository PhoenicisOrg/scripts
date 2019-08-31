const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Warcraft III Expansion Set")
    .editor("Blizzard")
    .applicationHomepage("http://www.blizzard.com/en-gb/games/war3/")
    .author("Grimler91")
    .url("https://www.battle.net/download/getInstaller?os=win&installer=Warcraft-III-Setup.exe")
// The checksum changes each time you download
    .category("Games")
    .executable("Warcraft III.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine.windowsVersion("winxp");
        new Corefonts(wine).go();
        wine.vcrun2015();
    });
