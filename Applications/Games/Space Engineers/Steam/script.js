include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dotnet472");
include("engines.wine.verbs.vcrun2017");
include("engines.wine.verbs.dxvk");
include("engines.wine.verbs.faudio");
include("engines.wine.plugins.override_dll");

new SteamScript()
    .name("Space Engineers")
    .editor("Keen Software House")
    .author("Zemogiter")
    .appId(244850)
    .wineVersion("4.11")
    .wineDistribution("upstream")
    .wineArchitecture("amd64")
    .preInstall(function (wine, wizard) {
        wine.dotnet472();
        wine.vcrun2017();
        wine.DXVK();
        wine.faudio();
        wine.overrideDLL()
            .set("native, builtin", ["msvcr120", "xaudio2_0", "xaudio2_1", "xaudio2_2", "xaudio2_3", "xaudio2_4", "xaudio2_5", "xaudio2_6", "xaudio2_7", "xaudio2_8", "xaudio2_9", "x3daudio1_3", "x3daudio1_4", "x3daudio1_5", "x3daudio1_6", "x3daudio1_7"])
            .do();
        wizard.message(tr("You have to install libjpeg62 and libjpeg62-dev or else the thumbnails in New Game menu will be dispalyed as magenta rectangles."));
        wizard.message(tr("Due to JIT compiler issues and the way this game uses multithreating, there are audio stutters. This script will attempt to minimize them but you might also have to enter the alsoft-conf command in terminal and set sample depth to 32bit float and period size to 2048."));
    })
    .executable("Steam.exe", ["-silent", "-applaunch", 244850, "-no-ces-sandbox", "-skipintro"])
