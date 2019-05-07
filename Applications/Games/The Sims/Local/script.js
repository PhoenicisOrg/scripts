include("engines.wine.quick_script.local_installer_script");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("The Sims")
            .editor("Maxis")
            .applicationHomepage("http://www.thesims.com/")
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION)
            .author("Zemogiter")
            .category("Games")
            .executable("Sims.exe", ["-skip_intro"])
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
