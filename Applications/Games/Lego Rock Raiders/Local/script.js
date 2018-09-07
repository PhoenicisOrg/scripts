include(["engines", "wine", "quick_script", "local_installer_script"]);
include(["utils", "functions", "net", "download"]);

var installerImplementation = {
    run: function() {
        new LocalInstallerScript()
            .name("Lego Rock Raiders")
            .editor("LEGO Media")
            .author("Zemogiter")
            .category("Games")
            .executable("LegoRR.exe")
            .postInstall(function(wine,wizard) {
                var GameDir = wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "/LEGO Media/Games/Rock Raiders/d3drm.dll";
                new Downloader()
                .wizard(wizard)
                .url("http://s2.pliki.info/5709/d3drm.dll")
                .checksum("dde9e3b8c264957ae0a017d371293123")
                .algorithm("MD5")
                .to(GameDir)
                .get();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
