const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

const { touch, writeToFile, chmod } = include("utils.functions.filesystem.files");

const Corefonts = include("engines.wine.verbs.corefonts");
const Crypt32 = include("engines.wine.verbs.crypt32");
const D3DX10 = include("engines.wine.verbs.d3dx10");

const VirtualDesktop = include("engines.wine.plugins.virtual_desktop");
const OverrideDLL = include("engines.wine.plugins.override_dll");

new LocalInstallerScript()
    .name("Anno 2070")
    .editor("Ubisoft")
    .applicationHomepage("http://anno-game.ubi.com/anno-2070/en-US/")
    .author("Zemogiter")
    .category("Games")
    .executable("Anno5.exe")
    .wineVersion("3.16")
    .wineDistribution("upstream")
    .preInstall(function(wine) {
        new VirtualDesktop(wine).go();

        new Crypt32(wine).go();
        new Corefonts(wine).go();
        new D3DX10(wine).go();

        new OverrideDLL(wine).withMode("native, builtin", ["winhttp", "msvcrt40", "msvcr100", "crypt32"]).go();
    })
    .postInstall(function(wine) {
        var versionFile = wine.prefixDirectory() + "/drive_c/Ubisoft/Related Designs/ANNO 2070/update/version.txt";
        touch(versionFile);
        writeToFile(
            versionFile,
            "http://static11.cdn.ubi.com/anno2070/anno2070_2012_08_17_15_13\n3bf6d9e4ab1bd7c399723af6491b2e21\nVersion: v2.00.7780"
        );
        chmod(versionFile, "r--r--r--");
    });
