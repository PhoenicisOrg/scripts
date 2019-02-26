include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Call of Juarez® Gunslinger (Demo)")
            .editor("Techland")
            .author("Plata")
            .appId(222400)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
