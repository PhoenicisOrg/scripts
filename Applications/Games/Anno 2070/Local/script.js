include(["engines", "wine", "quick_script", "local_installer_script"]);
include(["engines", "wine", "plugins", "virtual_desktop"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "verbs", "crypt32"]);
include(["engines", "wine", "verbs", "d3dx10"]);
include(["utils", "functions", "filesystem", "files"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Anno 2070")
            .editor("Ubisoft")
            .applicationHomepage("http://anno-game.ubi.com/anno-2070/en-US/")
            .author("Zemogiter")
            .category("Games")
            .executable("Anno5.exe")
            .wineVersion("3.16")
            .wineDistribution("upstream")
            .preInstall(function (wine){
                var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
                wine.setVirtualDesktop(screenSize.width, screenSize.height);
                wine.crypt32();
                wine.corefonts();
                wine.d3dx10();
                wine.overrideDLL()
                    .set("native, builtin", ["winhttp"])
                    .do();
            })
            .postInstall(function (wine){
                var UpdateFile = wine.prefixDirectory() + "/drive_c/Program Files/Ubisoft/Related Designs/ANNO 2070/update/update.txt";
                touch(UpdateFile);
                writeToFile(UpdateFile, "http://static11.cdn.ubi.com/anno2070/anno2070_2012_08_17_15_13 3bf6d9e4ab1bd7c399723af6491b2e21 Version: v2.00.7780");
                var permissions = java.nio.file.attribute.PosixFilePermissions.fromString("r--r--r--");
                var updateFilePath = java.nio.file.Paths.get(UpdateFile);
                java.nio.file.Files.setPosixFilePermissions(UpdateFile, permissions);

            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
