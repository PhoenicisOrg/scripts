const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStableVersion } = include("engines.wine.engine.versions");

const VirtualDesktop = include("engines.wine.plugins.virtual_desktop");
const Vcrun2013 = include("engines.wine.verbs.vcrun2013");
const Corefonts = include("engines.wine.verbs.corefonts");
const DXVK = include("engines.wine.verbs.dxvk");

new SteamScript()
    .name("Subnautica")
    .editor("Unknown Worlds Entertainment")
    .author("Zemogiter")
    .applicationHomepage("https://unknownworlds.com/subnautica/")
    .wineDistribution("upstream")
    .wineVersion(getLatestStableVersion())
    .wineArchitecture("amd64")
    .appId(264710)
    .preInstall(function (wine) {
        const wizard = wine.wizard();

        wizard.message(
            tr("You can make the game smoother by using this: https://github.com/lutris/lutris/wiki/How-to:-Esync")
        );

        new Vcrun2013(wine).go();
        new Corefonts(wine).go();
        new DXVK(wine).go();

        new VirtualDesktop(wine).go();
    })
    .postInstall(function (wine) {
        const wizard = wine.wizard();

        wizard.message(
            tr(
                "Due to a potential conflict with Vulkan, shader mods break the game (the executable file works but no window is displayed)."
            )
        );
    })
    .gameOverlay(false);
