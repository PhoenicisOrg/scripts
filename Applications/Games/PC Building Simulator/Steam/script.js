const SteamScript = include("engines.wine.quick_script.steam_script");
const {getLatestDevelopmentVersion} = include("engines.wine.engine.versions");

const VirtualDesktop = include("engines.wine.plugins.virtual_desktop");
const Corefonts = include("engines.wine.verbs.corefonts");


new SteamScript()
    .name("PC Building Simulator")
    .editor("Claudiu Kiss, The Irregular Corporation")
    .author("Zemogiter")
    .applicationHomepage("http://www.pcbuildingsim.com/")
    .wineVersion(getLatestDevelopmentVersion)
    .wineArchitecture("amd64")
    .appId(621060)
    .preInstall(function (wine, wizard) {
        wizard.message(
            tr(
                "The game is functional but benchmark animations on the monitors are not displayed. Feel free to drop a feedback if you know how to fix this issue."
            )
        );
        new Corefonts(wine).go();
        new VirtualDesktop(wine).go();
    })
    .gameOverlay(false);
