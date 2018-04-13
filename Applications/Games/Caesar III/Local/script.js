include(["engines", "wine", "quick_script", "local_installer_script"]);
include(["engines", "wine", "engine", "object"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Caesar III")
            .editor("Impressions Games")
            .author("ImperatorS79")
            .category("Games")
            .executable("c3.exe")
            .postInstall(function (wine/*, wizard*/) {
                wine.setVirtualDesktop(1280, 1024);
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
