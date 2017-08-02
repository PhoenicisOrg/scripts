include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("STAR WARS™ Battlefront™ II")                       
    .editor("Pandemic Studiosr")                               
    .author("ImperatorS79")                     
    .category("Games")                           
    .executable("LaunchBFII.exe")                  
    .postInstall(function(wine, wizard) {
        new Downloader()
            .wizard(wizard)
            .url("http://static.dolimg.com/mh_netstorage/lucasfilm/patches/pc/BFIIUpdateInt1_1.exe")
            .checksum("60eaddfaba1bc71fe8bbbb560f8da229748cfaa8")
            .to(wine.prefixDirectory + "drive_c/Program Files/LucasArts/Star Wars Battlefront II/BFIIUpdateInt1_1.exe")
            .get();
            
        wine.runInsidePrefix("/Program Files/LucasArts/Star Wars Battlefront II/BFIIUpdateInt1_1.exe");
        
    })
    .go(); 
