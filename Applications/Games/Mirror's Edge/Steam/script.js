include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "physx"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Mirror's Edge™")
            .editor("DICE")
            .author("Plata")
            .appId(17410)
            .preInstall(function (wine/*, wizard*/) {
                wine.physx();
                wine.setManagedForApplication().set("MirrorsEdge.exe", false).do();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
