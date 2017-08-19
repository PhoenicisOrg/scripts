include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Utils", "Functions", "Filesystem", "Files"]);


new SteamScript()
    .name("The Witcher 3: Wild Hunt")              
    .editor("CD Projekt Red")     
    .author("ImperatorS79")  
    .wineVersion("2.14")
    .wineDistribution("staging")
    //it would be better with dark ground fix -> https://bugs.winehq.org/attachment.cgi?id=58842&action=diff&context=patch&collapsed=&headers=1&format=raw 
    .wineArchitecture("amd64")
    .appId(292030)
    .preInstall(function(wine, wizard) {
        //Ensure Directx11 full features will work, and CSMT for performance
        var path = wine.prefixDirectory + "drive_c/witcher3.reg";
        
        var content =   'REGEDIT4\n'                                        +
                        '[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n'   +  
                        '"csmt"=dword:1\n'                                  +
                        '"DirectDrawRenderer"="opengl"\n'                   +
                        '"UseGLSL"="enabled"\n'                             +
                        '"MaxVersionGL"=dword:00040005'                     ;
                        
        writeToFile(path, content);
        
        wine.regedit().open(path);
    })
    .go(); 
