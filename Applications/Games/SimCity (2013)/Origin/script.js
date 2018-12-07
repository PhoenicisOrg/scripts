include(["engines", "wine", "quick_script", "online_installer_script"]);

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("SimCity (2013)")
            .editor("Electronic Arts")
            .applicationHomepage("http://www.origin.com/")
            .author("ZemoScripter")
            .url("https://origin-a.akamaihd.net/Origin-Client-Download/origin/live/OriginThinSetup.exe")
            .category("Games")
            .executable("Origin.exe")
            .wineVersion("3.16")
            .wineDistribution("staging")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
