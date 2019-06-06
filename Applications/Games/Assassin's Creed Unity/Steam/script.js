include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dxvk");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Assassin’s Creed® Unity")
            .editor("Ubisoft")
            .author("Plata")
            .appId(289650)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .preInstall(function (wine/*, wizard*/) {
                wine.DXVK();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
