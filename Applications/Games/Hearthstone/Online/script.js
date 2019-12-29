const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Hearthstone")
    .editor("Blizzard")
    .applicationHomepage("https://eu.battle.net/hearthstone/")
    .author("ImperatorS79, kreyren")
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=Hearthstone-Setup.exe")
    .category("Games")
    .executable("Battle.net.exe")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .preInstall((wine /*, wizard*/) => {
        new Vcrun2015(wine).go();
        new Corefonts(wine).go();
    });
