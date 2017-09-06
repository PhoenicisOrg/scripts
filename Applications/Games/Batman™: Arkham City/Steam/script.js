include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Batman™: Arkham City")              
    .editor("Rocksteady Studios")     
    .author("ImperatorS79") 
    .wineVersion("2.15")
    .wineDistribution("staging")
    .appId(200260)
    .postInstall(function(wine, wizard) {
        wine.enableCSMT();
    })
    .go(); 
 
