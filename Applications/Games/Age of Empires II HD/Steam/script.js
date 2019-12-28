const SteamScript = include("engines.wine.quick_script.steam_script");
const {cp, remove, lns} = include("utils.functions.filesystem.files");

new SteamScript()
    .name("Age of Empires II HD")
    .editor("Skybox Labs, Hidden Path Entertainment, Ensemble Studios")
    .author("Plata")
    .appId(221380)
    .postInstall((wine /*, wizard*/) => {
        // skip broken launcher by replacing it with "AoK HD.exe"
        var installPath = wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "/Steam/steamapps/common/Age2HD/";
        var launcher = installPath + "Launcher.exe";
        cp(launcher, launcher + ".bak");
        remove(launcher);
        var aoe = installPath + "AoK HD.exe";
        lns(aoe, launcher);
    });
