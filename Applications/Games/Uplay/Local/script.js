const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("Uplay")
    .editor("Ubisoft")
    .applicationHomepage("https://uplay.ubi.com/")
    .author("Plata")
    .category("Games")
    .executable("UbisoftGameLauncher.exe")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging");
