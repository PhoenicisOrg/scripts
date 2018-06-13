include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Medieval II: Total War™")
            .editor("The Creative Assembly, Feral Interactive (Mac), Feral Interactive (Linux)")
            .author("Plata")
            .appId(4700)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
