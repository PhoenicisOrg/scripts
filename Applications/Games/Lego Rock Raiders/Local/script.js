include(["engines", "wine", "quick_script", "local_installer_script"]);
include(["utils", "functions", "net", "download"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["utils", "functions", "filesystem", "files"]);
include(["engines", "wine", "plugins", "regsvr32"]);

var installerImplementation = {
    run: function() {
        new LocalInstallerScript()
            .name("Lego Rock Raiders")
            .editor("LEGO Media")
            .author("Zemogiter")
            .category("Games")
            .executable("LegoRR.exe")
            .postInstall(function(wine,wizard) {
                var dllDir = wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "/LEGO Media/Games/Rock Raiders/d3drm.dll";
                new Downloader()
                .wizard(wizard)
                .url("http://s2.pliki.info/5709/d3drm.dll")
                .checksum("dde9e3b8c264957ae0a017d371293123")
                .algorithm("MD5")
                .to(dllDir)
                .get();
                var rootDir = wine.prefixDirectory() + "drive_c/RockRaidersCodec_490085.zip";
                new Downloader()
                .wizard(wizard)
                .url("http://rrubucket.s3.amazonaws.com/RockRaidersCodec_490085.zip")
                .checksum("991a343dc608c6a1914127a55f2e5b47")
                .algorithm("MD5")
                .to(rootDir)
                .get();
                new Extractor()
                .wizard(wizard)
                .archive(wine.prefixDirectory() + "/drive_c/RockRaidersCodec_490085.zip")
                .to(wine.prefixDirectory() + "/drive_c/RockRaidersCodec/")
                .extract(["-F", "iv5setup.exe"]);
                wine.run(wine.prefixDirectory() + "/drive_c/RockRaidersCodec/iv5setup.exe");
                wine.wait();
                new Extractor()
                .wizard(wizard)
                .archive(wine.prefixDirectory() + "/drive_c/RockRaidersCodec_490085.zip")
                .to(wine.prefixDirectory() + "/drive_c/windows/system32/")
                .extract(["-F", "ir50_32.dll"]);
                wine.regsvr32().install("ir50_32.dll");
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
