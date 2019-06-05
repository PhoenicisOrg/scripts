include("engines.wine.quick_script.uplay_script");

var installerImplementation = {
    run: function () {
        new UplayScript()
            .name("Assassin's Creed")
            .editor("Ubisoft, Gameloft, Ubisoft Montreal, Blue Byte, MORE")
            .applicationHomepage("https://www.ubisoft.com/en-us/game/assassins-creed")
            .author("KREYREN")
            .appId(720)
            .go();
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
