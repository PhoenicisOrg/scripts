const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("The Elder Scrolls IV: Oblivion")
    .editor("Bethesda Softworks")
    .applicationHomepage("https://elderscrolls.bethesda.net/en/oblivion")
    .author("ImperatorS79")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .category("Games")
    .executable("Oblivion.exe");
