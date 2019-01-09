include(["engines", "wine", "quick_script", "online_installer_script"]);
include(["engines", "wine", "plugins", "windows_version"]);
include(["engines", "wine", "verbs", "vcrun2015"]);
include(["engines", "wine", "verbs", "corefonts"]);

// CHANGELOG
// 2019/01/09 // Kreyren - Changed executable on Battle.net.exe, mandatory for battle.net games
// 2019/01/09 // Kreyren - Changed WINE from winxp on win7 since winxp will soon be unsupported

// BUG: https://github.com/PhoenicisOrg/scripts/issues/792

// TODO: OSX support, needs verification

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Hearthstone")
            .editor("Blizzard")
            .applicationHomepage("https://eu.battle.net/hearthstone/")
            .author("ImperatorS79, kreyren")
            .url("https://eu.battle.net/download/getInstaller?os=win&installer=Hearthstone-Setup.exe")
            .category("Games")
            .executable("Battle.net.exe")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .preInstall(function (wine/*, wizard*/) {
                wine.windowsVersion("win7");
                wine.vcrun2015();
                wine.corefonts();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
