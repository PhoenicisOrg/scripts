include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "d3dx9"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

new OnlineInstallerScript()
    .name("STAR WARS™: The Old Republic")                       
    .editor("BioWare")                               
    .applicationHomepage("http://www.swtor.com/")  
    .author("ImperatorS79")
    .wineVersion("2.14")
    .wineDistribution("staging")    //minimum version to run it, see https://dev.wine-staging.com/patches/164/
    .url("https://swtor-a.akamaihd.net/installer/SWTOR_setup.exe")                       
    .checksum("c538935eff4ec90ce2e48dc7e515a8dec2f15f58")                       
    .category("Games")                           
    .executable("launcher.exe")
    .preInstall(function(wine, wizard) {
        //it seems it brings better performance
        wine.d3dx9();
    })
    .postInstall(function(wine, wizard) {
        //without that the launcher is unable to download the game
        var path = wine.prefixDirectory + "drive_c/" + wine.programFiles() + "/Electronic Arts/BioWare/Star Wars - The Old Republic/launcher.settings";
        var content =   '{ "Login": ""\n'                                           +
                        ', "LastProduct": ""\n'                                     +
                        ', "downloadRate": "0"\n'                                   +
                        ', "language": ""\n'                                        +
                        ', "TestServerAccess": "No"\n'                              +
                        ', "SpecHash": ""\n'                                        +
                        ', "AutoClose": "NONE"\n'                                   +
                        ', "KillKillProc": false\n'                                 +
                        ', "LastMode": ""\n'                                        +
                        ', "PatchingMode": "{ \\"swtor\\": \\"SSN\\" }"\n'          +
                        ', "bitraider_download_complete": { }\n'                    +
                        ', "log_levels": "INFO,SSNFO,ERROR"\n'                      +
                        ', "bitraider_disable": true\n'                             +
                        ', "loglevels": "INFO,SSNFO,ERROR"\n'                       +
                        '}'
        writeToFile(path, content)
    })
    
    .go(); 
    
    
