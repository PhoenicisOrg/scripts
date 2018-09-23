include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "plugins", "regedit"]);
include(["engines", "wine", "plugins", "virtual_desktop"]);
include(["engines", "wine", "verbs", "vcrun2013"]);
include(["engines", "wine", "verbs", "d3dx11"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["utils", "functions", "apps", "resources"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Subnautica")
            .editor("Unknown Worlds Entertainment")
            .author("Zemogiter")
            .applicationHomepage("https://unknownworlds.com/subnautica/")
            .wineDistribution("upstream")
            .wineVersion("3.16")
            .wineArchitecture("amd64")
            .appId(264710)
            .preInstall(function (wine/*, wizard*/) {
                wine.vcrun2013();
                wine.corefonts();
                wine.d3dx11();
                var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
                wine.setVirtualDesktop(screenSize.width, screenSize.height);
                var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("fix.reg");
                wine.regedit().patch(registrySettings);

            })
            .gameOverlay(false)
            .executable("Steam.exe", ["-silent", "-applaunch", 264710, "-no-ces-sandbox", "-force-dx11"])
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
