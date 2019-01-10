include(["engines", "wine", "plugins", "windows_version"]);
include(["engines", "wine", "verbs", "xact"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "verbs", "steam"]); // Sane? Expected winesteam
include(["engines", "wine", "shortcuts", "wine"]); // Sane? Dunno 

// TODO : Executable on the game to prevent openning steam.
// TODO : Add `+com_showLoadingScreen 0` in launch options to prevent annoying loading screens

// Installs Dishonored 2

var installerImplementation = {
    run: function () {
        new CustomInstallerScript()
            .name("Dishonored 2")
            .editor("Arkane Studios")
            .applicationHomepage("https://dishonored.bethesda.net/")
            .author("kreyren")
            .appId(403640)
            .category("Games")
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION)
            .preInstall(function (wine /*, wizard*/) {
                wine.windowsVersion("win7");
                wine.xact();
                wine.dxvk();
                wine.coreconts();
                wine.steam();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
