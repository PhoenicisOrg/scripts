include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("The Turing Test")
            .editor("Bulkhead Interactive")
            .author("Plata")
            .appId(499520)
            .wineArchitecture("amd64")
            .wineVersion(LATEST_DEVELOPMENT_VERSION)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
