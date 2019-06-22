include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.virtual_desktop");
include("engines.wine.verbs.vcrun2013");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.dxvk");
include("utils.functions.apps.resources");

new SteamScript()
    .name("Subnautica")
    .editor("Unknown Worlds Entertainment")
    .author("Zemogiter")
    .applicationHomepage("https://unknownworlds.com/subnautica/")
    .wineDistribution("upstream")
    .wineVersion(LATEST_STABLE_VERSION)
    .wineArchitecture("amd64")
    .appId(264710)
    .preInstall(function (wine, wizard) {
        wizard.message(
            tr("You can make the game smoother by using this: https://github.com/lutris/lutris/wiki/How-to:-Esync")
        );
        wine.vcrun2013();
        wine.corefonts();
        wine.DXVK();
        var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        wine.setVirtualDesktop(screenSize.width, screenSize.height);
    })
    .postInstall(function (wine, wizard) {
        wizard.message(
            tr(
                "Due to a potential confilct with Vulkan, shader mods break the game (the executable file works but no window is displayed)."
            )
        );
    })
    .gameOverlay(false);
