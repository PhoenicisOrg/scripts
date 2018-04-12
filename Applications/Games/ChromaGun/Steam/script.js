include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("ChromaGun")
            .editor("Pixel Maniacs")
            .author("Plata")
            .appId(408650)
            .executable("chromagun.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
