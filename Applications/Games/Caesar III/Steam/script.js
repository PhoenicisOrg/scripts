include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "engine", "object"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Caesar III")
            .editor("Impressions Games")
            .author("ImperatorS79")
            .appId(517790)
            .postInstall(function (wine/*, wizard*/) {
                wine.setVirtualDesktop(1280, 1024);
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
