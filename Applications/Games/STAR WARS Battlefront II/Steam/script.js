include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("STAR WARS™ Battlefront™ II")
            .editor("Pandemic Studios")
            .author("Plata")
            .appId(6060)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
