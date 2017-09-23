include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("Tomb Raider: The Dagger Of Xian (Demo)")
    .editor("Nicobass")
    .applicationHomepage("http://tombraider-dox.com/")
    .author("Plata")
    .category("Games")
    .executable("TombRaiderDOX.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .go();
