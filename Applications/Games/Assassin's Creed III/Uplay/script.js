include("engines.wine.quick_script.uplay_script");
include("engines.wine.verbs.dxvk");

var installerImplementation = {
    run: function () {
        new UplayScript()
            .name("Assassin's Creed III")
            .editor("Ubisoft, Gameloft, Ubisoft Montreal, Blue Byte, MORE")
            .applicationHomepage("https://www.ubisoft.com/en-us/game/assassins-creed")
            .author("KREYREN")
            .appId(54)
            .preInstall(function (wine/*, wizard*/) {
                wine.DXVK();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
