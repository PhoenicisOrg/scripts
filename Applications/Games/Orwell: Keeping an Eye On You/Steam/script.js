include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Orwell: Keeping an Eye On You")
            .editor("Osmotic Studios")
            .author("Plata")
            .appId(491950)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
