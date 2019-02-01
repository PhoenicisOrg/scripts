include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "dotnet472"]);
include(["engines", "wine", "verbs", "vcrun2017"]);
//include(["engines", "wine", "verbs", "dxvk"]);
//include(["engines", "wine", "verbs", "faudio"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Space Engineers")
            .editor("Keen Software House")
            .author("Zemogiter")
            .appId(244850)
            .wineVersion("4.0")
            .wineDistribution("upstream")
            .wineArchitecture("amd64")
            .preInstall(function (wine, wizard) {
                var operatingSystemFetcher = Bean("operatingSystemFetcher");
                print("Debug output: " + operatingSystemFetcher.fetchCurrentOperationSystem());
                if (operatingSystemFetcher.fetchCurrentOperationSystem() != "Linux")
                {
                    throw "This game will not work under your OS due to MoltenVK not being implemented into Wine.".format("Space Engineers");
                }
                wizard.message(tr("Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else this game will not work."));
                wine.dotnet472();
                wine.vcrun2017();
                //wine.DXVK();
                //wine.faudio();
            })
            .gameOverlay(false)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
