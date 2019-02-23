include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Burnout™ Paradise: The Ultimate Box")
            .editor("Criterion Games")
            .author("Plata")
            .appId(24740)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
