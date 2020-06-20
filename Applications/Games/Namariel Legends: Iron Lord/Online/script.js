const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const D3DX9 = include("engines.wine.verbs.d3dx9");
const Vcrun2015 = include("engines.wine.verbs.vcrun2015");

new OnlineInstallerScript()
    .name("Namariel Legends: Iron Lord")
    .editor("GameTop-ShamanGames")
    .applicationHomepage("https://gametop.com")
    .author("Starcommander")
    .url("https://cdn.gametop.com/free-games-download/Namariel-Legends-Iron-Lord.exe")
    .checksum("c2c07aa8c8169b9da7f20e355bba460b6e7e356f")
    .category("Games")
    .executable("game.exe")
    .preInstall((wine /*, wizard*/) => {
        new Vcrun2015(wine).go();
        new D3DX9(wine).go();
    });
