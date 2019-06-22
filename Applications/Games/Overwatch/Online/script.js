include("engines.wine.quick_script.online_installer_script");
include("engines.wine.plugins.windows_version");
include("engines.wine.plugins.override_dll");
include("engines.wine.verbs.vcrun2015");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.dxvk");

new OnlineInstallerScript()
    .name("Overwatch")
    .editor("Blizzard")
    .applicationHomepage("http://www.playoverwatch.com/")
    .author("ImperatorS79, kreyren")
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=Overwatch-Setup.exe")
//The checksum is different each time you download
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .category("Games")
    .executable("Battle.net.exe")
    .preInstall(function (wine /*, wizard*/) {
        wine.windowsVersion("win7");
        wine.vcrun2015();
        wine.corefonts();
        wine
            .overrideDLL()
            .set("disabled", ["nvapi", "nvapi64"])
            .do();
        wine.DXVK();
    });
