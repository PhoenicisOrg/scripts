include("engines.wine.quick_script.local_installer_script");
include("engines.wine.verbs.vcrun2010");
include("engines.wine.verbs.tahoma");
include("engines.wine.verbs.mfc42");
include("engines.wine.verbs.dotnet20");

new LocalInstallerScript()
    .name("The Sims 3")
    .editor("Electronic Arts")
    .applicationHomepage("http://www.thesims3.com/")
    .author("Zemogiter")
    .category("Games")
    .executable("Sims3Launcher.exe", ["xgamma -gamma 1"])
    .preInstall(function (wine) {
        wine.mfc42();
        wine.tahoma();
        wine.vcrun2010();
        wine.dotnet20();
    });
