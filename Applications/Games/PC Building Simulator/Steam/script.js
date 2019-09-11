const SteamScript = include("engines.wine.quick_script.steam_script");
const {LATEST_DEVELOPMENT_VERSION} = include("engines.wine.engine.versions");

include("engines.wine.plugins.virtual_desktop");
const Corefonts = include("engines.wine.verbs.corefonts");


new SteamScript()
    .name("PC Building Simulator")
    .editor("Claudiu Kiss, The Irregular Corporation")
    .author("Zemogiter")
    .applicationHomepage("http://www.pcbuildingsim.com/")
    .wineVersion(LATEST_DEVELOPMENT_VERSION)
    .wineArchitecture("amd64")
    .appId(621060)
    .preInstall(function (wine, wizard) {
        wizard.message(
            tr(
                "The game is functional but benchmark animations on the monitors are not displayed. Feel free to drop a feedback if you know how to fix this issue."
            )
        );
        new Corefonts(wine).go();
        wine.setVirtualDesktop();
    })
    .gameOverlay(false);
