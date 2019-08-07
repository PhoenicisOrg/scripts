const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
include("engines.wine.plugins.csmt");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.d3dx9");

new LocalInstallerScript()
    .name("Command and Conquer - Tiberium Wars")
    .editor("SAGE")
    .author("qdii")
    .category("Games")
    .executable("CNC3.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine.windowsVersion("winxp");
        wine.d3dx9();
        wine.enableCSMT();
    });
