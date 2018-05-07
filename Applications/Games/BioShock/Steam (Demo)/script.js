include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("BioShock™ (Demo)")
            .editor("2K Boston , 2K Australia")
            .author("Plata")
            .appId(7710)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
