include("engines.wine.quick_script.online_installer_script");

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("osu!")
            .editor("Jeffrey itdelatrisu Han")
            .applicationHomepage("https://github.com/itdelatrisu/opsu")
            .author("Kreyren")
            .category("Games")
            .executable("opsu-0.16.1.jar")
            .url("https://github.com/itdelatrisu/opsu/releases/download/0.16.1/opsu-0.16.1.jar")
            // TODO: Export java with the game.
            /// The Java Runtime Environment (JRE) 7 or higher must be installed in order to run opsu!. The download page is located here.
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
