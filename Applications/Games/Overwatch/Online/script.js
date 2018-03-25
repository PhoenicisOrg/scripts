include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2015"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new OnlineInstallerScript()
    .name("Overwatch")                      
    .editor("Blizzard")                              
    .applicationHomepage("http://www.playoverwatch.com/")  
    .author("ImperatorS79")                     
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=Overwatch-Setup.exe")                      
    //The checksum is different each time you download
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .category("Games")                           
    .executable("Overwatch.exe")
    .preInstall(function(wine/*, wizard*/) {
        wine.windowsVersion("winxp");
        wine.vcrun2015();
        wine.corefonts();
        wine.enableCSMT();
    })
    
    .go(); 
