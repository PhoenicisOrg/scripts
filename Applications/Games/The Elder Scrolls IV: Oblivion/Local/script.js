include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("The Elder Scrolls IV: Oblivion")                       
    .editor("Bethesda Softworks")                              
    .applicationHomepage("https://elderscrolls.bethesda.net/en/oblivion")  
    .author("ImperatorS79")
    .wineVersion("2.14")
    .wineDistribution("staging")
    .category("Games")                           
    .executable("Oblivion.exe")                  
    .go(); 
