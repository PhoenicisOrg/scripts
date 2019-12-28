const SteamScript = include("engines.wine.quick_script.steam_script");

const Vcrun2017 = include("engines.wine.verbs.vcrun2017");
const D3DX9 = include("engines.wine.verbs.d3dx9");
const Corefonts = include("engines.wine.verbs.corefonts");

new SteamScript()
    .name("RimWorld")
    .editor("Ludeon Studios")
    .author("Zemogiter")
    .applicationHomepage("https://rimworldgame.com/")
    .wineArchitecture("amd64")
    .appId(294100)
    .preInstall((wine) => {
        new Corefonts(wine).go();
        new Vcrun2017(wine).go();
        new D3DX9(wine).go();
    });
