include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "vcrun2008"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Quantum Conundrum")
            .editor("Square Enix")
            .author("Plata")
            .appId(200010)
            .preInstall(function (wine/*, wizard*/) {
                wine.vcrun2008();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
