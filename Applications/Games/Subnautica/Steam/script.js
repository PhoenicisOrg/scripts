include(["engines", "wine", "quick_script", "steam_script"]);
include(["Engines", "Wine", "Verbs", "vcrun2013"]);
include(["Engines", "Wine", "Verbs", "vcrun2008"]);
include(["Engines", "Wine", "Verbs", "xact"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);
include(["utils", "functions", "apps", "resources"]);
include(["Utils", "Functions", "filesystem", "files"]);
include(["engines", "wine", "engine", "object"]);

new SteamScript()
    .name("Subnautica")
    .editor("Unknown Worlds Entertainment")
    .author("Zemogiter")
    .applicationHomepage("https://unknownworlds.com/subnautica/")
    .wineDistribution("upstream")
    .wineVersion(3.1)
    .wineArchitecture("amd64")
    .appId(264710)
    .preInstall(function(wine/*, wizard*/) {
        wine.vcrun2013();
        wine.corefonts();
        wine.vcrun2008();
        wine.xact();
        var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        wine.setVirtualDesktop(screenSize.width, screenSize.height);
        var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("fix.reg");
        wine.regedit().patch(registrySettings);

    })
    .gameOverlay(false)
    .executable("Steam.exe", ["-silent", "-applaunch", 264710, "-no-ces-sandbox", "-force-opengl"])
    .go();
