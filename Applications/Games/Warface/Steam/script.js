include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.csmt");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Warface")
            .editor("Crytek")
            .author("ImperatorS79")
            .appId(291480)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .postInstall(function (wine/*, wizard*/) {
                wine.enableCSMT();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
