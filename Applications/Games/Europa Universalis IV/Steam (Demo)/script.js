include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Europa Universalis IV (Demo)")
            .editor("Paradox Development Studio")
            .author("Plata")
            .appId(247890)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
