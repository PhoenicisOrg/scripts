const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Dreamscapes2")
    .editor("GameTop-ShamanGames")
    .applicationHomepage("https://gametop.com")
    .author("Starcommander")
    .url("https://cdn.gametop.com/free-games-download/Dreamscapes-2.exe")
    // Todo: checksum()
    .category("Games")
    .executable("game.exe")
    .preInstall((wine /*, wizard*/) => {
        new Vcrun2015(wine).go();
        new Corefonts(wine).go();
    });
