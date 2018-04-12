include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("STAR WARS™ Jedi Knight II - Jedi Outcast™")
            .editor("Raven Software , Aspyr (Mac)")
            .author("Plata")
            .appId(6030)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
