include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Batman™: Arkham Origins")              
    .editor("WB Games Montreal, Splash Damage")     
    .author("ImperatorS79")
    .wineVersion("2.15")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        wine.enableCSMT();
        //maybe needs xact
    })
    .appId(209000)               
    .go();
