include("engines.wine.quick_script.online_installer_script");

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Mp3tag")
            .editor("Florian Heidenreich")
            .applicationHomepage("http://www.mp3tag.de/")
            .author("ImperatorS79")
            .url("https://download.mp3tag.de/mp3tagv291setup.exe")
            .checksum("b3fe9ee9b3b65cc1de2e3056f0f7ed675bb2fca0")
            .category("Multimedia")
            .executable("mp3tag.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
