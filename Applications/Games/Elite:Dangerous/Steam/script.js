include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "verbs", "dotnet40"]);
include(["engines", "wine", "verbs", "vcrun2015"]);
include(["engines", "wine", "verbs", "dxvk"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Elite:Dangerous")
            .editor("Frontier Developments")
            .author("ImperatorS79")
            .wineVersion(LATEST_STABLE_VERSION)
            .wineDistribution("upstream")
            .wineArchitecture("amd64")
            .preInstall(function (wine/*, wizard*/) {
                wine.dotnet40();
                wine.corefonts();
                wine.vcrun2015();
                wine.DXVK();
            })
            .appId(359320)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
