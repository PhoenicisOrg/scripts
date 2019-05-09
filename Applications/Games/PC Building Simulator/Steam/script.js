include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.virtual_desktop");
include("engines.wine.verbs.corefonts");
include("utils.functions.apps.resources");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("PC Building Simulator")
            .editor(" Claudiu Kiss, The Irregular Corporation")
            .author("Zemogiter")
            .applicationHomepage("http://www.pcbuildingsim.com/")
            .wineDistribution("upstream")
            .wineVersion(LATEST_DEVELOPMENT_VERSION)
            .wineArchitecture("amd64")
            .appId(621060)
            .preInstall(function (wine, wizard) {
                wine.corefonts();
                var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
                wine.setVirtualDesktop(screenSize.width, screenSize.height);
            })
            .gameOverlay(false)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
