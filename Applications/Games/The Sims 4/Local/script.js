include("engines.wine.quick_script.local_installer_script");
include("engines.wine.verbs.vcrun6sp6");
include("engines.wine.verbs.mfc42");
include("engines.wine.verbs.dotnet20sp2");
include("utils.functions.net.download");
include("utils.functions.filesystem.files");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("The Sims 4")
            .editor("Electronic Arts")
            .applicationHomepage("https://www.ea.com/games/the-sims/the-sims-4/pc")
            .author("ZemoScripter")
            .category("Games")
            .executable("TS4_x64.exe")
            .wineArchitecture("amd64")
            .wineVersion(4.7)
            .wineDistribution("staging")
            .preInstall(function(wine, wizard) {
                new Downloader()
                    .wizard(wizard)
                    .url("http://www.dll-found.com/dll-8d/u/unarc.dll")
                    .checksum("5faa19aa1629e401915001a3392e3d916be38578")
                    .to(wine.system32directory() + "/unarc.dll")
                    .get();
                wine.dotnet20sp2();
                wine.vcrun6sp6();
                wine.mfc42();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);

