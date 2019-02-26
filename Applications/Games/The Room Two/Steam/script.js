include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("The Room Two")
            .editor("Fireproof Games")
            .author("Plata")
            .appId(425580)
            .executable("Steam.exe", ["-silent", "-applaunch", 425580, "-force-d3d9"])
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
