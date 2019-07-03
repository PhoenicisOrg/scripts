include("engines.wine.quick_script.local_installer_script");
include("engines.wine.verbs.d3dx9");
include("engines.wine.engine.object");
include("utils.functions.filesystem.files");

new LocalInstallerScript()
    .name("STAR WARS™ Empire at War: Gold Pack")
    .editor("Petroglyph")
    .author("ImperatorS79")
    .category("Games")
    .executable("LaunchEAW.exe")
    .preInstall(function (wine, wizard) {
        wine.d3dx9();
    })
    .postInstall(function (wine, wizard) {
        new Downloader()
            .wizard(wizard)
            .url("http://static.dolimg.com/mh_netstorage/lucasfilm/patches/pc/EAW_RAM_MPLobby_update.exe")
            .checksum("63233107fab4c58413df04ce1d07fe65e7145329")
            .to(wine.prefixDirectory() + "drive_c/users/Public/Documents/EAW_RAM_MPLobby_update.exe")
            .get();

        wine.runInsidePrefix("/users/Public/Documents/EAW_RAM_MPLobby_update.exe", [], true);
    });
