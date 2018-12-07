include(["engines", "wine", "quick_script", "local_installer_script"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("SimCity (2013)")
            .editor("Electronic Arts")
            .applicationHomepage("http://www.origin.com/")
            .author("ZemoScripter")
            .category("Category")
            .executable("Origin.exe")
            .wineVersion("3.16")
            .wineDistribution("staging")
            .go();
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);

