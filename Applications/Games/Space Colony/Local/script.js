include(["engines", "wine", "quick_script", "local_installer_script"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Space Colony")                       
            .editor("Firefly Studios")                            
            .applicationHomepage("http://www.spacecolonyhd.com/") 
            .author("Zemogiter")           
            .category("Games")                        
            .executable("SpaceColony.exe")
            .postInstall(function(wine,wizard){
                var patch = new Resource()
                    .wizard(this._wizard)
                    .url("https://d1ztm8591kdhlc.cloudfront.net/hdpatches/Space_Colony_HD_Update.exe")
                    .checksum("C821E5C7035B9B517823466F4CEDADD3")
                    .algorithm("MD5")
                    .name("Space_Colony_HD_Update.exe")
                    .get();
                this.run(patch, ["/q"])              
            .go();
    }
};


/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
