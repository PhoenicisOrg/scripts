const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Dreamscapes")
    .editor("GameTop-ShamanGames")
    .applicationHomepage("https://gametop.com")
    .author("Starcommander")
    .url("https://cdn.gametop.com/free-games-download/Dreamscapes-The-Sandman.exe")
    .checksum("ec3b9e2e8175ceca946f1f285542643a2a686c50")
    .category("Games")
    .executable("Dreamscapes_TheSandman.exe")
    .preInstall((wine /*, wizard*/) => {
        new Vcrun2015(wine).go();
        new Corefonts(wine).go();
    });
