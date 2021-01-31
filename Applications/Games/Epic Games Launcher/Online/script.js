const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const Corefonts = include("engines.wine.verbs.corefonts");

new OnlineInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .url(
        "https://epicgames-download1.akamaized.net/Builds/UnrealEngineLauncher/Installers/Win32/EpicInstaller-10.15.2.msi?launcherfilename=EpicInstaller-10.15.2.msi"
    )
    .checksum("6734c5c990715816021351b0bd0a7527e7a226fa")
    .installationArgs(["/q"])
    .category("Games")
    .executable("EpicGamesLauncher.exe", ["-SkipBuildPatchPrereq"])
    .wineArchitecture("amd64")
    .preInstall((wine) => {
        new Corefonts(wine).go();
    });
