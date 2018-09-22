include(["engines", "wine", "quick_script", "local_installer_script"]);
include(["engines", "wine", "verbs", "dotnet40"]);
include(["engines", "wine", "verbs", "vcrun2010"]);
include(["engines", "wine", "verbs", "tahoma"]);
include(["engines", "wine", "verbs", "mfc42"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("The Sims 3")
            .editor("Electronic Arts")
            .applicationHomepage("http://www.thesims3.com/")
            .author("Zemogiter")
            .category("Games")
            .executable("Sims3Launcher.exe", ["xgamma -gamma 1"])
            .wineVersion("3.15")
            .wineDistribution("upstream")
            .preInstall(function (wine){
                wine.dotnet40();
                wine.mfc42();
                wine.tahoma();
                wine.vcrun2010
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
