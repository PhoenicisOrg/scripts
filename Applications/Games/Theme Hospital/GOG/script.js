include(["engines", "wine", "quick_script", "gog_script"]);

var installerImplementation = {
    run: function () {
        new GogScript()
            .name("Theme Hospital")
            .editor("Bullfrog")
            .applicationHomepage("")
            .author("Quentin PÂRIS")
            .gogSetupFileName("theme_hospital/en1installer0")
            .category("Games")
            .wineVersion(LATEST_DOS_SUPPORT_VERSION)
            .wineDistribution("dos_support")
            .executable("HOSPITAL.EXE")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
