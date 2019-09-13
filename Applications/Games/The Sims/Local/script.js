const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("The Sims")
    .editor("Maxis")
    .applicationHomepage("http://www.thesims.com/")
    .wineDistribution("staging")
    .wineVersion(LATEST_STAGING_VERSION)
    .author("Zemogiter")
    .category("Games")
    .executable("Sims.exe", ["-skip_intro"]);
