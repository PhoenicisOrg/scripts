include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Batman™: Arkham Origins")              
    .editor("WB Games Montreal, Splash Damage")     
    .author("ImperatorS79")
    .wineVersion("2.15")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        //Steam says only compatible with windows > xp
        wine.setOsForApplication().set("BatmanOrigins.exe", "win7").do();
        //maybe needs xact
    })
    .appId(209000)               
    .go();
