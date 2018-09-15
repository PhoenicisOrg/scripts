include(["engines", "wine", "quick_script", "uplay_script"]);
include(["engines", "wine", "plugins", "glsl"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "plugins", "windows_version"]);

var installerImplementation = {
    run: function () {
        new UplayScript()
            .name("Anno 2070")
            .editor("Ubisoft")
            .applicationHomepage("http://anno-game.ubi.com/anno-2070/en-US/")
            .author("Zemogiter")
            .wineVersion("3.16")
            .wineDistribution("upstream")
            .appId(22)
            .preInstall(function (wine, wizard){
                wine.windowsVersion("win7");
                wine.corefonts();
                wine.UseGLSL("disabled");
                wine.overrideDLL()
                    .set("native,builtin", ["xaudio2_7"])
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
