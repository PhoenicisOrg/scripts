include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dxvk");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Assassin’s Creed IV Black Flag")
            .editor("Ubisoft Montreal")
            .author("Plata")
            .appId(242050)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .postInstall(function (wine/*, wizard*/) {
                // the automatically installed Uplay version does not update properly
                wine.uplay();
                wine.DXVK();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
