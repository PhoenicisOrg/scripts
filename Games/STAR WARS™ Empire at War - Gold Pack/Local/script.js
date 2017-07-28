include(["Wine", "QuickScript", "LocalInstallerScript"]);
include(["Wine", "Verbs", "d3dx9"]);

new LocalInstallerScript()
    .name("STAR WARS™ Empire at War: Gold Pack")                       
    .editor("Petroglyph")                               
    .author("ImperatorS79")                     
    .category("Games")                          
    .executable("LaunchEAW.exe")
    .preInstall(function (wine, wizard) {
        wine.d3dx9();
    })
    .go(); 
