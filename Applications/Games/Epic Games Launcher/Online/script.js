const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new OnlineInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .url(
        "https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi"
    )
    .checksum("d608bfb4eec073df9a76cfe58877dcc86364d428")
    .installationArgs(["/q"])
    .category("Games")
    .executable("EpicGamesLauncher.exe", ["-SkipBuildPatchPrereq", "-OpenGL"])
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .wineArchitecture("amd64");
