include(["engines", "wine", "quick_script", "zip_script"]);

var installerImplementation = {
    run: function () {
        new ZipScript()
            .name("The Elder Scroll 1: Arena")
            .editor("Broderbund Softwared")
            .applicationHomepage("")
            .author("Quentin PÂRIS")
            .url("http://static.elderscrolls.com/elderscrolls.com/assets/files/tes/extras/Arena106Setup.zip")
            .checksum("5e51d43f3e01820b18df36ec0019036f16796ad2")
            .category("Games")
            .wineVersion(LATEST_DOS_SUPPORT_VERSION)
            .wineDistribution("dos_support")
            .executable("ARENA.BAT")
            .go();
    }
};
/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
