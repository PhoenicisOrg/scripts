include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dotnet472");
include("engines.wine.verbs.vcrun2017");
include("engines.wine.verbs.dxvk");
include("engines.wine.verbs.faudio");
include("engines.wine.plugins.override_dll");
include("utils.functions.filesystem.files");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Space Engineers")
            .editor("Keen Software House")
            .author("Zemogiter")
            .appId(244850)
            .wineVersion("4.9")
            .wineDistribution("upstream")
            .wineArchitecture("amd64")
            .preInstall(function (wine) {
                wine.dotnet472();
                wine.vcrun2017();
                wine.DXVK();
                wine.faudio();
                wine.overrideDLL()
                    .set("native, builtin", ["xaudio2_0", "xaudio2_1", "xaudio2_2", "xaudio2_3", "xaudio2_4", "xaudio2_5", "xaudio2_6", "xaudio2_7", "xaudio2_8", "xaudio2_9"])
                    .do();
            })
            .postInstall(function (wine) {
                remove(wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "/Steam/steamapps/common/Space Engineers/Content/KSH.wmv");
            })
            .gameOverlay(false)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
