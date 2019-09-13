const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

const Vcrun2017 = include("engines.wine.verbs.vcrun2017");
const D3DX9 = include("engines.wine.verbs.d3dx9");
const Corefonts = include("engines.wine.verbs.corefonts");

new LocalInstallerScript()
    .name("RimWorld")
    .editor("Ludeon Studios")
    .author("Zemogiter")
    .applicationHomepage("https://rimworldgame.com/")
    .wineArchitecture("amd64")
    .executable("RimWorld.exe")
    .preInstall(function (wine) {
        new Vcrun2017(wine).go();
        new D3DX9(wine).go();
        new Corefonts(wine).go();
    });
