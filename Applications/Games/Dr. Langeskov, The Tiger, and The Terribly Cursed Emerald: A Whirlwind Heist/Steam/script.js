include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Dr. Langeskov, The Tiger, and The Terribly Cursed Emerald: A Whirlwind Heist")
            .editor("Crows Crows Crows")
            .author("Plata")
            .appId(409160)
            .executable("Steam.exe", ["-applaunch", 409160, "-force-d3d9"])
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
