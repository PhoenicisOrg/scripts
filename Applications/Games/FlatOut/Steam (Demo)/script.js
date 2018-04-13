include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("FlatOut (Demo)")
            .editor("Bugbear Entertainment")
            .author("Plata")
            .appId(6230)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
