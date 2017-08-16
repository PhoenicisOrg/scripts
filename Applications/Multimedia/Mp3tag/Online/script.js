include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Mp3tag")                       
    .editor("Florian Heidenreich")                               
    .applicationHomepage("http://www.mp3tag.de/")  
    .author("ImperatorS79")                     
    .url("http://download.mp3tag.de/mp3tagv283setup.exe")                       
    .checksum("ee337d5d98b6664a74e6df87de083a9146ad422e")                       
    .category("Multimedia")                           
    .executable("mp3tag.exe")                  
    .go(); 
