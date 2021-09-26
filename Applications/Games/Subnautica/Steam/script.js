const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestDevelopmentVersion } = include("engines.wine.engine.versions");
const OverrideDLL = include("engines.wine.plugins.override_dll");
const { touch, writeToFile } = include("utils.functions.filesystem.files");
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
    .wineVersion(getLatestDevelopmentVersion)
    .wineArchitecture("amd64")
    .appId(264710)
    .preInstall((wine) => {
        new Vcrun2013(wine).go();
        new Corefonts(wine).go();
        new DXVK(wine).go();
        new OverrideDLL(wine)
            .withMode("disabled", ["nvapi", "nvapi64"])
            .go();
        new VirtualDesktop(wine).go();
        const dxvkConfigFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";
        touch(dxvkConfigFile);
        writeToFile(dxvkConfigFile, "dxgi.nvapiHack = False");
    })
    .postInstall((wine) => {
        const wizard = wine.wizard();
        wizard.message(
            tr(
                "Due to a potential conflict with Vulkan, shader mods may break the game (the executable file works but no window is displayed)."
            )
        );
    })
    .gameOverlay(false)
    .environment((wine) => {
        const dxvkConfigFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";

        return  '{"DXVK_CONFIG_FILE": "${dxvkConfigFile}", "STAGING_SHARED_MEMORY": "0", "WINEESYNC": "1"}';
    })
