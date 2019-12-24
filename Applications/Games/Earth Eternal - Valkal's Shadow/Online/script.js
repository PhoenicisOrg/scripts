const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const WindowsVersion = include("engines.wine.plugins.windows_version");
const Corefonts = include("engines.wine.verbs.corefonts");
const D3DX9 = include("engines.wine.verbs.d3dx9");
const Vcrun2008 = include("engines.wine.verbs.vcrun2008");

new OnlineInstallerScript()
    .name("Earth Eternal - Valkal's Shadow")
    .editor("Team TAW")
    .applicationHomepage("http://www.theanubianwar.com/valkals-shadow")
    .author("rockfireredmoon")
    .url("http://www.theanubianwar.com/sites/default/files/downloads/EarthEternal_Valkals_Shadow_Setup.exe")
    .installationArgs(["/S"])
    .category("Games")
    .executable("Spark.exe", ["http://live.theanubianwar.com/Release/Current/EarthEternal.car"])
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .preInstall(function (wine) {
        new WindowsVersion(wine).withWindowsVersion("winxp").go();
        new Corefonts(wine).go();
        new D3DX9(wine).go();
        new Vcrun2008(wine).go();
    });
