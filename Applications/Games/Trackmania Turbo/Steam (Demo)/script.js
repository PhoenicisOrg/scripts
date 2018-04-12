include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "uplay"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Trackmania® Turbo (Demo)")
            .editor("Nadeo")
            .author("Plata")
            .appId(456400)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .postInstall(function (wine/*, wizard*/) {
                wine.uplay();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
