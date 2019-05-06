include("engines.wine.quick_script.online_installer_script");

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("ImgBurn")
            .editor("Lightning UK!")
            .applicationHomepage("http://www.imgburn.com/")
            .author("ImperatorS79")
            .url("http://download.imgburn.com/SetupImgBurn_2.5.8.0.exe")
            .checksum("6fc013ed5944b13efc54648699ea80f304e37ad0")
            .category("Accessories")
            .executable("ImgBurn.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
