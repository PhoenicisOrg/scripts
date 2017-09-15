include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2015"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new OnlineInstallerScript()
    .name("Star Craft II")                       
    .editor("Blizzard")                               
    .applicationHomepage("http://eu.battle.net/sc2/")  
    .author("ImperatorS79")                    
    .url("https://eu.battle.net/download/getInstaller?os=win&installer=StarCraft-II-Setup.exe")                       
    // The checksum changes each time you download                       
    .category("Games")                           
    .executable("StarCraft II.exe")
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("winxp");
        wine.vcrun2015();
        wine.corefonts();
    })	
    .go();
