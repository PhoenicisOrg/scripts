include(["engines", "wine", "quick_script", "online_installer_script"]);

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("mIRC")
            .editor("mIRC")
            .applicationHomepage("http://www.mirc.com/")
            .author("Quentin PÂRIS")
            .url("http://www.mirc.com/get.php?version=746")
            .checksum("d99b89649888944364ad8bd69261d8e13434a479")
            .category("Internet")
            .executable("mirc.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
