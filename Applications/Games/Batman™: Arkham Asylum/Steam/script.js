include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Batman™: Arkham Asylum")              
    .editor("Rocksteady Studios")     
    .author("ImperatorS79") 
    .wineVersion("2.15")
    .wineDistribution("staging")
    .appId(35140)
    .postInstall(function(wine, wizard) {
        wine.UseGLSL("disabled");
        wine.enableCSMT();
    })
    .go(); 
