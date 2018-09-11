include(["engines", "wine", "quick_script", "local_installer_script"]);
include(["engines", "wine", "plugins", "glsl"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["engines", "wine", "verbs", "crypt32"]);
//include(["utils", "functions", "net", "resource"]);

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Anno 2070")
            .editor("Ubisoft")
            .applicationHomepage("http://anno-game.ubi.com/anno-2070/en-US/")
            .author("Zemogiter")
            .category("Games")
            .executable("Anno5.exe")
            .wineVersion(LATEST_DEVELOPMENT_VERSION)
            .wineDistribution("upstream")
            .preInstall(function (wine){
                wine.crypt32();
                wine.UseGLSL("disabled");
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
