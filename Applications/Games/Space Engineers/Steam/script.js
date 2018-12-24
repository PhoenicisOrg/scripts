include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "dotnet461"]);
include(["engines", "wine", "verbs", "vcrun2015"]);
include(["engines", "wine", "verbs", "dxvk"]);
include(["engines", "wine", "verbs", "xact"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Space Engineers")
            .editor("Keen Software House")
            .author("Zemogiter")
            .appId(244850)
            .wineVersion("4.0-rc3")
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .preInstall(function (wine, wizard) {
                    var operatingSystemFetcher = Bean("operatingSystemFetcher");
                    if (operatingSystemFetcher.fetchCurrentOperationSystem() !== "Linux")
                    {
                        wizard.message(tr("This game will not work under your operating system due to missing MoltenVK implementation in Wine. Aborting the script."));
                        break;
                    }
                }
                wizard.message(tr("Please ensure you have the latest drivers (415.25 minimum for NVIDIA and mesa 19 for AMD) or else this game will not work."));
                wine.dotnet461();
                wine.vcrun2015();
                wine.DXVK();
                wine.xact();
            })
            .gameOverlay(false)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
