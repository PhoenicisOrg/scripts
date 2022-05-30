const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");

new OnlineInstallerScript()
    .name("Dreamscapes 2")
    .editor("GameTop-ShamanGames")
    .applicationHomepage("https://gametop.com")
    .author("Starcommander")
    .url("https://cdn.gametop.com/free-games-download/Dreamscapes-2.exe")
    .checksum("b3dbf3373390b937cadc17653abebd55")
    .category("Games")
    .executable("game.exe")
    .preInstall((wine /*, wizard*/) => {
        new Vcrun2015(wine).go();
    });
