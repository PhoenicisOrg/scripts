include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Scribblenauts Unlimited")
            .editor("5th Cell Media")
            .author("Brainzyy")
            .appId(218680)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
