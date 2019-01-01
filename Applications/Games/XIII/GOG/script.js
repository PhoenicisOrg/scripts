include(["engines", "wine", "quick_script", "gog_script"]);

var installerImplementation = {
    run: function () {
        new GogScript()
            .name("XIII")
            .editor("Ubisoft")
            .applicationHomepage("https://support.ubi.com/fr-FR/Games/994")
            .author("Quentin PÂRIS")
            .gogSetupFileNames(["xiii/en1installer0", "xiii/en1installer1", "xiii/en1installer2"])
            .category("Games")
            .wineVersion(LATEST_STABLE_VERSION)
            .executable("xiii.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
