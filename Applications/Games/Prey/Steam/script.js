include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Prey")
            .editor("Arkane Studios")
            .author("Plata")
            .appId(480490)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
