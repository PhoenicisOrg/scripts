include("engines.wine.quick_script.online_installer_script");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.d3dx9");
include("engines.wine.verbs.vcrun2008");

new OnlineInstallerScript()
    .name("Earth Eternal - Valkal's Shadow")
    .editor("Team TAW")
    .applicationHomepage("http://www.theanubianwar.com/valkals-shadow")
    .author("rockfireredmoon")
    .url("http://www.theanubianwar.com/sites/default/files/downloads/EarthEternal_Valkals_Shadow_Setup.exe")
    .installationArgs(["/S"])
    .category("Games")
    .executable("Spark.exe", ["http://live.theanubianwar.com/Release/Current/EarthEternal.car"])
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine.windowsVersion("winxp");
        wine.corefonts();
        wine.d3dx9();
        wine.vcrun2008();
    });
