const SteamScript = include("engines.wine.quick_script.steam_script");

const DotNET472 = include("engines.wine.verbs.dotnet472");
const Vcrun2017 = include("engines.wine.verbs.vcrun2017");
const DXVK = include("engines.wine.verbs.dxvk");
const xact = include("engines.wine.verbs.xact");
const OverrideDLL = include("engines.wine.plugins.override_dll");
const { touch, writeToFile } = include("utils.functions.filesystem.files");
const { getLatestDevelopmentVersion } = include("engines.wine.engine.versions");

new SteamScript()
    .name("Space Engineers")
    .editor("Keen Software House")
    .author("Zemogiter")
    .appId("244850")
    .wineVersion(getLatestDevelopmentVersion)
    .wineDistribution("upstream")
    .wineArchitecture("amd64")
    .preInstall((wine) => {
        new DotNET472(wine).go();
        new Vcrun2017(wine).go();
        new DXVK(wine).go();
        new xact(wine).go();

        new OverrideDLL(wine)
            .withMode("native, builtin", ["msvcr120"])
            .withMode("disabled", ["nvapi", "nvapi64"])
            .go();

        const dxvkConfigFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";
        touch(dxvkConfigFile);
        writeToFile(dxvkConfigFile, "dxgi.nvapiHack = False");

        const wizard = wine.wizard();

        wizard.message(
            tr(
                "You have to install libjpeg62 and libjpeg62-dev or else the thumbnails in New Game menu will be displayed as magenta rectangles."
            )
        );
        wizard.message(
            tr(
                "Due to JIT compiler issues and the way this game uses multithreading, there are audio stutters. This script will attempt to minimize them but you might also have to enter the alsoft-conf command in terminal and set sample depth to 32bit float and period size to 2048."
            )
        );
    })
    .executable("Steam.exe", ["-silent", "-applaunch", "244850", "-no-cef-sandbox", "-skipintro"])
    .environment((wine) => {
        const dxvkConfigFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";
        return '{"DXVK_CONFIG_FILE": "dxvkConfigFile", "STAGING_SHARED_MEMORY": "0", "DXVK_HUD": "compiler", "PULSE_LATENCY_MSEC": "60", "WINEESYNC": "1"}';
    })
