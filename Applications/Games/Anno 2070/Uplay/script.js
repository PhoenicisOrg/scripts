include(["engines", "wine", "quick_script", "uplay_script"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "plugins", "virtual_desktop"]);

var installerImplementation = {
    run: function () {
        new UplayScript()
            .name("Anno 2070")
            .editor("Ubisoft")
            .applicationHomepage("http://anno-game.ubi.com/anno-2070/en-US/")
            .author("Zemogiter")
            .wineVersion("3.18")
            .wineDistribution("upstream")
            .appId(22)
            .preInstall(function (wine/*, wizard*/){
                var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
                wine.setVirtualDesktop(screenSize.width, screenSize.height);
                wine.corefonts();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
