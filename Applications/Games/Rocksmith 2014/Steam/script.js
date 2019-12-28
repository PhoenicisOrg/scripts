const SteamScript = include("engines.wine.quick_script.steam_script");
const { writeToFile } = include("utils.functions.filesystem.files");

const SoundDriver = include("engines.wine.plugins.sound_driver");
const WindowsVersion = include("engines.wine.plugins.windows_version");

function fixIni(ini) {
    var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
    var content =
        "[Audio]\n" +
        "EnableMicrophone=1\n" +
        "ExclusiveMode=0\n" +
        "LatencyBuffer=4\n" +
        "ForceDefaultPlaybackDevice=\n" +
        "ForceWDM=0\n" +
        "ForceDirectXSink=0\n" +
        "Win32UltraLowLatencyMode=0\n" +
        "DumpAudioLog=0\n" +
        "MaxOutputBufferSize=0\n" +
        "[Renderer.Win32]\n" +
        "ShowGamepadUI=0\n" +
        "ScreenWidth=" +
        screenSize.width +
        "\n" +
        "ScreenHeight=" +
        screenSize.height +
        "\n" +
        "Fullscreen=2\n" +
        "VisualQuality=1\n" +
        "RenderingWidth=0\n" +
        "RenderingHeight=0\n" +
        "EnablePostEffects=1\n" +
        "EnableShadows=1\n" +
        "EnableHighResScope=1\n" +
        "EnableDepthOfField=1\n" +
        "EnablePerPixelLighting=1\n" +
        "MsaaSamples=4\n" +
        "DisableBrowser=0\n" +
        "[Net]\n" +
        "UseProxy=1";

    writeToFile(ini, content);
}

new SteamScript()
    .name("Rocksmith® 2014")
    .editor("Ubisoft - San Francisco")
    .author("Plata")
    .appId(221680)
    .postInstall((wine) => {
        new SoundDriver(wine).withDriver("alsa").go();

        new WindowsVersion(wine).withApplicationWindowsVersion("Rocksmith2014.exe", "win7").go();

        fixIni(
            `${wine.prefixDirectory()}/drive_c/${wine.programFiles()}/Steam/steamapps/common/Rocksmith2014/Rocksmith.ini`
        );
    });
