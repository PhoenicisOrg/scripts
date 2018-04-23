include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("The Elder Scrolls V: Skyrim")
            .editor("Bethesda Softworks")
            .author("Quentin PARIS")
            .appId(72850)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
