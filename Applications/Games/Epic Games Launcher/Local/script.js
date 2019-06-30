include("engines.wine.quick_script.local_installer_script");

new LocalInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .installationArgs(["/q"])
    .category("Games")
    .executable("EpicGamesLauncher.exe", ["-SkipBuildPatchPrereq", "-OpenGL"])
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64");
