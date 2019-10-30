const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("Tomb Raider: The Dagger Of Xian (Demo)")
    .editor("Nicobass")
    .applicationHomepage("http://tombraider-dox.com/")
    .author("Plata")
    .category("Games")
    .executable("TombRaiderDOX.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging");
