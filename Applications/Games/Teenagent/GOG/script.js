include(["engines", "wine", "quick_script", "gog_script"]);

var installerImplementation = {
    run: function () {
        new GogScript()
            .name("Teenagent")
            .editor("")
            .applicationHomepage("")
            .author("Quentin PÂRIS")
            .gogSetupFileName("teenagent/en1installer0")
            .category("Games")
            .wineVersion(LATEST_DOS_SUPPORT_VERSION)
            .wineDistribution("dos_support")
            .executable("TEENAGNT.EXE")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
