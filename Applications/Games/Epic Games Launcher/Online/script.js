const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");
const WindowsVersion = include("engines.wine.plugins.windows_version");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .url(
        "https://epicgames-download1.akamaized.net/Builds/UnrealEngineLauncher/Installers/Win32/EpicInstaller-10.7.0.msi?launcherfilename=EpicInstaller-10.7.0.msi"
    )
    .checksum("1ebbfda01c5428c55cb46dac2d223c16ec4ee9b1")
    .installationArgs(["/q"])
    .category("Games")
    .executable("EpicGamesLauncher.exe", ["-SkipBuildPatchPrereq"])
    .wineArchitecture("amd64")
    .preInstall((wine) => {
        new Corefonts(wine).go();
        new WindowsVersion(wine).withWindowsVersion("win7").go();
    });
