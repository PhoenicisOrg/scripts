include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.vcrun2017");
include("engines.wine.verbs.d3dx9");
include("engines.wine.verbs.corefonts");

new SteamScript()
    .name("RimWorld")
    .editor("Ludeon Studios")
    .author("Zemogiter")
    .applicationHomepage("https://rimworldgame.com/")
    .wineArchitecture("amd64")
    .appId(294100)
    .preInstall(function (wine) {
        wine.corefonts();
        wine.vcrun2017();
        wine.d3dx9();
    });
