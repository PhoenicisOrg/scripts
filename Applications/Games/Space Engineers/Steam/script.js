const SteamScript = include("engines.wine.quick_script.steam_script");
const dotnet472 = include("engines.wine.verbs.dotnet472");
const vcrun2017 = include("engines.wine.verbs.vcrun2017");
const DXVK = include("engines.wine.verbs.dxvk");
const xact = include("engines.wine.verbs.xact");
const OverrideDLL = include("engines.wine.plugins.override_dll");
const { touch, writeToFile } = include("utils.functions.filesystem.files");
const { getLatestDevelopmentVersion } = include("engines.wine.engine.versions");

new SteamScript()
    .name("Space Engineers")
    .editor("Keen Software House")
    .author("Zemogiter")
    .appId(244850)
    .wineVersion(getLatestDevelopmentVersion)
    .wineDistribution("upstream")
    .wineArchitecture("amd64")
    .preInstall((wine) => {
        const wizard = wine.wizard();
        new dotnet472(wine).go();
        new vcrun2017(wine).go();
        new DXVK(wine).go();
        new xact(wine).go();
        new OverrideDLL(wine)
            .withMode("native, builtin", ["msvcr120"])
            .withMode("disabled", ["nvapi", "nvapi64"])
            .go();
        const dxvkConfigFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";
        touch(dxvkConfigFile);
        writeToFile(dxvkConfigFile, "dxgi.nvapiHack = False");
        wizard.message(tr("You may have to install libjpeg62 package if you see thumbnails in New Game menu dispalyed as magenta rectangles."));
        wizard.message(tr("Due to JIT compiler issues and the way this game uses multithreating, there are audio stutters. If you are on a Debian-based distribution you can try the libFAudio package from this PPA:\nhttps://launchpad.net/~cybermax-dexter/+archive/ubuntu/sdl2-backport"));
    })
    .executable("Steam.exe", ["-silent", "-applaunch", "244850", "-no-cef-sandbox", "-skipintro"])
    .environment((wine) => {
        const dxvkConfigFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";

        return '{"DXVK_CONFIG_FILE"=dxvkConfigFile, "STAGING_SHARED_MEMORY"="0", "DXVK_HUD"="compiler", "PULSE_LATENCY_MSEC"="60", "WINEESYNC"="1"}';
    })
