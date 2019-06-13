include("engines.wine.quick_script.local_installer_script");
include("engines.wine.verbs.vcrun2017");
include("engines.wine.verbs.d3dx9");
include("engines.wine.verbs.corefonts");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("RimWorld")
            .editor("Ludeon Studios")
            .author("Zemogiter")
            .applicationHomepage("https://rimworldgame.com/")
            .wineArchitecture("amd64")
            .executable("RimWorld.exe")
            .preInstall(function (wine) {
                wine.vcrun2017();
                wine.d3dx9();
                wine.corefonts();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
