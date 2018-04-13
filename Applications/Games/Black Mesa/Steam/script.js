include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Black Mesa")
            .editor("Crowbar Collective")
            .author("Quentin PARIS")
            .appId(362890)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
