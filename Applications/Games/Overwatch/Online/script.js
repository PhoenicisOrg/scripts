include(["engines", "wine", "quick_script", "online_installer_script"]);
include(["engines", "wine", "plugins", "csmt"]);
include(["engines", "wine", "plugins", "windows_version"]);
include(["engines", "wine", "verbs", "vcrun2015"]);
include(["engines", "wine", "verbs", "corefonts"]);

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Overwatch")
            .editor("Blizzard")
            .applicationHomepage("http://www.playoverwatch.com/")
            .author("ImperatorS79, kreyren")
            .url("https://eu.battle.net/download/getInstaller?os=win&installer=Overwatch-Setup.exe")
        //The checksum is different each time you download
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging") // ESYNC required
            .wineArchitecture("amd64") // Multilib preffered? (without setting wine architecture)
            .category("Games")
            .executable("Battle.net.exe")
            .preInstall(function (wine/*, wizard*/) {
                wine.windowsVersion("win7");
                wine.vcrun2015();
                wine.corefonts();
                wine.enableCSMT();
                wine.DXVK(); // Relevant: https://github.com/doitsujin/dxvk/issues/846
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
