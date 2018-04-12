include(["engines", "wine", "quick_script", "local_installer_script"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("18 Wheels of Steel: Across America")
            .editor("SCS Software")
            .applicationHomepage("http://www.scssoft.com/")
            .author("odziom91")
            .category("Games")
            .executable("aa.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
