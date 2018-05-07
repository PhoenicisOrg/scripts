include(["engines", "wine", "quick_script", "steam_script"]);

include(["engines", "wine", "verbs", "d3dx10"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("It came from space, and ate our brains")
            .editor("Triangle Studios")
            .author("madoar")
            .appId(342620)
            .preInstall(function (wine/*, wizard*/) {
                wine.d3dx10();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
