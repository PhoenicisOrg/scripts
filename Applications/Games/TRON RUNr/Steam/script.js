include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("TRON RUN/r")
            .editor("Sanzaru Games Inc.")
            .author("Plata")
            .appId(392000)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
