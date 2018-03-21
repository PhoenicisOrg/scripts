include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("The Sims")
    .editor("Maxis")
    .applicationHomepage("https://www.ea.com/pl-pl/games/the-sims")
    .wineDistribution("staging")
    .wineVersion("2.19-staging")
    .author("Zemogiter")
    .category("Games")
    .executable("Sims.exe", ["-skip_intro"])
.go();
