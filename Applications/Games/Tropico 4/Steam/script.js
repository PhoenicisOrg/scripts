include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Tropico 4")
            .editor("Haemimont Games, Feral Interactive (Mac)")
            .author("Plata")
            .appId(57690)
            .executable("Tropico4.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
