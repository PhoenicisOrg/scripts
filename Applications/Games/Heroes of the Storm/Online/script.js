const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { LATEST_STAGING_VERSION } = include("engines.wine.engine.versions");

include("engines.wine.plugins.windows_version");
const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Heroes of the Storm")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/heroes/")
    .author("ImperatorS79")
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=Heroes-of-the-Storm-Setup.exe")
    .category("Games")
    .executable("Heroes of the Storm.exe")
    //The checksum is different each time you download
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine.windowsVersion("winxp");

        new Vcrun2015(wine).go();
        new Corefonts(wine).go();
    });
