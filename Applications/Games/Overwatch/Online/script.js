const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { LATEST_STAGING_VERSION } = include("engines.wine.engine.versions");

include("engines.wine.plugins.windows_version");
include("engines.wine.plugins.override_dll");
const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");
const DXVK = include("engines.wine.verbs.dxvk");

new OnlineInstallerScript()
    .name("Overwatch")
    .editor("Blizzard")
    .applicationHomepage("http://www.playoverwatch.com/")
    .author("ImperatorS79, kreyren")
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=Overwatch-Setup.exe")
    //The checksum is different each time you download
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .category("Games")
    .executable("Battle.net.exe")
    .preInstall(function (wine /*, wizard*/) {
        wine.windowsVersion("win7");

        new Vcrun2015(wine).go();
        new Corefonts(wine).go();

        wine.overrideDLL()
            .set("disabled", ["nvapi", "nvapi64"])
            .do();

        new DXVK(wine).go();
    });
