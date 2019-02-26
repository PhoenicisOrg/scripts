include("engines.wine.quick_script.local_installer_script");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Europa Universalis II")
            .editor("Ubisoft")
            .author("ImperatorS79")
            .category("Games")
            .executable("eu2.exe")
        //TO DO : find static link to 1.07 and 1.09 update, and add a .postinstall.
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
