const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("The Elder Scrolls IV: Oblivion")
    .editor("Bethesda Softworks")
    .applicationHomepage("https://elderscrolls.bethesda.net/en/oblivion")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .category("Games")
    .executable("Oblivion.exe");
