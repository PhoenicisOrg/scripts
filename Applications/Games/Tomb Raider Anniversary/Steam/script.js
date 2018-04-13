include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Tomb Raider: Anniversary")
            .editor("Crystal Dynamics, Feral Interactive (Mac)")
            .author("Plata")
            .appId(8000)
            .gameOverlay(false)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
