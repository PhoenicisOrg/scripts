include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);
include(["Engines", "Wine", "Verbs", "dotnet40"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new LocalInstallerScript()
    //Local because download failed due to "unable to find valid certification path to requested target"
    .name("osu!")                      
    .editor("Editor")                               
    .applicationHomepage("https://osu.ppy.sh/")  
    .author("ImperatorS79")                     
    .category("Games")                           
    .executable("osu!.exe")
    .preInstall(function(wine, wizard) {
        //maybe needs cjkfonts or set sound driver to alsa
        wine.corefonts();
        wine.dotnet40();
    })
    .go(); 
