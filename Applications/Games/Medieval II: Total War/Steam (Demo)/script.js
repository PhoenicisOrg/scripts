include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Medieval II: Total War™ (Demo)")
            .editor("The Creative Assembly, Feral Interactive (Mac), Feral Interactive (Linux)")
            .author("Plata")
            .appId(4710)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
