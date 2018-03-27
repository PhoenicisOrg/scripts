include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("The Sims")
    .editor("Maxis")
    .applicationHomepage("http://www.thesims.com/")
    .wineDistribution("staging")
    .wineVersion("2.19")
    .author("Zemogiter")
    .category("Games")
    .executable("Sims.exe", ["-skip_intro"])
    .go();
