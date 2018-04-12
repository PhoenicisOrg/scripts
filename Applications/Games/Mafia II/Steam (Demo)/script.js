include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Mafia II (Demo)")
            .editor("2K Czech, Feral Interactive (Mac)")
            .author("Plata")
            .appId(50280)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
