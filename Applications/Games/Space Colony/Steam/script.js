const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestDevelopmentVersion } = include("engines.wine.engine.versions");

const Vcrun2010 = include("engines.wine.verbs.vcrun2010");
const DotNET40 = include("engines.wine.verbs.dotnet40");
const D3DX9 = include("engines.wine.verbs.d3dx9");

new SteamScript()
    .name("Space Colony")
    .editor("Firefly Studios")
    .author("Zemogiter")
    .wineDistribution("upstream")
    .wineVersion(getLatestDevelopmentVersion())
    .appId(297920)
    .preInstall(function (wine) {
        new Vcrun2010(wine).go();
        new DotNET40(wine).go();
        new D3DX9(wine).go();
    });
