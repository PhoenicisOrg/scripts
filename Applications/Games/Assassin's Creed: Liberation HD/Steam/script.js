include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.uplay");
include("engines.wine.verbs.dxvk");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Assassin’s Creed Liberation")
            .editor("Ubisoft")
            .author("KREYREN")
            .appId(260210)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .postInstall(function (wine/*, wizard*/) {
                wine.uplay();
                wine.DXVK();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
