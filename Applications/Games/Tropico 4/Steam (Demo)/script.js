include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Tropico 4 (Demo)")
            .editor("Haemimont Games, Feral Interactive (Mac)")
            .author("Plata")
            .appId(57750)
            .executable("Tropico4-demo.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
