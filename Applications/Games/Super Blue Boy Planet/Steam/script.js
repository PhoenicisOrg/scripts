include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Super Blue Boy Planet")
            .editor("Tuwi Michael Nannings")
            .author("Brainzyy")
            .appId(560260)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
