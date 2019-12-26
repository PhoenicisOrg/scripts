const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");
const DXVK = include("engines.wine.verbs.dxvk");

const WindowsVersion = include("engines.wine.plugins.windows_version");
const OverrideDLL = include("engines.wine.plugins.override_dll");

new OnlineInstallerScript()
    .name("Overwatch")
    .editor("Blizzard")
    .applicationHomepage("http://www.playoverwatch.com/")
    .author("ImperatorS79, kreyren")
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=Overwatch-Setup.exe")
    //The checksum is different each time you download
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .category("Games")
    .executable("Battle.net.exe")
    .preInstall(function (wine) {
        new WindowsVersion(wine).withWindowsVersion("win7").go();

        new Vcrun2015(wine).go();
        new Corefonts(wine).go();

        new OverrideDLL(wine).withMode("disabled", ["nvapi", "nvapi64"]).go();

        new DXVK(wine).go();
    });
