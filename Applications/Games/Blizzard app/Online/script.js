const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Blizzard app")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/en/app/")
    .author("Plata")
    .url(
        "https://www.battle.net/download/getInstallerForGame?os=win&locale=enGB&version=LIVE&gameProgram=BATTLENET_APP.exe"
    )
    .category("Games")
    .executable("Battle.net.exe")
    .wineVersion("3.19")
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        new Vcrun2015(wine).go();
        new Corefonts(wine).go();
    });
