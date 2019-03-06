include("engines.wine.quick_script.local_installer_script");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Uplay")
            .editor("Ubisoft")
            .applicationHomepage("https://uplay.ubi.com/")
            .author("Plata")
            .category("Games")
            .executable("UbisoftGameLauncher.exe")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
