include("engines.wine.quick_script.online_installer_script");
include("engines.wine.verbs.corefonts");
include("engines.wine.plugins.windows_version");

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Steam")
            .editor("Valve")
            .applicationHomepage("https://www.steampowered.com")
            .author("Quentin PÂRIS")
            .url("https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe")
            .checksum("4b1b85ec2499a4ce07c89609b256923a4fc479e5")
            .category("Games")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .preInstall(function (wine/*, wizard*/) {
                wine.setOsForApplication().set("steam.exe", "winxp").do();
                wine.setOsForApplication().set("steamwebhelper.exe", "winxp").do();
                wine.corefonts();
            })
            .executable("Steam.exe", ["-no-cef-sandbox"])
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
