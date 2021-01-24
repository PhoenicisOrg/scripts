const SteamScript = include("engines.wine.quick_script.steam_script");
const { writeToFile } = include("utils.functions.filesystem.files");
const { getScreenWidth, getScreenHeight } = include("utils.functions.system.virtual_desktop");
const SoundDriver = include("engines.wine.plugins.sound_driver");
const WindowsVersion = include("engines.wine.plugins.windows_version");

function fixIni(ini) {
    const content =
        "[Audio]\n" +
        "EnableMicrophone=0\n" +
        "LatencyBuffer=4\n" +
        "ExclusiveMode=0\n" +
        "ForceWDM=0\n" +
        "ForceDirectXSink=0\n" +
        "DumpAudioLog=0\n" +
        "MaxOutputBufferSize=0\n" +
        "[Renderer.Win32]\n" +
        "ScreenWidth=" +
        getScreenWidth() +
        "\n" +
        "ScreenHeight=" +
        getScreenHeight() +
        "\n" +
        "MinScreenWidth=640\n" +
        "MinScreenHeight=480\n" +
        "Fullscreen=1\n" +
        "VisualQuality=8";

    writeToFile(ini, content);
}

new SteamScript()
    .name("Rocksmith™")
    .editor("Ubisoft - San Francisco")
    .author("Plata")
    .appId(205190)
    .postInstall((wine) => {
        new SoundDriver(wine).withDriver("alsa").go();

        new WindowsVersion(wine).withApplicationWindowsVersion("Rocksmith.exe", "win7").go();

        fixIni(
            `${wine.prefixDirectory()}/drive_c/${wine.programFiles()}/Steam/steamapps/common/Rocksmith/Rocksmith.ini`
        );
    });
