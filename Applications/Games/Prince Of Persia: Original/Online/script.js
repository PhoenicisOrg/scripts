include(["engines", "wine", "quick_script", "zip_script"]);

var installerImplementation = {
    run: function () {
        new ZipScript()
            .name("Prince Of Persia: Original")
            .editor("Broderbund Softwared")
            .applicationHomepage("")
            .author("Quentin PÂRIS")
            .url("http://repository.playonlinux.com/divers/oldware/prince.zip")
            .checksum("6c4148233f840011715c351c399d35b0fc716ae7")
            .category("Games")
            .wineVersion("1.8.6-dos_support")
            .executable("PRINCE.EXE")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
