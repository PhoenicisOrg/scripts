const SteamScript = include("engines.wine.quick_script.steam_script");

const Corefonts = include("engines.wine.verbs.corefonts");
const DotNET45 = include("engines.wine.verbs.dotnet45");
const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const DXVK = include("engines.wine.verbs.dxvk");

new SteamScript()
    .name("Elite:Dangerous")
    .editor("Frontier Developments")
    .author("ImperatorS79")
    .wineArchitecture("amd64")
    .preInstall(function (wine /*, wizard*/) {
        new DotNET45(wine).go();
        new Corefonts(wine).go();
        new Vcrun2015(wine).go();
        new DXVK(wine).go();
    })
    .appId(359320);
