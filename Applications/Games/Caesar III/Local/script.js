include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);
include(["Engines", "Wine", "Engine", "Object"]);

new LocalInstallerScript()
    .name("Caesar III")                       
    .editor("Impressions Games")                               
    .author("ImperatorS79")                    
    .category("Games")                          
    .executable("c3.exe")
    .postInstall(function(wine, wizard) {
        wine.setVirtualDesktop(1280, 1024);
    })
    .go(); 
