include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.usetakefocus")


var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Minion Masters")
            .applicationHomepage("http://minionmastersthegame.com/") // https not supported [05.06.2019]
            .appId(50130)
            .author("KREYREN")
            .category("Games")
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION)
            .preInstall(function (wine/*, wizard*/) {
                wine.UseTakeFocus("N"); // Mandatory to avoid focus issues
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
