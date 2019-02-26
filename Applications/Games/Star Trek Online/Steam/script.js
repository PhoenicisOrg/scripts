include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Star Trek Online")
            .editor("Cryptic Studios")
            .author("ImperatorS79")
            .appId(9900)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
