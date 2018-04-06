include(["engines", "wine", "quick_script", "local_installer_script"]);

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
