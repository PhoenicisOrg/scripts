include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("PAYDAY™ The Heist")
            .editor("OVERKILL Software")
            .author("Brainzyy")
            .appId(24240)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
