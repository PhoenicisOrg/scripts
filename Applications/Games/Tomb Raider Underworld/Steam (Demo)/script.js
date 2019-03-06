include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Tomb Raider: Underworld (Demo)")
            .editor("Crystal Dynamics")
            .author("Plata")
            .appId(8150)
            .gameOverlay(false)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
