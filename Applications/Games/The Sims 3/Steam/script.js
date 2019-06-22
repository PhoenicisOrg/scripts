include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dotnet20");
include("engines.wine.verbs.vcrun2010");
include("engines.wine.verbs.tahoma");
include("engines.wine.verbs.mfc42");

new SteamScript()
    .name("The Sims 3")
    .editor("Electronic Arts")
    .applicationHomepage("http://www.thesims3.com/")
    .author("Zemogiter")
    .wineDistribution("upstream")
    .wineVersion("4.0-rc2")
    .appId(47890)
    .preInstall(function (wine /*, wizard*/) {
        wine.dotnet20();
        wine.mfc42();
        wine.tahoma();
        wine.vcrun2010();
    })
    .gameOverlay(false)
    .executable("Steam.exe", ["-silent", "-applaunch", 47890, "-no-ces-sandbox", "xgamma -gamma 1"]);
