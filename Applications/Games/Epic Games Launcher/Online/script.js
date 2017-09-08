include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.unrealengine.com/download")
    .author("Plata")
    .url("https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi")
    .checksum("56bce3c91eb8591edabb7ff09d680140aafa54b1")
    .installationArgs(["/q"])
    .category("Games")
    .executable("EpicGamesLauncher.exe", ["-SkipBuildPatchPrereq", "-OpenGL"])
    .wineVersion("2.16")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
