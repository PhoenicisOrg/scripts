const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Downloader = include("utils.functions.net.download");

const D3DX9 = include("engines.wine.verbs.d3dx9");

new LocalInstallerScript()
    .name("STAR WARS™ Empire at War: Gold Pack")
    .editor("Petroglyph")
    .author("ImperatorS79")
    .category("Games")
    .executable("LaunchEAW.exe")
    .preInstall(function (wine/*, wizard */) {
        new D3DX9(wine).go();
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
