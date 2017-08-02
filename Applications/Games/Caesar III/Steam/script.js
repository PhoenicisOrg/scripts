include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Engine", "Object"]);;

new SteamScript()
    .name("Caesar III")              
    .editor("Impressions Games")    
    .author("ImperatorS79") 
    .appId(517790)
    .postInstall(function(wine, wizard) {
        wine.setVirtualDesktop(1280, 1024);
    })
    .go(); 
