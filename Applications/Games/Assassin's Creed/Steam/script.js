include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Assassin's Creed™")
            .editor("Ubisoft Montréal")
            .author("ImperatorS79")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .appId(15100)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
