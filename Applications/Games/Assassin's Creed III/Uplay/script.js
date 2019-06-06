include("engines.wine.quick_script.uplay_script");
include("engines.wine.verbs.dxvk");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.vcrun2008");

var installerImplementation = {
    run: function () {
        new UplayScript()
            .name("Assassin's Creed III")
            .editor("Ubisoft, Gameloft, Ubisoft Montreal, Blue Byte, MORE")
            .applicationHomepage("https://www.ubisoft.com/en-us/game/assassins-creed")
            .author("KREYREN")
            .appId(54)
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION)
            .preInstall(function (wine/*, wizard*/) {
                wine.DXVK();
                wine.corefonts();
                wine.vcrun2008();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
