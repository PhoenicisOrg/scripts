const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Corefonts = include("engines.wine.verbs.corefonts");

new LocalInstallerScript()
    .name("Epic Games Launcher")
    .editor("Epic Games")
    .applicationHomepage("https://www.epicgames.com/store/en-US/download")
    .author("Plata")
    .installationArgs(["/q"])
    .category("Games")
    .executable("EpicGamesLauncher.exe", ["-SkipBuildPatchPrereq"])
    .wineArchitecture("amd64")
    .preInstall((wine) => {
        new Corefonts(wine).go();
    });
