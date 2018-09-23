include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "dotnet40"]);
include(["engines", "wine", "verbs", "vcrun2010"]);
include(["engines", "wine", "verbs", "tahoma"]);
include(["engines", "wine", "verbs", "mfc42"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("The Sims 3")
            .editor("Electronic Arts")
            .applicationHomepage("http://www.thesims3.com/")
            .author("Zemogiter")
            .wineDistribution("upstream")
            .wineVersion(3.16)
            .appId(47890)
            .preInstall(function (wine/*, wizard*/) {
                wine.dotnet40();
                wine.mfc42();
                wine.tahoma();
                wine.vcrun2010();
            })
            .gameOverlay(false)
            .executable("Steam.exe", ["-silent", "-applaunch", 47890, "-no-ces-sandbox", "xgamma -gamma 1"])
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
