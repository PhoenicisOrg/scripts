include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Consortium: The Tower (Demo)")
            .editor("Interdimensional Games Inc")
            .author("Plata")
            .appId(726310)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
