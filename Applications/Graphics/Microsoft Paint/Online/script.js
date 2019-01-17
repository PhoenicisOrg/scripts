include(["engines", "wine", "quick_script", "zip_script"]);

var installerImplementation = {
    run: function () {
        new ZipScript()
            .name("Microsoft Paint")
            .editor("Microsoft")
            .applicationHomepage("http://www.microsoft.com")
            .author("Quentin PÂRIS")
            .url("https://web.archive.org/web/20130218065827if_/http://download.microsoft.com/download/winntwks40/paint/1/nt4/en-us/paintnt.exe")
            .checksum("a22c4e367ef9d2cd23f0a8ae8d9ebff5bc1e8a0b")
            .category("Graphics")
            .executable("MSPAINT.EXE")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
