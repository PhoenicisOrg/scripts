const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const CSMT = include("engines.wine.plugins.csmt");
const VirtualDesktop = include("engines.wine.plugins.virtual_desktop");

new LocalInstallerScript()
    .name("Guild Wars 2")
    .editor("ArenaNet")
    .applicationHomepage("https://www.guildwars2.com")
    .author("Plata")
    .category("Games")
    .executable("Gw2.exe")
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .preInstall(function (wine) {
        // avoid that launcher freezes the complete system
        new VirtualDesktop(wine).withDimensions(1280, 1024).go();
        new CSMT(wine).go();
    });
