const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("The Sims")
    .editor("Maxis")
    .applicationHomepage("http://www.thesims.com/")
    .wineDistribution("staging")
    .wineVersion(getLatestStagingVersion)
    .author("Zemogiter")
    .category("Games")
    .executable("Sims.exe", ["-skip_intro"]);
