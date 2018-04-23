include(["engines", "wine", "quick_script", "local_installer_script"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Resident Evil 3")
            .editor("Capcom")
            .applicationHomepage("http://www.residentevil.com/")
            .author("odziom91")
            .category("Games")
            .executable("ResidentEvil3.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
