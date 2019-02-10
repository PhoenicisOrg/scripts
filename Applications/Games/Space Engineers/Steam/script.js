include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "dotnet472"]);
include(["engines", "wine", "verbs", "vcrun2017"]);
include(["engines", "wine", "verbs", "dxvk"]);
//include(["engines", "wine", "verbs", "faudio"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Space Engineers")
            .editor("Keen Software House")
            .author("Zemogiter")
            .appId(244850)
            .wineVersion("4.1")
            .wineDistribution("upstream")
            .wineArchitecture("amd64")
            .preInstall(function (wine, /*wizard*/) {
                wine.dotnet472();
                wine.vcrun2017();
                wine.DXVK();
                //wine.faudio();
            })
            .gameOverlay(false)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
