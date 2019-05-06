include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("The Elder Scrolls IV: Oblivion")
            .editor("Bethesda Game Studios")
            .author("ImperatorS79")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .appId(22330)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
