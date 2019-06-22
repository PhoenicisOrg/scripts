include("engines.wine.quick_script.local_installer_script");
include("engines.wine.plugins.virtual_desktop");
include("engines.wine.plugins.override_dll");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.crypt32");
include("engines.wine.verbs.d3dx10");
include("utils.functions.filesystem.files");

new LocalInstallerScript()
    .name("Anno 2070")
    .editor("Ubisoft")
    .applicationHomepage("http://anno-game.ubi.com/anno-2070/en-US/")
    .author("Zemogiter")
    .category("Games")
    .executable("Anno5.exe")
    .wineVersion("3.16")
    .wineDistribution("upstream")
    .preInstall(function (wine) {
        var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        wine.setVirtualDesktop(screenSize.width, screenSize.height);
        wine.crypt32();
        wine.corefonts();
        wine.d3dx10();
        wine
            .overrideDLL()
            .set("native, builtin", ["winhttp", "msvcrt40", "msvcr100", "crypt32"])
            .do();
    })
    .postInstall(function (wine) {
        var versionFile = wine.prefixDirectory() + "/drive_c/Ubisoft/Related Designs/ANNO 2070/update/version.txt";
        touch(versionFile);
        writeToFile(
            versionFile,
            "http://static11.cdn.ubi.com/anno2070/anno2070_2012_08_17_15_13\n3bf6d9e4ab1bd7c399723af6491b2e21\nVersion: v2.00.7780"
        );
        chmod(versionFile, "r--r--r--");
    });
