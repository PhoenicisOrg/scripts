const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .installationArgs(["/q"])
    .category("Games")
    .executable("EpicGamesLauncher.exe", ["-SkipBuildPatchPrereq", "-OpenGL"])
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .wineArchitecture("amd64");
