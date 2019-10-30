const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Star Craft II")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/sc2/")
    .author("ImperatorS79")
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=StarCraft-II-Setup.exe")
    // The checksum changes each time you download
    .category("Games")
    .executable("Battle.net.exe")
    .preInstall(function (wine /*, wizard*/) {
        new Vcrun2015(wine).go();
        new Corefonts(wine).go();
    });
