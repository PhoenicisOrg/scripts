include("engines.wine.quick_script.uplay_script");
include("engines.wine.verbs.dxvk");

var installerImplementation = {
    run: function () {
        new UplayScript()
            .name("Assassin's Creed Revelations")
            .editor("Ubisoft, Gameloft, Ubisoft Montreal, Blue Byte, MORE")
            .applicationHomepage("https://www.ubisoft.com/en-us/game/assassins-creed")
            .author("KREYREN")
            .appId(82)
            .postInstall(function (wine/*, wizard*/) {
                wine.uplay();
                wine.DXVK();
            })
            .go();
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
