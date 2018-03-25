include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);
include(["Engines", "Wine", "Engine", "Object"]);
include(["Engines", "Wine", "Verbs", "d3dx9"]);

new LocalInstallerScript()
    .name("Command and Conquer - Tiberium Wars")
    .editor("SAGE")
    .author("qdii")
    .category("Games")
    .executable("CNC3.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function(wine/*, wizard*/) {
        wine.windowsVersion("winxp")
        wine.d3dx9();
        wine.enableCSMT();
    })
    .go();
