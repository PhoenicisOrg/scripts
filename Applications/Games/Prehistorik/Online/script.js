include(["engines", "wine", "quick_script", "zip_script"]);

var installerImplementation = {
    run: function () {
        new ZipScript()
            .name("Prehistorik")
            .editor("Titus")
            .applicationHomepage("")
            .author("Quentin PÂRIS")
            .url("http://repository.playonlinux.com/divers/oldware/historik.zip")
            .checksum("62a21d0dfcd68ae61646e1bc5b1c4a03b3e1091f")
            .category("Games")
            .wineVersion("1.8.6-dos_support")
            .executable("HISTORIK.EXE")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
