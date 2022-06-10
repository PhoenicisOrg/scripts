const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");

new OnlineInstallerScript()
    .name("Dreamscapes")
    .editor("GameTop-ShamanGames")
    .applicationHomepage("https://gametop.com")
    .author("Starcommander")
    .url("https://cdn.gametop.com/free-games-download/Dreamscapes-The-Sandman.exe")
    .checksum("a8f202256998b1dfd259f7caaf87d4f7b3e12279")
    .category("Games")
    .executable("Dreamscapes_TheSandman.exe")
    .preInstall((wine /*, wizard*/) => {
        new Vcrun2015(wine).go();
    });
