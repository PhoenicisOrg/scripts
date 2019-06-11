include("engines.wine.quick_script.local_installer_script");
include("engines.wine.engine.object");
include("engines.wine.plugins.csmt");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.d3dx9");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Command and Conquer - Tiberium Wars")
            .editor("SAGE")
            .author("qdii")
            .category("Games")
            .executable("CNC3.exe")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .preInstall(function (wine/*, wizard*/) {
                wine.windowsVersion("winxp")
                wine.d3dx9();
                wine.enableCSMT();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
