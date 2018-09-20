include(["engines", "wine", "quick_script", "local_installer_script"]);
include(["utils", "functions", "net", "resource"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Space Colony")
            .editor("Firefly Studios")
            .applicationHomepage("http://www.spacecolonyhd.com/")
            .author("Zemogiter")
            .category("Games")
            .installationArgs(["/q"])
            .wineDistribution("upstream")
            .wineVersion("3.16")
            .executable("Space Colony.exe")
            .preInstall(function (wine, wizard) {
                wizard.message(tr("Once the progress bar closes, an installation complete window should appear but in case it does not you should kill the process which name consist of just one dot."));
            })
            .postInstall(function (wine, wizard){
                var patch = new Resource()
                    .wizard(this._wizard)
                    .url("https://d1ztm8591kdhlc.cloudfront.net/hdpatches/Space_Colony_HD_Update.exe")
                    .checksum("c821e5c7035b9b517823466f4cedadd3")
                    .algorithm("MD5")
                    .name("Space_Colony_HD_Update.exe")
                    .get();
                wine.run(patch)
            })
            .go(["/q"]);
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
