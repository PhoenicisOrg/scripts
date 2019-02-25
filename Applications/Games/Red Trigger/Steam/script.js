include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Red Trigger")
            .editor("Maxime Vézina")
            .author("Plata")
            .appId(491130)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
