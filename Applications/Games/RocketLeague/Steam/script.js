include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Rocket League")
            .editor("Psyonix, Panic Button Games")
            .publisher("Psyonix")
            .author("Kreyren")
            .appId(252950)
            .wineVersion("3.16-7 Beta") // Needs sanity check
            .wineDistribution("proton") // Needs sanity check
            .gameOverlay(false) // May be required for in-game purchases
            .category("Games/esport") // Sanity check
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
