include("engines.wine.quick_script.local_installer_script");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("SimCity (2013)")
            .editor("Electronic Arts")
            .applicationHomepage("https://www.ea.com/en-gb/games/simcity")
            .author("ZemoScripter")
            .category("Category")
            .executable("Origin.exe")
            .wineVersion("3.19")
            .wineDistribution("staging")
            .go();
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);

