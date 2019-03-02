include("engines.wine.quick_script.steam_script");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("ChromaGun (Demo)")
            .editor("Pixel Maniacs")
            .author("Plata")
            .appId(455660)
            .executable("chromagun.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
