const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new OnlineInstallerScript()
    .name("Origin")
    .editor("Electronic Arts")
    .applicationHomepage("https://www.origin.com/deu/en-us/store")
    .author("Plata")
    .url("https://www.dm.origin.com/download/OriginThinSetup.exe")
    .category("Games")
    .executable("Origin.exe")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging");
