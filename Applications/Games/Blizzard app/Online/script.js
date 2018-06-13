include(["engines", "wine", "quick_script", "online_installer_script"]);
include(["engines", "wine", "plugins", "windows_version"]);
include(["engines", "wine", "verbs", "vcrun2015"]);
include(["engines", "wine", "verbs", "corefonts"]);

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Blizzard app")
            .editor("Blizzard")
            .applicationHomepage("http://eu.battle.net/en/app/")
            .author("Plata")
            .url("https://www.battle.net/download/getInstallerForGame?os=win&locale=enGB&version=LIVE&gameProgram=BATTLENET_APP.exe")
            .category("Games")
            .executable("Battle.net.exe")
            .wineVersion(LATEST_DEVELOPMENT_VERSION)
            .preInstall(function (wine/*, wizard*/) {
                wine.windowsVersion("winxp");
                wine.vcrun2015();
                wine.corefonts();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
