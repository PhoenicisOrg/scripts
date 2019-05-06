include("engines.wine.quick_script.online_installer_script");

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Icy Tower 1.5")
            .editor("Johan Peitz (Free Lunch Design)")
            .applicationHomepage("http://www.icytower.cz/")
            .author("odziom91")
            .url("http://www.icytower.cz/download/icytower15_install.exe")
            .category("Games")
            .executable("icytower15.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
