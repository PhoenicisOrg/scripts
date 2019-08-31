const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_DEVELOPMENT_VERSION} = include("engines.wine.engine.versions");

include("engines.wine.verbs.vcrun2010");
const DotNET40 = include("engines.wine.verbs.dotnet40");
const D3DX9 = include("engines.wine.verbs.d3dx9");

new SteamScript()
    .name("Space Colony")
    .editor("Firefly Studios")
    .author("Zemogiter")
    .wineDistribution("upstream")
    .wineVersion(LATEST_DEVELOPMENT_VERSION)
    .appId(297920)
    .preInstall(function (wine) {
        wine.vcrun2010();
        new DotNET40(wine).go();
        new D3DX9(wine).go();
    });
