include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Shower With Your Dad Simulator 2015: Do You Still Shower With Your Dad?")
            .editor("marbenx")
            .author("Brainzyy")
            .appId(359050)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
