const SteamScript = include("engines.wine.quick_script.steam_script");

const DotNET20 = include("engines.wine.verbs.dotnet20");
const Vcrun2010 = include("engines.wine.verbs.vcrun2010");
const Tahoma = include("engines.wine.verbs.tahoma");
const Mfc42 = include("engines.wine.verbs.mfc42");

new SteamScript()
    .name("The Sims 3")
    .editor("Electronic Arts")
    .applicationHomepage("http://www.thesims3.com/")
    .author("Zemogiter")
    .wineDistribution("upstream")
    .wineVersion("4.0-rc2")
    .appId(47890)
    .preInstall((wine /*, wizard*/) => {
        new DotNET20(wine).go();
        new Mfc42(wine).go();
        new Tahoma(wine).go();
        new Vcrun2010(wine).go();
    })
    .gameOverlay(false)
    .executable("Steam.exe", ["-silent", "-applaunch", 47890, "-no-ces-sandbox", "xgamma -gamma 1"]);
