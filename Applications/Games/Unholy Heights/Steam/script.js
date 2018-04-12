include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "dotnet40"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Unholy Heights")
            .editor("AGM PLAYISM")
            .author("madoar")
            .appId(249330)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .preInstall(function (wine/*, wizard*/) {
                wine.dotnet40();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
