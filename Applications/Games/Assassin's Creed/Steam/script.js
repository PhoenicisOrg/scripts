include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dxvk");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Assassin's Creed™")
            .editor("Ubisoft Montréal")
            .author("ImperatorS79")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .appId(15100)
            .preInstall(function (wine/*, wizard*/) {
                wine.DXVK();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
