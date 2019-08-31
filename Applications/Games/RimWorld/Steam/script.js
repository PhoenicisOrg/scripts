const SteamScript = include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.vcrun2017");
const D3DX9 = include("engines.wine.verbs.d3dx9");
const Corefonts = include("engines.wine.verbs.corefonts");

new SteamScript()
    .name("RimWorld")
    .editor("Ludeon Studios")
    .author("Zemogiter")
    .applicationHomepage("https://rimworldgame.com/")
    .wineArchitecture("amd64")
    .appId(294100)
    .preInstall(function (wine) {
        new Corefonts(wine).go();
        wine.vcrun2017();
        new D3DX9(wine).go();
    });
