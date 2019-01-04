include(["engines", "wine", "quick_script", "lutris_wine_steam_script"]);

var installerImplementation = {
    run: function () {
        new LutrisWineSteamScript()
            .slug("the-elder-scrolls-iii-morrowi-steam")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
