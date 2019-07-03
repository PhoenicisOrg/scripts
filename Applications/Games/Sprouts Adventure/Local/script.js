include("engines.wine.quick_script.local_installer_script");
include("engines.wine.verbs.vcrun2005");

new LocalInstallerScript()
    .name("Sprouts Adventure")
    .editor("Big Fish Games")
    .applicationHomepage("http://www.sproutsadventure.com/")
    .author("Zemogiter")
    .category("Games")
    .executable("Sprouts Adventure.CRC")
    .preInstall(function (wine, wizard) {
        wizard.message(
            tr("This game requires winebind (for Ubuntu) or samba and libwbclient/lib32-libwbclient (for Arch Linux).")
        );
        wine.vcrun2005();
    });
