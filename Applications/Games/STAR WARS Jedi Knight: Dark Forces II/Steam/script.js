include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("STAR WARS™ Jedi Knight: Dark Forces II")
            .editor("LucasArts")
            .author("Plata")
            .appId(32380)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
