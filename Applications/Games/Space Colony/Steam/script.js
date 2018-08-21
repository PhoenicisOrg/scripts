include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "dotnet40"]);
include(["engines", "wine", "verbs", "vcrun2010"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Space Colony")
            .editor("Firefly Studios")
            .author("Zemogiter")
            .appId(297920)
            .preInstall(function (wine) {
                wine.dotnet40();
                wine.vcrun2010();
            })
            .go();
    }
};


/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
