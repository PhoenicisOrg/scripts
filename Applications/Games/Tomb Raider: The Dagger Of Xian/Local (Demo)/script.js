include(["engines", "wine", "quick_script", "local_installer_script"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Tomb Raider: The Dagger Of Xian (Demo)")
            .editor("Nicobass")
            .applicationHomepage("http://tombraider-dox.com/")
            .author("Plata")
            .category("Games")
            .executable("TombRaiderDOX.exe")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
