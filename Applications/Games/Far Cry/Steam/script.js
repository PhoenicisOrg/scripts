include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Far Cry")
            .editor("Crytek GmbH")
            .author("ImperatorS79")
            .appId(13520)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
