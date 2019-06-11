include("engines.wine.quick_script.online_installer_script");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.corefonts");

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Uplay")
            .editor("Ubisoft")
            .applicationHomepage("https://uplay.ubi.com/")
            .author("Plata, KREYREN")
            .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
            .category("Games")
            .executable("UbisoftGameLauncher.exe")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .preInstall(function (wine/*, wizard*/) {
                wine.corefonts();
                wine.setOsForApplication().set("upc.exe", "winvista").do();
                wine.setOsForApplication().set("UbisoftGameLauncher.exe", "winvista").do();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
